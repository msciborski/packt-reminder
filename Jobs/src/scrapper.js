const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const url = 'https://www.packtpub.com/packt/offers/free-learning';

const getBody = async (url) => {
  try {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('.product__title', { timeout: 1000 });

    const body = await page.evaluate(() => (document.querySelector('body').innerHTML));

    return body;
  } catch (err) {
    console.log(err);
  }
}

const getCheerio = (body) => {
  return cheerio.load(body);
}

exports.getBookInformation = async (url) => {
  const body = await getBody(url);
  const $ = getCheerio(body);
  const title = $('.product__title').html();

  return {
    title,
  };
}