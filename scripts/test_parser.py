import json
import re
import os

with open('scripts/extracted_raw_plants.json', 'r', encoding='utf-8') as f:
    blocks = json.load(f)

# Helper function to extract fields from a block's paragraphs
def parse_plant_block(idx, block):
    header = block['header']
    paragraphs = block['paragraphs']
    raw_text = "\n".join(paragraphs)
    
    # 1. Common name
    common_name = ""
    other_common_names = []
    c_m = re.search(r'(?:Likely\s+)?Common name:\s*([^\n\r]+)', raw_text, re.IGNORECASE)
    if c_m:
        c_str = c_m.group(1).strip()
        # Clean off trailing text if it merged with something else
        c_str = re.split(r'(?:The earlier|Scientific name|Family:)', c_str)[0].strip()
        names = [n.strip() for n in re.split(r'[/,–—]', c_str) if n.strip()]
        if names:
            common_name = names[0]
            other_common_names = names[1:]
    elif "–" in header or "-" in header:
        # e.g., "Plant 42 – Jackfruit"
        parts = re.split(r'[-–—]', header)
        if len(parts) > 1:
            common_name = parts[1].strip()
    
    # 2. Scientific name
    sci_name = ""
    s_m = re.search(r'(?:Likely\s+|Older\s+)?Scientific name:\s*([^\n\r]+)', raw_text, re.IGNORECASE)
    if s_m:
        s_str = s_m.group(1).strip()
        s_str = re.split(r'(?:Family:|Older scientific|Characteristics|The exact)', s_str)[0].strip()
        sci_name = s_str
    
    # 3. Family
    family = ""
    f_m = re.search(r'Family:\s*([^\n\r]+)', raw_text, re.IGNORECASE)
    if f_m:
        family = f_m.group(1).strip()
        family = re.split(r'(?:Characteristics|Identification|Origin)', family)[0].strip()

    # 4. Identification characteristics
    ident_lines = []
    collect_ident = False
    for p in paragraphs:
        if re.search(r'(?:Characteristics for identification|Identification|Characteristics)\b', p, re.IGNORECASE):
            collect_ident = True
            # if paragraph has text after colon
            after = re.sub(r'^.*?:', '', p).strip()
            if after:
                ident_lines.append(after)
            continue
        if collect_ident:
            # stop if next section starts
            if re.match(r'^(?:Flowering|Flowers|Fruit|Uses|Origin|Safety|Medicinal|Fun fact|Important|Interesting)', p, re.IGNORECASE):
                collect_ident = False
            else:
                ident_lines.append(p)
    identification_characteristics = " ".join(ident_lines).strip()

    # 5. Flowers and flowering season
    flowers = ""
    flowering_season = ""
    for p in paragraphs:
        if re.match(r'^(?:Flowers and flowering season|Flowering season and fruits|Flowering season|Flowers):', p, re.IGNORECASE):
            val = re.sub(r'^.*?:', '', p).strip()
            if 'season' in p.lower():
                flowering_season += (" " + val if flowering_season else val)
            else:
                flowers += (" " + val if flowers else val)

    # 6. Fruits and fruiting season
    fruits = ""
    fruiting_season = ""
    for p in paragraphs:
        if re.match(r'^(?:Fruit and uses|Fruit|Fruits):', p, re.IGNORECASE):
            val = re.sub(r'^.*?:', '', p).strip()
            fruits += (" " + val if fruits else val)
        if re.match(r'^Fruiting season:', p, re.IGNORECASE):
            val = re.sub(r'^.*?:', '', p).strip()
            fruiting_season += (" " + val if fruiting_season else val)

    # 7. Uses
    uses_lines = []
    for p in paragraphs:
        if re.match(r'^(?:Uses|It is commonly planted for|Subabul has many practical uses|It is used for|Mostly grown for decoration in):', p, re.IGNORECASE):
            uses_lines.append(re.sub(r'^.*?:', '', p).strip())
    uses = " ".join(uses_lines).strip()

    # 8. Origin / native
    origin = ""
    o_m = re.search(r'Origin:\s*([^\n\r]+)', raw_text, re.IGNORECASE)
    if o_m:
        origin = o_m.group(1).strip()

    # 9. Medicinal
    med_lines = []
    for p in paragraphs:
        if re.match(r'^(?:Medicinal importance|Medicinal note|Medicinal/nutritional note|Medicinal/traditional use|Medicinal/traditional uses|Medicinal use):', p, re.IGNORECASE):
            med_lines.append(re.sub(r'^.*?:', '', p).strip())
    traditional_medicinal_uses = " ".join(med_lines).strip()

    # 10. Safety
    safety_lines = []
    for p in paragraphs:
        if re.match(r'^(?:Safety|Important safety point|Very important safety point|Important warning|Important caution):', p, re.IGNORECASE):
            safety_lines.append(re.sub(r'^.*?:', '', p).strip())
    safety_warnings = " ".join(safety_lines).strip()

    # 11. Fun facts / interesting
    fact_lines = []
    for p in paragraphs:
        if re.match(r'^(?:Fun fact|Interesting fact|Another interesting fact|Another interesting point|Very interesting fact|Important fact|Best fun fact):', p, re.IGNORECASE):
            fact_lines.append(re.sub(r'^.*?:', '', p).strip())
    interesting_facts = " ".join(fact_lines).strip()

    # Determine category
    category = "tree" # default
    comb_text = (raw_text + " " + common_name + " " + sci_name + " " + family).lower()
    if "palm" in comb_text or "arecaceae" in comb_text:
        category = "palm"
    elif "climber" in comb_text or "ficus pumila" in comb_text:
        category = "climber"
    elif "creeper" in comb_text or "alternanthera" in comb_text:
        category = "creeper"
    elif "herb" in comb_text or "perennial herb" in comb_text or "tradescantia" in comb_text or "musa" in comb_text:
        category = "herb"
    elif "shrub" in comb_text or "subshrub" in comb_text or "bush" in comb_text or "duranta" in comb_text or "ixora" in comb_text or "barleria" in comb_text or "carissa" in comb_text or "ehretia" in comb_text or "pittosporum" in comb_text or "gardenia" in comb_text or "nerium" in comb_text or "jatropha" in comb_text or "plumeria" in comb_text:
        category = "shrub"
    elif "rose" in comb_text or "hibiscus" in comb_text or "periwinkle" in comb_text or "catharanthus" in comb_text or "mussaenda" in comb_text:
        category = "flowering plant"

    return {
        "index": idx + 1,
        "header": header,
        "common_name": common_name,
        "other_common_names": other_common_names,
        "scientific_name": sci_name,
        "family": family,
        "category": category,
        "identification_characteristics": identification_characteristics,
        "origin": origin,
        "flowers": flowers,
        "flowering_season": flowering_season,
        "fruits": fruits,
        "fruiting_season": fruiting_season,
        "uses": uses,
        "traditional_medicinal_uses": traditional_medicinal_uses,
        "safety_warnings": safety_warnings,
        "interesting_facts": interesting_facts,
        "image_count": len(block['images'])
    }

parsed_plants = []
for i in range(46):
    b = blocks[i]
    res = parse_plant_block(i, b)
    parsed_plants.append(res)

print("Parsed 46 plants summary:")
for p in parsed_plants:
    print(f"[{p['index']:02d}] {p['common_name']:<25} | {p['scientific_name']:<30} | {p['category']:<10} | {p['image_count']} imgs")
