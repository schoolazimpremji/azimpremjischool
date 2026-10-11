import fitz
import re

doc = fitz.open('A3 Project Details (1).pdf')

plant_pages = {}
current_plant = None

for i, page in enumerate(doc):
    page_num = i + 1
    text = page.get_text()
    imgs = page.get_images()
    
    # Check for plant heading pattern
    # e.g., PLANT 1, PLANT 2, Plant- 27, Plant 42 – Jackfruit
    matches = re.findall(r'(?:PLANT|Plant)\s*[-–]?\s*(\d+)(?:\s*[-–]\s*([^\n\r]+))?', text)
    
    first_lines = [l.strip() for l in text.split('\n') if l.strip()]
    
    if matches:
        for m in matches:
            p_num = int(m[0])
            p_extra = m[1].strip() if m[1] else ""
            current_plant = p_num
            if current_plant not in plant_pages:
                plant_pages[current_plant] = {
                    'start_page': page_num,
                    'pages': [page_num],
                    'extra': p_extra,
                    'images': len(imgs),
                    'sample_text': first_lines[:3]
                }
    elif current_plant:
        if current_plant in plant_pages:
            plant_pages[current_plant]['pages'].append(page_num)
            plant_pages[current_plant]['images'] += len(imgs)

print(f"Total distinct plants found in PDF: {len(plant_pages)}")
for p_num in sorted(plant_pages.keys()):
    p_info = plant_pages[p_num]
    pg_range = f"P{p_info['start_page']}-P{p_info['pages'][-1]}" if len(p_info['pages']) > 1 else f"P{p_info['start_page']}"
    print(f"Plant {p_num:2d} | Pages: {pg_range:<7} | Images: {p_info['images']} | {p_info['extra']} | {p_info['sample_text']}")
