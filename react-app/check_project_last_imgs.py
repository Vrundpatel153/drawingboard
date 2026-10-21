import json

with open('react-app/src/data/projectsData.json', 'r', encoding='utf-8') as f:
    projects = json.load(f)

for p in projects:
    pid = p.get('id')
    title = p.get('title')
    imgs = p.get('images', [])
    last_imgs = imgs[-3:] if len(imgs) >= 3 else imgs
    print(f"ID: {pid} | {title}")
    for im in last_imgs:
        print(f"   -> {im}")
