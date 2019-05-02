const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const scrapper = require('./scrapper');

(async () => {
  await scrapper.getBookInformation('https://www.packtpub.com/packt/offers/free-learning');
  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();
  // await page.goto('https://www.packtpub.com/packt/offers/free-learning');
  // await page.waitForSelector('.product__title', { timeout: 1000 });

  // const body = await page.evaluate(() => {
  //   return document.querySelector('body').innerHTML;
  // });

  // const $ = cheerio.load(body);
  // const title = $('.product__title').html();
  // console.log(title);
})();