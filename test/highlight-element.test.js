// Highlight Element
const EC = require('protractor').ExpectedConditions;
const usernameField = element(by.id('username'));
const passwordField = element(by.id('password'));
const loginButton = element(by.css('[class=radius]'));
const headerLabel = element(by.css('[class="example"] h2'));
const logoutButton = element(by.css('[class="button secondary radius"]'));
const successLoginLabel = element(by.css('[class="flash success"]'));
const timeout = 600 * 1000;
const dreamTime = 1 * 1000;
const HighlightElement = require('../src/highlight-element');
const h = new HighlightElement();
const duration = 2;

describe('"the-internet" Protractor DEMO', ()=> {
  it('should navigate to login page', () => {
    browser.get('http://the-internet.herokuapp.com/login');
    browser.wait(EC.presenceOf(headerLabel));
    
    h.highlightElement(headerLabel, duration);
    expect(headerLabel.getText()).toBe('Login Page');
  }, timeout);

  it('should login with user and password', () => {
    browser.wait(EC.presenceOf(usernameField));

    h.highlightElement(usernameField, duration);
    usernameField.sendKeys('tomsmith');
    h.highlightElement(passwordField, duration);
    passwordField.sendKeys('SuperSecretPassword!');

    h.highlightElement(loginButton, duration);
    loginButton.click();
    
    h.highlightElement(successLoginLabel, duration);
    expect(successLoginLabel.isPresent()).toBe(true);
  }, timeout);

  it('should logout', () => {
    browser.sleep(dreamTime);

    h.highlightElement(logoutButton, duration);
    logoutButton.click();

    h.highlightElement(headerLabel, duration);
    expect(headerLabel.getText()).toBe('Login Page');
  }, timeout)
});
