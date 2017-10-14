const HCommons = require('./highlight-common');
const EC = require('protractor').ExpectedConditions;

module.exports = function() {
  this.hCommons = new HCommons();
  const defaultTimeout = 10000;

  this.highlightElement = (element, duration) => {
    if(duration == null) {
      duration = 2;
    }
    return this.hCommons.checkKeyFrameRule()
      .then(() => {
        return browser.wait(EC.presenceOf(element), this.defaultTimeout)
      })
      .then(() => {
        return element.getAttribute('style')
      })
      .then((originalStyle) => {
        return browser.executeScript('arguments[0].setAttribute(arguments[1], arguments[2])',
        element.getWebElement(),
        'style',
        `color: #FFFF00;\
        outline: 5px dashed #FFFF00;\
        box-shadow: 0 0 0 5px #69D2E7;\
        animation: 0.2s ${this.hCommons.keyFrameName} ease infinite`);
      })
      .then(() => {
        return browser.sleep(duration * 1000);
      })
      .then((originalStyle) => {
        return browser.executeScript('arguments[0].setAttribute(arguments[1], arguments[2])',
        element.getWebElement(),
        'style',
        originalStyle);
      });
  }
}
