import puppeteer from "puppeteer-core";
import dotenv from "dotenv";

dotenv.config();
const {
    PROXY_ENDPOINT,
    PROXY_USER,
    PROXY_PASSWORD
} = process.env;

async function run() {
    let browser;

    try {
        browser = await puppeteer.connect({
            browserWSEndpoint: PROXY_ENDPOINT
        })
    } catch (err) {
        console.error("Scrape failed: ", err)
    } finally {
        await browser?.close()
    }

}