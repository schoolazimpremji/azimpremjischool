import zipfile
import xml.etree.ElementTree as ET

with zipfile.ZipFile('A3 Project Details (5).docx', 'r') as z:
    xml_content = z.read('word/document.xml')
    rels_content = z.read('word/_rels/document.xml.rels')
    media_in_zip = set(n.replace('word/', '') for n in z.namelist() if n.startswith('word/media/'))

root = ET.fromstring(xml_content)
rels_root = ET.fromstring(rels_content)
rel_map = {rel.attrib.get('Id'): rel.attrib.get('Target') for rel in rels_root}

w = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
r = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
a = '{http://schemas.openxmlformats.org/drawingml/2006/main}'

plant_name = 'Intro'
p_img_map = {}

for p in root.iter(w + 'p'):
    text = ''.join(t.text for t in p.iter(w + 't') if t.text).strip()
    upper = text.upper()
    if (upper.startswith('PLANT') or 'PLANT -' in upper or 'PLANT-' in upper or 'PLANT –' in upper) and len(text) < 60:
        plant_name = text
        if plant_name not in p_img_map:
            p_img_map[plant_name] = []
    
    for blip in p.iter(a + 'blip'):
        embed_id = blip.attrib.get(r + 'embed')
        if embed_id in rel_map:
            img_target = rel_map[embed_id]
            if plant_name not in p_img_map:
                p_img_map[plant_name] = []
            p_img_map[plant_name].append(img_target)

all_assigned_images = set()
for k, v in p_img_map.items():
    print(f"{k:<35}: {v}")
    for img in v:
        all_assigned_images.add(img)

unassigned = media_in_zip - all_assigned_images
print(f"\nTotal media in zip: {len(media_in_zip)}")
print(f"Total assigned to plants: {len(all_assigned_images)}")
print(f"Unassigned images count: {len(unassigned)}")
if unassigned:
    print(f"Unassigned: {sorted(list(unassigned))}")
