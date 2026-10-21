import easyocr
import cv2

reader = easyocr.Reader(['en'], gpu=False)

for path in ['react-app/public/images/murami/murami_14.png', 'react-app/public/images/matcha-club/matcha-club_16.png']:
    print('=== Testing:', path)
    # resize if huge to speed up OCR
    img = cv2.imread(path)
    h, w = img.shape[:2]
    # read results
    results = reader.readtext(path)
    for bbox, text, prob in results:
        print(f"[{prob:.2f}] {text} @ {bbox}")
