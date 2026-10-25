from rapidocr_onnxruntime import RapidOCR

engine = RapidOCR()

patched_files = [
    "react-app/public/images/covalent/covalent_02.png",
    "react-app/public/images/covalent/covalent_03.png",
    "react-app/public/images/radiance/radiance_04.png",
    "react-app/public/images/melden/melden_11.png",
    "react-app/public/images/helione/helione_02.png",
    "react-app/public/images/aerotech/aerotech_06.png",
    "react-app/public/images/aerotech/aerotech_16.png",
    "react-app/public/images/daisy/daisy_06_tokens_and_type.webp",
    "react-app/public/images/henro/henro_09.png",
    "react-app/public/images/henro/henro_13.png",
    "react-app/public/images/henro/henro_14.png",
    "react-app/public/images/henro/henro_15.png",
    "react-app/public/images/henro/henro_16.png",
    "react-app/public/images/seroq/seroq_07.png",
    "react-app/public/images/seroq/seroq_14.png",
    "react-app/public/images/seroq/seroq_15.png",
    "react-app/public/images/seroq/seroq_11.png",
    "react-app/public/images/newdestin/newdestin_15.png",
    "react-app/public/images/newdestin/newdestin_13.png",
    "react-app/public/images/newdestin/newdestin_02.png",
    "react-app/public/images/westerico/westerico_16.png",
    "react-app/public/images/moverunion/moverunion_04.png",
    "react-app/public/images/flint/flint_18.png",
    "react-app/public/images/flint/flint_10.png",
    "react-app/public/images/flint/flint_19.png"
]

print("=== VERIFYING PATCHES ===")
issues = 0
for f in patched_files:
    res, _ = engine(f)
    texts = [r[1] for r in res] if res else []
    # Check for Obrazur
    obz = [t for t in texts if 'obrazur' in t.lower()]
    # Check for unwanted emails
    bad_emails = [t for t in texts if '@' in t and 'dandelionpa7@gmail.com' not in t.lower() and '@henro.co' not in t.lower()]
    # Check for unwanted agency domains
    bad_domains = [t for t in texts if 'solitone' in t.lower()]
    
    if obz or bad_emails or bad_domains:
        print(f"[FAIL] {f}: Obrazur: {obz}, Bad Emails: {bad_emails}, Bad Domains: {bad_domains}")
        issues += 1
    else:
        found_ok = [t for t in texts if 'dandelionpa7@gmail.com' in t.lower() or 'drawingsboard.com' in t.lower()]
        print(f"[PASS] {f.split('/')[-1]}: {found_ok if found_ok else 'Clean (credit erased)'}")

print(f"\nVerification finished! Issues found: {issues}")
