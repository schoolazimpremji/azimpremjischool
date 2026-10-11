import zipfile
import json
import os
import re

with open('scripts/extracted_raw_plants.json', 'r', encoding='utf-8') as f:
    blocks = json.load(f)

out_dir = os.path.join('public', 'images', 'plants')
os.makedirs(out_dir, exist_ok=True)

# Generate a clean slug for each plant
def make_slug(name):
    s = name.lower()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    s = s.strip('-')
    return s

with zipfile.ZipFile('A3 Project Details (5).docx', 'r') as z:
    for idx, b in enumerate(blocks[:46]):
        header = b['header']
        imgs = b['images']
        print(f"Plant {idx+1:02d}: {header} ({len(imgs)} imgs)")
        for img_idx, img_rel_path in enumerate(imgs):
            # img_rel_path is like 'media/image36.jpg'
            zip_entry = 'word/' + img_rel_path
            ext = os.path.splitext(img_rel_path)[1].lower()
            target_filename = f"plant_{idx+1:02d}_{img_idx+1}{ext}"
            target_path = os.path.join(out_dir, target_filename)
            
            with open(target_path, 'wb') as out_f:
                out_f.write(z.read(zip_entry))
            print(f"   -> Wrote {target_filename} ({os.path.getsize(target_path)} bytes)")

print("\nExtraction complete! Files in public/images/plants:")
files = os.listdir(out_dir)
print(f"Total files: {len(files)}")
