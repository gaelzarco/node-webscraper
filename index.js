import puppeteer from "puppeteer-core";
import dotenv from "dotenv";

dotenv.config();
const {
    PROXY_ENDPOINT,
    PROXY_USERNAME,
    PROXY_PASSWORD
} = process.env;

async function run() {
    let browser;

    try {
        // 'brd-customer-<ACCOUNT ID>-zone-<ZONE NAME>:<PASSWORD>'
        const auth = `${PROXY_USERNAME}:${PROXY_PASSWORD}`

        browser = await puppeteer.connect({
            browserWSEndpoint: `wss://${auth}@${PROXY_ENDPOINT}`
        })

        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(2 * 60 * 1000);

        await page.goto('https://amazon.com')

        // const body = await page.$('body')

        const html = await page.evaluate(() => {
            document.documentElement.outerHTML
        })

        console.log(html)

        return
    } catch (err) {
        console.error("Scrape failed: ", err)
    } finally {
        await browser?.close()
    }

}

run()