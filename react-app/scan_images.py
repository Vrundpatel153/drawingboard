import json
import os

with open('react-app/src/data/projectsData.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for p in data:
    pid = p.get('id')
    title = p.get('title')
    imgs = p.get('images', [])
    print(f"{pid}: {title} - {len(imgs)} images")
