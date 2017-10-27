import { browser } from 'protractor';
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  multiCapabilities: [{ chromeOptions:
    { args: ['disable-infobars=true']},
      browserName: 'chrome',
      maxInstances: 2,
      shardTestFiles: true
    }],
  onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
    browser.ignoreSynchronization = true
  },
  jasmineNodeOpts: {
    print: function() {}
 },
 suites: {
   demo1: [
     '../test/*.js'
   ]
 }
};
