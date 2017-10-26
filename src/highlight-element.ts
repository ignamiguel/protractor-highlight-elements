
import { 
  browser,
  ElementFinder,
  promise as wdpromise } from 'protractor';
import { HighlightCommon } from './highlight-common';

export class HighlightElement extends HighlightCommon {
 
  constructor() {
    super();
  }

  public highlightElement(element: ElementFinder, duration:number = 2): wdpromise.Promise<{}> {
    return this.checkKeyFrameRule()
      .then(() => {
        return browser.wait(this.expectedConditions.presenceOf(element), this.defaultTimeout)
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
        animation: 0.2s ${this.keyFrameName} ease infinite`).then(_ => originalStyle);
      })
      .then((originalStyle) => {
        return browser.sleep(duration * 1000).then(_ => originalStyle);
      })
      .then((originalStyle) => {
        return browser.executeScript('arguments[0].setAttribute(arguments[1], arguments[2])',
        element.getWebElement(),
        'style',
        originalStyle);
      });
  }
}
