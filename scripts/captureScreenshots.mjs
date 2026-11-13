import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.join(__dirname, '..', 'docs', 'screenshots');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function capture() {
  console.log('Launching Chrome from:', chromePath);
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
    defaultViewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1.5,
    },
  });

  const page = await browser.newPage();

  // 1. Capture Landing Page
  console.log('Navigating to Landing Page: http://localhost:5173/landing');
  await page.goto('http://localhost:5173/landing', { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 1500));
  const landingPath = path.join(screenshotsDir, 'landing-preview.png');
  await page.screenshot({ path: landingPath });
  console.log('Saved Landing Page screenshot to:', landingPath);

  // 2. Set Auth State for Desktop Dashboard
  console.log('Setting auth state and navigating to Dashboard...');
  await page.evaluate(() => {
    const demoUser = {
      id: 'demo-user-01',
      name: 'Adv. Akash Sharma',
      email: 'demo@vidhiai.in',
      password: 'vidhi2026',
      role: 'UPSC Aspirant & Legal Scholar',
      targetExam: 'UPSC CSE 2026 / Judiciary Exam',
      avatar: '⚖️',
      initials: 'AS',
      joinedDate: 'November 2024',
    };
    localStorage.setItem('vidhi_auth_user', JSON.stringify(demoUser));
    localStorage.setItem('kanoon_auth_user', JSON.stringify(demoUser));
  });

  // Navigate to Dashboard
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 1500));
  const dashboardPath = path.join(screenshotsDir, 'dashboard-preview.png');
  await page.screenshot({ path: dashboardPath });
  console.log('Saved Dashboard screenshot to:', dashboardPath);

  // 3. Constitution Page
  console.log('Navigating to Constitution Page...');
  await page.goto('http://localhost:5173/constitution', { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 1500));
  const constitutionPath = path.join(screenshotsDir, 'constitution-preview.png');
  await page.screenshot({ path: constitutionPath });
  console.log('Saved Constitution screenshot to:', constitutionPath);

  // 4. UPSC Mode Page
  console.log('Navigating to UPSC Mode Page...');
  await page.goto('http://localhost:5173/upsc', { waitUntil: 'networkidle0', timeout: 15000 });
  await new Promise(r => setTimeout(r, 1500));
  const upscPath = path.join(screenshotsDir, 'upsc-preview.png');
  await page.screenshot({ path: upscPath });
  console.log('Saved UPSC Mode screenshot to:', upscPath);

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});

