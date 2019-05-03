const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

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

const getTitle = ($) => {
  return $('.product__title').html();
}

const getDescription = ($) => {
  const description = $('.product__right ul').children().map(function(i, el) {
    return $(this).text();
  }).get().join(' ');

  return description;
}

exports.getBookInformation = async (url) => {
  const body = await getBody(url);
  const $ = getCheerio(body);
  const description = getDescription($);
  const title = getTitle($);

  return {
    title,
    description,
  };
}