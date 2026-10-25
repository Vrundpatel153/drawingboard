import json

with open('ocr_findings.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

targets = [
    'covalent_02.png', 'covalent_03.png', 'helione_02.png', 'melden_11.png', 'radiance_04.png',
    'aerotech_06.png', 'aerotech_16.png', 'daisy_06_tokens_and_type.webp',
    'henro_09.png', 'henro_13.png', 'henro_14.png', 'henro_15.png', 'henro_16.png',
    'newdestin_02.png', 'newdestin_13.png', 'newdestin_15.png',
    'seroq_07.png', 'seroq_11.png', 'seroq_14.png', 'seroq_15.png',
    'westerico_16.png', 'moverunion_04.png', 'flint_10.png', 'flint_18.png', 'flint_19.png'
]

for item in data:
    if any(t == item['image'] for t in targets):
        print(f"\n=======================================================")
        print(f"FILE: {item['folder']}/{item['image']} ({item['dimensions'][0]}x{item['dimensions'][1]})")
        for h in item['hits']:
            print(f"  TEXT: {h['text']}")
            print(f"  BOX:  {h['box']}")
