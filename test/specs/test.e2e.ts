import { expect, browser } from '@wdio/globals';
import entry from '../pageobjects/entry.page.js';
import ordered from '../data/ordered.json' assert { type: 'json' };

const orderedDaysOrdered = "//android.view.View//android.widget.TextView[starts-with(@text, 'Zamawianych dni: ')]";
const orderPriceOrdered = "//android.widget.TextView[starts-with(@text, 'Razem: ')]";

const orderPriceWantToOrder = "//android.widget.TextView[starts-with(@text, 'Razem: ')]";

const priceInCart = "//android.view.View[ends-with(@content-desc, ' PLN')]";
const priceInCartPage = "//android.widget.TextView[starts-with(@text, 'Koszyk: ')]";
const priceInCartHomePage = "//android.view.View[ends-with(@content-desc, ' PLN)')]";

const setMeal = "//android.widget.TextView[@text='ZESTAW']";

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

describe("'Marciniak Opole' application test", () => {
  it("should sign up with valid credentials", async () => {
    expect(await entry.isLogoDisplayed());
    expect(await entry.isEntryTitleDisplayed());
    expect(await entry.isSignUpButtonDisplayed());

    // await entry.clickEmailInput();
    await entry.typeEmailInput(email);
    await entry.typePasswordInput(password);
    // await entry.clickGoogleSignInButton();
    await entry.clickSignInButton();

    expect(await entry.isAccountHolderAvatarDisplayed());
    expect(await entry.isAccountHolderNameDisplayed());
  });

  xit("should check the amount of ordered days and the price", async () => {
    const orderDays = ordered.days;
    const orderPrice = ordered.price;

    await entry.clickOrdered();

    await entry.scrollDownByPercentage(0.5, 3);

    expect(await entry.isOrderSectionNameDisplayed(setMeal));

    expect(await entry.getOrderedDays(orderedDaysOrdered)).toEqual(orderDays);
    expect(await entry.getOrderPrice(orderPriceOrdered)).toEqual(orderPrice);  
  });

  xit("should go to home page", async () => {
    await entry.scrollUpByPercentage(0.5, 3);

    await entry.clickHomeBtn();

    expect(await entry.isOrderedDisplayed());
  });

  xit("should add all available products to the cart", async () => {
    await entry.clickWantToOrder();

    await entry.clickOrderAllDays();
    
    await browser.pause(10000);

    await entry.scrollDownByPercentage(0.35);

    expect(await entry.getOrderPrice(orderPriceWantToOrder)).toEqual(await entry.getContentPrice(priceInCart)); 
  });

  xit("should go to home page", async () => {
    await entry.scrollUpByPercentage(0.25);

    await entry.clickHomeBtn();

    expect(await entry.isOrderedDisplayed());
  });

  xit("should clean up the cart", async () => {
    await entry.clickCart();

    await entry.scrollDownByPercentage(0.65);
    await entry.scrollByCustomFingerPosition(1, 2, 0.3, 0.6, 1);

    await browser.pause(5000);

    await entry.clickCleanCart();
    
    await browser.pause(10000);

    await browser.reloadSession();

    expect(await entry.getContentPrice(priceInCartHomePage)).toEqual(0);

    await browser.pause(10000);
  });

  xit("should go to cart", async () => {
    await entry.clickHomePageCart();

    expect(await entry.getOrderPrice(priceInCart)).toEqual(entry.getOrderPrice(priceInCartPage)); 
  });

  xit("should sign out", async () => {
    await entry.clickBurgerMenu();

    await entry.clickSignOutBtn();

    expect(await entry.isLogoDisplayed());
    expect(await entry.isEntryTitleDisplayed());
    expect(await entry.isSignUpButtonDisplayed());
  });
});


