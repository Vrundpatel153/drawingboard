const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TARGET_URL = 'http://127.0.0.1:4173/newhome';
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
      '--user-data-dir=' + path.join(process.env.TEMP, 'puppeteer_newhome_vis'),
      '--no-first-run',
      '--no-default-browser-check'
    ]
  });

  const page = (await browser.pages())[0] || (await browser.newPage());
  await page.setViewport({ width: 1440, height: 900 });

  console.log(`🌐 Navigating to ${TARGET_URL}...`);
  await page.goto(TARGET_URL, { waitUntil: 'networkidle2' });
  await sleep(2000);

  // 1. Screenshot Hero section
  console.log('📸 1. Capturing Hero section...');
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'newhome_01_hero.png') });

  // 2. Scroll to Manifesto and Bento Grid
  console.log('📜 2. Scrolling to Bento Grid...');
  await page.evaluate(() => {
    document.getElementById('work').scrollIntoView({ behavior: 'smooth' });
  });
  await sleep(1500);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'newhome_02_bento_grid.png') });

  // 3. Click Quick View on first card
  console.log('🔍 3. Opening Quick View modal for After8®...');
  await page.evaluate(() => {
    const btn = document.querySelector('.quick-view-btn');
    if (btn) btn.click();
  });
  await sleep(1000);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'newhome_03_quick_view_modal.png') });

  // Close modal
  await page.evaluate(() => {
    const closeBtn = document.querySelector('.case-modal-close');
    if (closeBtn) closeBtn.click();
  });
  await sleep(600);

  // 4. Scroll to Interactive Process (Scroll-Story)
  console.log('📜 4. Scrolling through Scroll-Story process...');
  await page.evaluate(() => {
    document.getElementById('process').scrollIntoView({ behavior: 'smooth' });
  });
  await sleep(1500);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'newhome_04_scroll_story.png') });

  // 5. Scroll to Studio & Value props
  console.log('📜 5. Scrolling to Studio & Fine Print...');
  await page.evaluate(() => {
    document.getElementById('studio').scrollIntoView({ behavior: 'smooth' });
  });
  await sleep(1500);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'newhome_05_studio_and_values.png') });

  // 6. Scroll to FAQ & Brief Builder
  console.log('📜 6. Scrolling to FAQ & Brief Builder...');
  await page.evaluate(() => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });
  await sleep(1500);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'newhome_06_faq_and_brief.png') });

  // 7. Test Mobile Viewport
  console.log('📱 7. Testing Mobile Viewport...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  });
  await sleep(1200);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'newhome_07_mobile_hero.png') });

  console.log('✅ All visual verifications captured successfully!');
  await browser.close();
}

main().catch(err => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
