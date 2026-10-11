import json
import re

with open('src/data/samplePlants.ts', 'r', encoding='utf-8') as f:
    ts_code = f.read()

# Extract JSON array from TS code
match = re.search(r'export const SAMPLE_PLANTS: Plant\[\] = (\[.*?\]);', ts_code, re.DOTALL)
if not match:
    print("Could not find SAMPLE_PLANTS in ts file")
    exit(1)

plants = json.loads(match.group(1))

def sql_escape(s):
    if s is None:
        return "NULL"
    escaped = s.replace("'", "''")
    return f"'{escaped}'"

sql_lines = [
    "-- ==========================================================================",
    "-- Azim Premji School Campus Flora: 46 Species Canonical Seed Data",
    "-- Idempotent SQL script using ON CONFLICT (slug) DO UPDATE",
    "-- ==========================================================================",
    "BEGIN;",
    ""
]

for p in plants:
    slug = p['slug']
    c_name = sql_escape(p['common_name'])
    s_name = sql_escape(p.get('scientific_name'))
    fam = sql_escape(p.get('family'))
    cat = sql_escape(p['category'])
    conf = sql_escape(p['identification_confidence'])
    ident = sql_escape(p.get('identification_characteristics'))
    origin = sql_escape(p.get('native_origin'))
    dist = sql_escape(p.get('distribution'))
    loc = sql_escape(p.get('campus_location'))
    flowers = sql_escape(p.get('flowers'))
    fl_season = sql_escape(p.get('flowering_season'))
    fruits = sql_escape(p.get('fruits'))
    fr_season = sql_escape(p.get('fruiting_season'))
    uses = sql_escape(p.get('uses'))
    med = sql_escape(p.get('traditional_medicinal_uses'))
    safety = sql_escape(p.get('safety_warnings'))
    facts = sql_escape(p.get('interesting_facts'))
    status = sql_escape(p.get('status', 'published'))
    
    # Array literal for other_common_names
    other_names = p.get('other_common_names', [])
    if other_names:
        escaped_names = [f'"{n.replace(chr(34), chr(92)+chr(34))}"' for n in other_names]
        other_arr = f"ARRAY[{', '.join(sql_escape(n) for n in other_names)}]::text[]"
    else:
        other_arr = "ARRAY[]::text[]"

    sql_lines.append(f"""
INSERT INTO public.plants (
    slug, common_name, other_common_names, scientific_name, family,
    category, identification_characteristics, identification_confidence,
    native_origin, distribution, campus_location,
    flowers, flowering_season, fruits, fruiting_season,
    uses, traditional_medicinal_uses, safety_warnings, interesting_facts,
    status, created_at, updated_at
) VALUES (
    '{slug}', {c_name}, {other_arr}, {s_name}, {fam},
    {cat}, {ident}, {conf},
    {origin}, {dist}, {loc},
    {flowers}, {fl_season}, {fruits}, {fr_season},
    {uses}, {med}, {safety}, {facts},
    {status}, NOW(), NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    common_name = EXCLUDED.common_name,
    other_common_names = EXCLUDED.other_common_names,
    scientific_name = EXCLUDED.scientific_name,
    family = EXCLUDED.family,
    category = EXCLUDED.category,
    identification_characteristics = EXCLUDED.identification_characteristics,
    identification_confidence = EXCLUDED.identification_confidence,
    native_origin = EXCLUDED.native_origin,
    distribution = EXCLUDED.distribution,
    campus_location = EXCLUDED.campus_location,
    flowers = EXCLUDED.flowers,
    flowering_season = EXCLUDED.flowering_season,
    fruits = EXCLUDED.fruits,
    fruiting_season = EXCLUDED.fruiting_season,
    uses = EXCLUDED.uses,
    traditional_medicinal_uses = EXCLUDED.traditional_medicinal_uses,
    safety_warnings = EXCLUDED.safety_warnings,
    interesting_facts = EXCLUDED.interesting_facts,
    status = EXCLUDED.status,
    updated_at = NOW();
""")

    # Seed photos
    photos = p.get('photos', [])
    for photo in photos:
        spath = photo['storage_path']
        purl = photo['public_url']
        alt = sql_escape(photo.get('alt_text'))
        caption = sql_escape(photo.get('caption'))
        is_p = "true" if photo.get('is_primary') else "false"
        d_ord = photo.get('display_order', 1)

        sql_lines.append(f"""
INSERT INTO public.plant_photos (
    plant_id, storage_path, public_url, alt_text, caption, is_primary, display_order, created_at
)
SELECT id, '{spath}', '{purl}', {alt}, {caption}, {is_p}, {d_ord}, NOW()
FROM public.plants WHERE slug = '{slug}'
ON CONFLICT (storage_path) DO NOTHING;
""")

sql_lines.append("COMMIT;")

with open('supabase/seed_flora_46.sql', 'w', encoding='utf-8') as out_f:
    out_f.write("\n".join(sql_lines))

print("Generated supabase/seed_flora_46.sql with 46 plants.")
