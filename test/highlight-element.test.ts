// Highlight Element
import { browser, element, by } from 'protractor';
import { HighlightElement } from '../src/highlight-element';

const EC = require('protractor').ExpectedConditions;
const usernameField = element(by.id('username'));
const passwordField = element(by.id('password'));
const loginButton = element(by.css('[class=radius]'));
const headerLabel = element(by.css('[class="example"] h2'));
const logoutButton = element(by.css('[class="button secondary radius"]'));
const successLoginLabel = element(by.css('[class="flash success"]'));
const timeout = 600 * 1000;
const dreamTime = 1 * 1000;
const highlightElement = new HighlightElement();
const duration = 2;

describe('"the-internet" Protractor DEMO', ()=> {
  it('should navigate to login page', () => {
    browser.get('http://localhost:9292/login');
    browser.wait(EC.presenceOf(headerLabel));
    
    highlightElement.highlightElement(headerLabel, duration);
    expect(headerLabel.getText()).toBe('Login Page');
  }, timeout);

  it('should login with user and password', () => {
    browser.wait(EC.presenceOf(usernameField));

    highlightElement.highlightElement(usernameField, duration);
    usernameField.sendKeys('tomsmith');
    highlightElement.highlightElement(passwordField, duration);
    passwordField.sendKeys('SuperSecretPassword!');

    highlightElement.highlightElement(loginButton, duration);
    loginButton.click();
    
    highlightElement.highlightElement(successLoginLabel, duration);
    expect(successLoginLabel.isPresent()).toBe(true);
  }, timeout);

  it('should logout', () => {
    browser.sleep(dreamTime);

    highlightElement.highlightElement(logoutButton, duration);
    logoutButton.click();

    highlightElement.highlightElement(headerLabel, duration);
    expect(headerLabel.getText()).toBe('Login Page');
  }, timeout)
});
