import re

with open('developers/index.html', 'r') as f:
    content = f.read()
    
# Count opening and closing tags
opens = {
    'div': len(re.findall(r'<div[^>]*>', content)),
    'section': len(re.findall(r'<section[^>]*>', content)),
    'main': len(re.findall(r'<main[^>]*>', content)),
}

closes = {
    'div': len(re.findall(r'</div>', content)),
    'section': len(re.findall(r'</section>', content)),
    'main': len(re.findall(r'</main>', content)),
}

for tag in opens:
    print(f'{tag}: {opens[tag]} opens, {closes[tag]} closes')
    if opens[tag] != closes[tag]:
        print(f'  MISMATCH: {opens[tag] - closes[tag]} unclosed {tag} tags')