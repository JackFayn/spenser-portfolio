const { chromium } = require('@playwright/test');
const path = require('path');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    const filePath = 'file://' + path.resolve(__dirname, 'index.html');
    await page.goto(filePath, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
        const el = document.querySelector('#resume');
        el.scrollIntoView({ block: 'start' });
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'audit-resume.png' });

    // Also get the download button area
    await page.evaluate(() => {
        const el = document.querySelector('.download-btn');
        if (el) el.scrollIntoView({ block: 'center' });
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'audit-resume-btn.png' });

    await browser.close();
    console.log('Done');
})();
