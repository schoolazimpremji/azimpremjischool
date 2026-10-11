import zipfile
import xml.etree.ElementTree as ET
import json
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

print(f"Captured {len(blocks)} plant blocks.")

with open('scripts/extracted_raw_plants.json', 'w', encoding='utf-8') as f:
    json.dump(blocks, f, indent=2, ensure_ascii=False)

print("Saved to scripts/extracted_raw_plants.json")
