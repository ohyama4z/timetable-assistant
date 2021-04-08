const puppeteer = require("puppeteer");
(async() => {
    const browser = await puppeteer.launch();
    const page = (await browser.pages())[0];
    await page.goto("https://github.com/ohyama4z");
    const username = await page.$eval(".p-name", (item) => {
        return item.textContent;
    });
    console.log(username);
    browser.close();
})();