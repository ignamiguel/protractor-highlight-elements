module.exports = function() {
  const defaultTimeout = 10000;
  this.started = false;
  this.keyFrameName = 'animateBorderOne';

  this.checkKeyFrameRule = () => {
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
    // Check if specific keyframe rule is present
    const isKeyFrameRuleSetScript = `return findKeyframesRule('${animateBorderOne}') != undefined`;
    return browser.executeScript(defineFindKeyframeFunctionScript)
    .then(() => {
      return browser.executeScript(isKeyFrameRuleSetScript)
    })
    .then((isSet) => {
      if(isSet != true) {
        return this.createKeyFrameRule();
      }
    });
  }

  this.createKeyFrameRule = () =>  {
    const createKeyFrameScript = `
    var style = document.createElement('style');\
    style.type = 'text/css';\
    var keyFrames = '\
    @keyframes ${animateBorderOne} {\
        to {\
          outline-color: #FF0000;\
          box-shadow: 0 0 0 5px #E0E4CC;\
        }\
      }';
    style.innerHTML = keyFrames;
    document.getElementsByTagName('head')[0].appendChild(style);`;
    return browser.executeScript(createKeyFrameScript);
  }

  this.highlightElement = (element, duration) => {
    if(duration == null) {
      duration = 2;
    }
    this.checkKeyFrameRule();
    return browser.wait(ExpectedConditions.elementToBeClickable(element), this.defaultTimeout)
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
      animation: 0.2s animateBorderOne ease infinite`);
    })
    .then(() => {
      return browser.sleep(duration * 1000);
    })
    .then(() => {
      return browser.executeScript('arguments[0].setAttribute(arguments[1], arguments[2])',
      element.getWebElement(),
      'style',
      originalStyle);
    });
  }
}
