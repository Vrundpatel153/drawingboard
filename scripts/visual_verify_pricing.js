const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TARGET_URL = 'http://127.0.0.1:4173/pricing';
const ARTIFACTS_DIR = 'C:\\Users\\Vrund Patel\\.gemini\\antigravity\\brain\\0864642c-7ef4-4e85-93e6-a2656be1f4ef';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  console.log('🚀 Launching visible interactive Chrome on desktop...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false,
    defaultViewport: { width: 1440, height: 900 },
    args: [
      '--start-maximized',
      '--remote-debugging-port=9222',
      '--user-data-dir=' + path.join(process.env.TEMP, 'puppeteer_live_vis'),
      '--no-first-run',
      '--no-default-browser-check'
    ]
  });

  const page = (await browser.pages())[0] || (await browser.newPage());
  await page.setViewport({ width: 1440, height: 900 });

  console.log(`🌐 Navigating to ${TARGET_URL}...`);
  await page.goto(TARGET_URL, { waitUntil: 'networkidle2' });
  await sleep(1500);

  // 1. Screenshot Hero & Header
  console.log('📸 Capturing Hero section...');
  const heroPath = path.join(ARTIFACTS_DIR, 'pricing_01_hero.png');
  await page.screenshot({ path: heroPath });

  // 2. Click Brand + Packaging + Web tab
  console.log('🖱️ Clicking tab "Brand + Packaging + Web"...');
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('.tabs button'));
    const target = tabs.find(b => b.textContent.includes('Brand + Packaging + Web'));
    if (target) target.click();
  });
  await sleep(1000);

  // 3. Screenshot Investment section
  console.log('📸 Capturing Investment section for Brand + Packaging + Web...');
  const investmentPath = path.join(ARTIFACTS_DIR, 'pricing_02_investment_bundle.png');
  await page.screenshot({ path: investmentPath });

  // 4. Toggle Currency to USD $
  console.log('💵 Switching currency to USD...');
  await page.evaluate(() => {
    const usdBtn = Array.from(document.querySelectorAll('.currency-toggle button')).find(b => b.textContent.includes('USD'));
    if (usdBtn) usdBtn.click();
  });
  await sleep(1000);

  const usdPath = path.join(ARTIFACTS_DIR, 'pricing_03_usd_toggle.png');
  await page.screenshot({ path: usdPath });

  // 5. Scroll down to Deliverables (01 / The Deliverables)
  console.log('📜 Scrolling to Deliverables section...');
  await page.evaluate(() => {
    window.scrollBy({ top: 550, behavior: 'smooth' });
  });
  await sleep(1200);

  const deliverablesPath = path.join(ARTIFACTS_DIR, 'pricing_04_deliverables.png');
  await page.screenshot({ path: deliverablesPath });

  // 6. Scroll down to Commercial Details & FAQ
  console.log('📜 Scrolling to Commercial details & FAQ...');
  await page.evaluate(() => {
    window.scrollBy({ top: 700, behavior: 'smooth' });
  });
  await sleep(1200);

  // Open first FAQ
  await page.evaluate(() => {
    const details = document.querySelector('.faq details');
    if (details) details.open = true;
  });
  await sleep(600);

  const commercialPath = path.join(ARTIFACTS_DIR, 'pricing_05_commercial_and_faq.png');
  await page.screenshot({ path: commercialPath });

  // 7. Scroll to Enquiry Form
  console.log('📜 Scrolling to Enquiry Form...');
  await page.evaluate(() => {
    const enquire = document.getElementById('enquire');
    if (enquire) enquire.scrollIntoView({ behavior: 'smooth' });
  });
  await sleep(1200);

  const enquiryPath = path.join(ARTIFACTS_DIR, 'pricing_06_enquiry_form.png');
  await page.screenshot({ path: enquiryPath });

  console.log('✅ Visual verification complete! All screenshots saved.');
  await sleep(2000);
  await browser.close();
}

main().catch(err => {
  console.error('❌ Error during visual verification:', err);
  process.exit(1);
});
