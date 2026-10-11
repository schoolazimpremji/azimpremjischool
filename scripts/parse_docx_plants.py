import zipfile
import xml.etree.ElementTree as ET
import re

with zipfile.ZipFile('A3 Project Details (5).docx', 'r') as z:
    xml_content = z.read('word/document.xml')
    rels_content = z.read('word/_rels/document.xml.rels')

root = ET.fromstring(xml_content)
rels_root = ET.fromstring(rels_content)

rel_map = {rel.attrib.get('Id'): rel.attrib.get('Target') for rel in rels_root}

w = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
r = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
a = '{http://schemas.openxmlformats.org/drawingml/2006/main}'

blocks = []
current_block = None

for child in root.iter(w + 'p'):
    text = ''.join(t.text for t in child.iter(w + 't') if t.text).strip()
    images = []
    for blip in child.iter(a + 'blip'):
        embed_id = blip.attrib.get(r + 'embed')
        if embed_id in rel_map:
            images.append(rel_map[embed_id])

    upper = text.upper()
    is_plant_header = False
    if (upper.startswith('PLANT') or 'PLANT -' in upper or 'PLANT-' in upper or 'PLANT –' in upper) and len(text) < 60:
        is_plant_header = True

    if is_plant_header:
        current_block = {
            'header': text,
            'images': list(images),
            'paragraphs': []
        }
        blocks.append(current_block)
    elif current_block is not None:
        if text:
            current_block['paragraphs'].append(text)
        if images:
            current_block['images'].extend(images)

print(f"Total blocks detected: {len(blocks)}")
with open('scripts/all_plants_parsed.txt', 'w', encoding='utf-8') as f:
    for idx, b in enumerate(blocks):
        full_text = "\n".join(b['paragraphs'])
        
        # Extract common name
        c_m = re.search(r'Common name:\s*([^\n\r]+)', full_text, re.IGNORECASE)
        common_name = c_m.group(1).strip() if c_m else "N/A"
        
        # Extract scientific name
        s_m = re.search(r'Scientific name:\s*([^\n\r]+)', full_text, re.IGNORECASE)
        sci_name = s_m.group(1).strip() if s_m else "N/A"
        
        # Extract family
        f_m = re.search(r'Family:\s*([^\n\r]+)', full_text, re.IGNORECASE)
        family = f_m.group(1).strip() if f_m else "N/A"
        
        line = f"[{idx+1:2d}] Header: {b['header']:<35} | Imgs: {len(b['images'])} | Sci: {sci_name[:30]:<30} | Common: {common_name[:30]}"
        print(line)
        f.write(line + "\n")
        f.write(f"     Images: {b['images']}\n")
        f.write(f"     Family: {family}\n")
        f.write(f"     Text snippet (first 200 chars): {full_text[:200].replace(chr(10), ' ')}\n\n")

print("Wrote scripts/all_plants_parsed.txt")
