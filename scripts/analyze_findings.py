import json

with open('ocr_findings.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Total findings: {len(data)}")

by_category = {
    'obrazur_or_credit': [],
    'emails': [],
    'websites': []
}

for item in data:
    folder = item['folder']
    img = item['image']
    for h in item['hits']:
        text = h['text']
        credits = h['credits']
        emails = h['clean_emails']
        urls = h['clean_urls']
        
        if credits or any(x in text.lower() for x in ['obrazur', 'behance', 'dribbble']):
            by_category['obrazur_or_credit'].append((folder, img, text, h['box']))
        elif emails:
            by_category['emails'].append((folder, img, text, emails, h['box']))
        elif urls:
            by_category['websites'].append((folder, img, text, urls, h['box']))

print('\n=== 1. OBRAZUR / AGENCY / CREDITS FOUND ===')
for c in by_category['obrazur_or_credit']:
    print(f'{c[0]}/{c[1]}: "{c[2]}"')

print('\n=== 2. EMAILS FOUND ===')
for e in by_category['emails']:
    print(f'{e[0]}/{e[1]}: "{e[2]}" -> {e[3]}')

print('\n=== 3. WEBSITES (ALL) ===')
for w in by_category['websites']:
    print(f'{w[0]}/{w[1]}: "{w[2]}" -> {w[3]}')
