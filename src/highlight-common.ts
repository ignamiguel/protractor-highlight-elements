import { 
  browser,
  ExpectedConditions,
  promise as wdpromise,
  ProtractorExpectedConditions 
} from 'protractor';

export class HighlightCommon {
  public readonly defaultTimeout = 10000;
  public readonly keyFrameName = 'animateBorderOne';
  public readonly expectedConditions: ProtractorExpectedConditions = ExpectedConditions;

  public checkKeyFrameRule(): wdpromise.Promise<{}> {
    // If findKeyframesRule function is not defined, define it
    const defineFindKeyframeFunctionScript = `if(typeof findKeyframesRule == 'undefined') {
      findKeyframesRule = (rule) => {\
          var ss = document.styleSheets;
          for (var i = 0; i < ss.length; ++i) {
            for (var j = 0; j < ss[i].cssRules.length; ++j) {
              if (ss[i].cssRules[j].type == window.CSSRule.KEYFRAMES_RULE && 
              ss[i].cssRules[j].name == rule) { 
                return ss[i].cssRules[j]; }
            }
          }
          return null;
        }
      }`;
    return browser.executeScript(defineFindKeyframeFunctionScript)
    .then(() => {
      // Check if specific keyframe rule is present
      const isKeyFrameRuleSetScript = `return findKeyframesRule('${this.keyFrameName}') != undefined`;
      return browser.executeScript(isKeyFrameRuleSetScript)
    })
    .then((isSet) => {
      if(isSet != true) {
        return this.createKeyFrameRule();
      }
    });
  }

  public createKeyFrameRule(): wdpromise.Promise<{}> {
    const createKeyFrameScript = `
    var style = document.createElement('style');\
    style.type = 'text/css';\
    var keyFrames = '\
    @keyframes ${this.keyFrameName} {\
        to {\
          outline-color: #FF0000;\
          box-shadow: 0 0 0 5px #E0E4CC;\
        }\
      }';
    style.innerHTML = keyFrames;
    document.getElementsByTagName('head')[0].appendChild(style);`;
    return browser.executeScript(createKeyFrameScript);
  }
}
