import { browser } from "@wdio/globals";
import Page from "./page.js";

const logo = "//android.widget.FrameLayout[@resource-id='com.android.chrome:id/sheet_container']";
const entryTitle = "//android.widget.TextView[@text='Zaloguj się przez email']";
const emailInput = "//android.widget.EditText[@resource-id='email']";
const passwordInput = "//android.widget.EditText[@resource-id='haslo']";
const signUpBtn = "//android.widget.Button[@content-desc='Sign Up']";
const googleSignInBtn = "//android.widget.Button[@resource-id='com.android.chrome:id/touch_to_fill_button_title']";
const signInBtn = "//android.widget.Button[@text='Zaloguj']";
const accountHolderName = "//android.widget.TextView[@text]"; 
const accountHolderAvatar = "//android.widget.Image[@text]"; 
const burgerMenu = "//android.view.View[@resource-id='mainNav']/android.widget.ListView/android.view.View[4]";
const wantToOrder = "//android.view.View[@resource-id='siteWrapper']/android.view.View/android.view.View/android.view.View[3]";
const ordered = "//android.view.View[@resource-id='siteWrapper']/android.view.View/android.view.View/android.view.View[5]";
const homeBtn = "//android.view.View[@content-desc='psp2b.marciniakobiady']";
const signOutBtn = "//android.view.View[@content-desc='Wyloguj']";
const allDays = "//android.widget.TextView[@text='Zaznacz wszystkie dni']";
const cart = "//android.widget.TextView[ends-with(@text, ' PLN')]";
const cartHomePage = "//android.widget.Image[@text='koszyk']";
const cleanCart = "//android.view.View[@content-desc='Wyczyść koszyk']";


class Entry extends Page {
  public async scrollByCustomFingerPosition(
    percent: number,
    times: number,
    startXOffset: number = 0.5, // 0.5 means middle of the screen (default)
    startYOffset: number = 0.5, // 0.5 means middle of the screen (default)
    endYOffset: number = 0 // 0 for scrolling up (default), 1 for scrolling down 
  ): Promise<void> {
    const { width, height } = await driver.getWindowRect();
    
    // Calculate the start and end Y positions based on the provided percentage
    const startX = Math.floor(width * startXOffset); // Start at a custom X position
    const startY = Math.floor(height * startYOffset); // Start at a custom Y position
    const endY = endYOffset === 1 ? Math.floor(height * (1 - percent)) : Math.floor(height * percent); // Adjust based on scroll direction

    for (let i = 0; i < times; i++) {
      await driver.performActions([{
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: startX, y: startY },
          { type: 'pointerDown', button: 0 },
          { type: 'pause', duration: 500 },
          { type: 'pointerMove', duration: 1000, x: startX, y: endY },
          { type: 'pointerUp', button: 0 }
        ]
      }]);

      await driver.releaseActions();
      await browser.pause(1000); // Wait for the scroll to complete
    }
  }

  public async scrollDownByPercentage(percent: number, times: number = 1): Promise<void> {
    const { width, height } = await driver.getWindowRect();
    const startX = Math.floor(width / 2);
    const startY = Math.floor(height * (1 - percent / 2)); // Start lower on the screen
    const endY = Math.floor(height * (percent / 2)); // End higher on the screen

    for (let i = 0; i <= times; i++) { 
      await driver.performActions([{
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: startX, y: startY },
          { type: 'pointerDown', button: 0 },
          { type: 'pause', duration: 500 },
          { type: 'pointerMove', duration: 1000, x: startX, y: endY },
          { type: 'pointerUp', button: 0 }
        ]
      }]);
      
      await driver.releaseActions();
      await browser.pause(1000); // Wait for the scroll to complete
    }
  }

  public async scrollUpByPercentage(percent: number, times: number = 1): Promise<void> {
    const { width, height } = await driver.getWindowRect();
    const startX = Math.floor(width / 2);

    // For scrolling up, start lower and end higher on the screen
    const startY = Math.floor(height * (percent / 2)); // Start closer to the bottom
    const endY = Math.floor(height * (1 - percent / 2)); // End closer to the top

    for (let i = 0; i < times; i++) { 
      await driver.performActions([{
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: startX, y: startY },
          { type: 'pointerDown', button: 0 },
          { type: 'pause', duration: 500 },
          { type: 'pointerMove', duration: 1000, x: startX, y: endY },
          { type: 'pointerUp', button: 0 }
        ]
      }]);

      await driver.releaseActions();
      await browser.pause(1000); // Wait for the scroll to complete
    }
  }

  public async isLogoDisplayed(): Promise<boolean> {
    return await this.isElementDisplayed(logo);
  }

  public async isEntryTitleDisplayed(): Promise<boolean> {
    return await this.isElementDisplayed(entryTitle);
  }

  public async isSignUpButtonDisplayed(): Promise<boolean> {
    return await this.isElementDisplayed(signUpBtn);
  }

  public async clickEmailInput(): Promise<void> {
    await this.clickElement(emailInput);
  }

  public async typeEmailInput(email: string): Promise<void> {
    await this.setElementInputValue(emailInput, email);
  }

  public async typePasswordInput(password: string): Promise<void> {
    await this.setElementInputValue(passwordInput, password);
  }

  public async clickGoogleSignInButton(): Promise<void> {
    await this.clickElement(googleSignInBtn);
  }

  public async clickSignInButton(): Promise<void> {
    await this.clickElement(signInBtn);
  }

  public async isAccountHolderAvatarDisplayed(): Promise<boolean> {
    return await this.isElementDisplayed(accountHolderAvatar);
  }

  public async isAccountHolderNameDisplayed(): Promise<boolean> {
    return await this.isElementDisplayed(accountHolderName);
  }

  public async isOrderedDisplayed(): Promise<boolean> {
    return await this.isElementDisplayed(ordered);
  }

  public async isWantToOrderDisplayed(): Promise<boolean> {
    return await this.isElementDisplayed(wantToOrder);
  }

  public async clickWantToOrder(): Promise<void> {
    await this.clickElement(wantToOrder);
  }

  public async isOrderSectionNameDisplayed(name: string): Promise<boolean> {
    return await this.isElementDisplayed(name);
  }

  public async getOrderedDays(days: string): Promise<number> {
    const orderedDaysText = await this.getElementText(days);
    return +orderedDaysText.replace(/\D/g, "");
  }

  public async getOrderPrice(price: string): Promise<number> {
    const orderPriceText = await this.getElementText(price);
    const match = orderPriceText.match(/[\d,.]+/);
    
    if (match) {
      const amount = match[0];
      return parseFloat(amount.replace(',', '.'));
    } else {
      throw new Error("Price not found in the text");
    }
  }  
  
  public async getContentPrice(selector: string): Promise<number> {
    await this.waitUntilElementDisplayed(selector);
    
    const elem = await this.getElement(selector);
    const contentDesc = await elem.getAttribute('content-desc');
    const numericValue = parseFloat(contentDesc.replace(/[^\d,.-]/g, '').replace(',', '.'));
    
    return numericValue;
  } 
  
  public async clickHomeBtn(): Promise<void> {
    await this.clickElement(homeBtn);
  }

  public async clickBurgerMenu(): Promise<void> {
    await this.clickElement(burgerMenu);
  }

  public async clickOrderAllDays(): Promise<void> {
    await this.clickElement(allDays);
  }

  public async clickSignOutBtn(): Promise<void> {
    await this.clickElement(signOutBtn);
  }
  
  public async clickOrdered(): Promise<void> {
    await this.clickElement(ordered);
  }

  public async clickHomePageCart(): Promise<void> {
    await this.clickElement(cartHomePage);
  }

  public async clickCart(): Promise<void> {
    await this.clickElement(cart);
  }

  public async clickCleanCart(): Promise<void> {
    await this.clickElement(cleanCart);
  }
}

export default new Entry();



   



