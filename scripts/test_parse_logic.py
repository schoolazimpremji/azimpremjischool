import json
import re

with open('scripts/extracted_raw_plants.json', 'r', encoding='utf-8') as f:
    blocks = json.load(f)

# Inspect what section labels exist across all blocks
section_labels = set()
for b in blocks[:46]:
    for p in b['paragraphs']:
        m = re.match(r'^([A-Za-z0-9\s/–—\-–]+):', p)
        if m and len(m.group(1)) < 35:
            section_labels.add(m.group(1).strip())

print(f"Discovered section labels ({len(section_labels)}):")
for s in sorted(section_labels):
    print(" -", s)
