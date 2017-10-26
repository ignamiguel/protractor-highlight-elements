import { HighlightCommon } from './highlight-common';
import { browser, promise as wdpromise } from 'protractor';
const Config = require('../config/highlight-config');

export class HighlightPosition extends HighlightCommon {
  public readonly config = new Config();

  constructor() {
    super();
  }

  public checkError(error: any) {
    const msg = error.message;
    let startingPoint = msg.indexOf('is not clickable at point');
    let endingPoint = msg.indexOf('. Other element would receive the click:');
    const offset = 26;
    const point = msg.slice(startingPoint + offset, endingPoint);
    startingPoint = point.indexOf('(');
    endingPoint = point.indexOf(',');
    const left = point.slice(startingPoint + 1, endingPoint);
    startingPoint = point.indexOf(',');
    endingPoint = point.indexOf(')');
    const top = point.slice(startingPoint + 2, endingPoint);

    this.highlightPosition(top, left, this.config.position.defaultDuration);
  }

  public highlightPosition(top: string, left: string, duration: number): wdpromise.Promise<void> {
    this.checkKeyFrameRule();
    const script = `var positionDiv = document.createElement("div");
    positionDiv.setAttribute("style",
    "top: ${top}px;left: ${left}px;color: #FFFF00; outline: 5px dashed #FFFF00;\
    box-shadow: 0 0 0 5px #69D2E7; animation: 0.2s animateBorderOne ease infinite;\
    z-index: 5000; position: absolute; width: 20px; height: 20px;");
    positionDiv.innerHTML = '<div style="\
    width: 0;\
    height: 0;\
    border-bottom: 16px solid ${this.config.position.arrowColor};\
    border-left: 8px solid transparent;\
    border-right: 8px solid transparent;\
    float: left;\
    transform: rotate(-45deg);"></div>';
    document.children[0].children[1].appendChild(positionDiv);
    setTimeout(function(){ positionDiv.remove(); }, ${duration} * 1000);`;
    return browser.executeScript(script)
      .then(() => browser.sleep(duration * 1000));
  }
}
