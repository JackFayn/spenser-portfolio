const { chromium } = require('@playwright/test');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

    const filePath = `file://${__dirname}/index.html`;
    await page.goto(filePath, { waitUntil: 'networkidle' });

    // Full page screenshot
    await page.screenshot({ path: 'audit-full.png', fullPage: true });

    // Hero section
    await page.screenshot({ path: 'audit-hero.png' });

    // Scroll to About
    await page.evaluate(() => document.querySelector('#about').scrollIntoView());
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'audit-about.png' });

    // Scroll to Career
    await page.evaluate(() => document.querySelector('#career').scrollIntoView());
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'audit-career.png' });

    // Scroll to Project
    await page.evaluate(() => document.querySelector('#project').scrollIntoView());
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'audit-project.png' });

    // Scroll to Project images
    await page.evaluate(() => {
        const imgs = document.querySelector('.project-images');
        if (imgs) imgs.scrollIntoView();
    });
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'audit-project-images.png' });

    // Scroll to Experience
    await page.evaluate(() => document.querySelector('#experience').scrollIntoView());
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'audit-experience.png' });

    // Scroll to Contact
    await page.evaluate(() => document.querySelector('#contact').scrollIntoView());
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'audit-contact.png' });

    await browser.close();
    console.log('Screenshots saved.');
})();
