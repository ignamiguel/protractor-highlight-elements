const protractor = require('protractor');
const HighlightPosition = require('../src/highlight-position');
const HighlightElement = require('../src/highlight-element');
const EC = require('protractor').ExpectedConditions;
const wallyImg = element(by.id('image-wally'));
const hp = new HighlightPosition();
const he = new HighlightElement();
const timeout = 600 * 1000;
const dreamTime = 1 * 1000;

describe('"the-internet" Protractor DEMO', ()=> {
  it('should locate the square', () => {
    browser.get('http://localhost:9292/position');

    browser.wait(EC.presenceOf(wallyImg));
    browser.sleep(dreamTime);
    // he.highlightElement(wallyImg);
    browser.sleep(dreamTime);
    wallyImg.click().then(() => {}, (error) => {
      hp.checkError(error);
    });
    // wallyImg.click();
    browser.sleep(dreamTime);
  }, timeout);
});
