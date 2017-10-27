import { browser, ExpectedConditions, ElementFinder, element, by } from  'protractor';
import { HighlightPosition} from '../src/highlight-position';
import { HighlightElement } from '../src/highlight-element';
const highlightElement = new HighlightElement();
const highlightPosition = new HighlightPosition();
const EC = ExpectedConditions;

const wallyImage: ElementFinder = element(by.id('image-wally'));
const timeout = 600 * 1000;
const dreamTime = 1 * 1000;

describe('"the-internet" Protractor DEMO', ()=> {
  it('should locate the square', () => {
    browser.get('http://localhost:9292/position');

    browser.wait(EC.presenceOf(wallyImage));
    browser.sleep(dreamTime);
    highlightElement.highlightElement(wallyImage);
    browser.sleep(dreamTime);
    wallyImage.click().then(() => {}, (error) => {
      highlightPosition.evaluateNotClickableError(error);
    });
    wallyImage.click();
    browser.sleep(dreamTime);
  }, timeout);
});
