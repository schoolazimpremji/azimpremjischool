import zipfile
import xml.etree.ElementTree as ET
import re

with zipfile.ZipFile('A3 Project Details (5).docx', 'r') as z:
    xml_content = z.read('word/document.xml')
    rels_content = z.read('word/_rels/document.xml.rels')

root = ET.fromstring(xml_content)
rels_root = ET.fromstring(rels_content)

rel_map = {}
for rel in rels_root:
    rel_map[rel.attrib.get('Id')] = rel.attrib.get('Target')

w = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
r = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
a = '{http://schemas.openxmlformats.org/drawingml/2006/main}'

blocks = []

for child in root.iter(w + 'p'):
    text = ''.join(t.text for t in child.iter(w + 't') if t.text).strip()
    images = []
    for blip in child.iter(a + 'blip'):
        embed_id = blip.attrib.get(r + 'embed')
        if embed_id in rel_map:
            images.append(rel_map[embed_id])
    
    is_plant_header = False
    upper = text.upper()
    if upper.startswith('PLANT') and len(text) < 60:
        is_plant_header = True
    elif 'PLANT -' in upper or 'PLANT-' in upper or 'PLANT –' in upper:
        if len(text) < 60:
            is_plant_header = True

    if is_plant_header:
        blocks.append({'header': text, 'images': images, 'lines': []})
    elif blocks:
        if text:
            blocks[-1]['lines'].append(text)
        if images:
            blocks[-1]['images'].extend(images)

print(f"Total blocks detected: {len(blocks)}")
for idx, b in enumerate(blocks):
    full_block_text = "\n".join(b['lines'])
    
    # Extract common name
    c_match = re.search(r'Common name:\s*(.*?)(?:\n|$)', full_block_text, re.IGNORECASE)
    common_name = c_match.group(1).strip() if c_match else ""
    
    # Extract scientific name
    s_match = re.search(r'Scientific name:\s*(.*?)(?:\n|$)', full_block_text, re.IGNORECASE)
    sci_name = s_match.group(1).strip() if s_match else ""
    
    # Extract family
    f_match = re.search(r'Family:\s*(.*?)(?:\n|$)', full_block_text, re.IGNORECASE)
    family = f_match.group(1).strip() if f_match else ""

    print(f"[{idx+1:2d}] {b['header']} | Imgs: {len(b['images'])}")
    print(f"     Common: {common_name}")
    print(f"     Sci:    {sci_name}")
    print(f"     Family: {family}")
