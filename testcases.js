const { Builder, By, Key, promise, selenium } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { JupiterHome } = require("./page_objects/JupiterHome")
const { JupiterContact } = require("./page_objects/JupiterContact")
const { JupiterShop } = require("./page_objects/JupiterShop")
const { JupiterCart } = require("./page_objects/JupiterCart")
const { Utils } = require("./page_objects/Utilities")


const contactData = [{
    forename: "John",
    surname: "Doe",
    email: "john.doe@planit_test.com",
    message: "This is a test message from John"
},
{
    forename: "Bevan",
    surname: "Davey",
    email: "bevan.devey@planit_test.com",
    message: "This is a test message from Bevan"
},
{
    forename: "Kayley",
    surname: "Cornish",
    email: "keyley.cornish@planit_test.com",
    message: "This is a test message from Kayley"
}, {
    forename: "Rhona",
    surname: "Reyes",
    email: "rhona.reyes@planit_test.com",
    message: "This is a test message from Rhona"
}, {
    forename: "Levisson",
    surname: "Robins",
    email: "levisson.robins@planit_test.com",
    message: "This is a test message from Levison"
}

]

const testFillOutContactPage = async (i) => {
    try {
        // Test setup
        const utils = new Utils();
        await utils.sleep(150);  //minimum 100 msec delay
        var options = new chrome.Options();
        options.addArguments("--log-level=3")    //hides Windows event log messages
            .excludeSwitches('enable-logging');  //hides Chrome DevTools messages
        var driver = await new Builder().forBrowser("chrome").withCapabilities(options.toCapabilities()).build();
        await driver.manage().setTimeouts({ implicit: 3000, pageLoad: 5000, script: 5000 });
        await driver.manage().window().maximize();
        const jupiterHome = new JupiterHome(driver)
        const jupiterContact = new JupiterContact(driver)
        const { forename, surname, email, message } = contactData[i]

        // Test steps
        await jupiterHome.gotoUrl();
        await jupiterHome.navigateToContactPage();
        await jupiterContact.enterForename(forename);
        await jupiterContact.enterSurname(surname);
        await jupiterContact.enterEmail(email);
        await jupiterContact.enterMessage(message);
        await jupiterContact.clickSubmit();
        await jupiterContact.validateThankYou(forename, surname);

        // Test cleanup
        await utils.sleep(100);  //minimum 50 msec delay
        driver.close();

    } catch (err) {
        console.log('Main error ', err)
    }
}

const testItemsInCart = async () => {
    try {
        // Test setup
        const utils = new Utils();
        await utils.sleep(150);  //minimum 100 msec delay
        var options = new chrome.Options();
        options.addArguments("--log-level=3")    //hides Windows event log messages
            .excludeSwitches('enable-logging');  //hides Chrome DevTools messages
        var driver = await new Builder().forBrowser("chrome").withCapabilities(options.toCapabilities()).build();
        await driver.manage().setTimeouts({ implicit: 3000, pageLoad: 5000, script: 5000 });
        await driver.manage().window().maximize();
        const jupiterHome = new JupiterHome(driver)
        const jupiterShop = new JupiterShop(driver)
        const jupiterCart = new JupiterCart(driver)

        // Test steps
        await jupiterHome.gotoUrl();
        await jupiterHome.navigateToShopPage();
        await jupiterShop.clickBuy('Funny Cow');
        await jupiterShop.clickBuy('Funny Cow');
        await jupiterShop.clickBuy('Fluffy Bunny');
        await jupiterHome.navigateToCartPage();
        await jupiterCart.verifyNumberOfItems(2);
        await jupiterCart.verifyItems([{ name: 'Funny Cow', quantity: 2 }, { name: 'Fluffy Bunny', quantity: 1 }]);

        // Test cleanup
        await utils.sleep(100);  //minimum 50 msec delay
        driver.close();

    } catch (err) {
        console.log('Main error ', err)
    }
}

const testItemSubtotalsInCart = async () => {
    try {
        // Test setup
        const utils = new Utils();
        await utils.sleep(150);  //minimum 100 msec delay
        var options = new chrome.Options();
        options.addArguments("--log-level=3")    //hides Windows event log messages
            .excludeSwitches('enable-logging');  //hides Chrome DevTools messages
        var driver = await new Builder().forBrowser("chrome").withCapabilities(options.toCapabilities()).build();
        await driver.manage().setTimeouts({ implicit: 3000, pageLoad: 5000, script: 5000 });
        await driver.manage().window().maximize();
        const jupiterHome = new JupiterHome(driver)
        const jupiterShop = new JupiterShop(driver)
        const jupiterCart = new JupiterCart(driver)

        // Test steps
        await jupiterHome.gotoUrl();
        await jupiterHome.navigateToShopPage();
        await jupiterShop.clickBuy('Stuffed Frog');
        await jupiterShop.clickBuy('Stuffed Frog');
        await jupiterShop.clickBuy('Fluffy Bunny');
        await jupiterShop.clickBuy('Fluffy Bunny');
        await jupiterShop.clickBuy('Fluffy Bunny');
        await jupiterShop.clickBuy('Fluffy Bunny');
        await jupiterShop.clickBuy('Fluffy Bunny');
        await jupiterShop.clickBuy('Valentine Bear');
        await jupiterShop.clickBuy('Valentine Bear');
        await jupiterShop.clickBuy('Valentine Bear');
        await jupiterHome.navigateToCartPage();
        await jupiterCart.verifyNumberOfItems(3);
        await jupiterCart.verifySubtotals([{ name: 'Stuffed Frog', quantity: 2 }, { name: 'Fluffy Bunny', quantity: 5 }, { name: 'Valentine Bear', quantity: 3 }]);

        // Test cleanup
        await utils.sleep(100);  //minimum 50 msec delay
        driver.close();

    } catch (err) {
        console.log('Main error ', err)
    }
}


const TestCase1 = async () => {
    console.log('---------------------- < Start: TestCase 1 > ------------------------')
    for (i = 0; i < 5; i++) {
        await testFillOutContactPage(i)
    }
    console.log('---------------------- [ End: TestCase 1 ] ------------------------')
}


const TestCase2 = async () => {
    console.log('\n---------------------- < Start: TestCase 2 > ------------------------')
    await testItemsInCart()
    console.log('---------------------- [ End: TestCase 2 ] ------------------------')
}

const TestCase3 = async () => {
    console.log('\n---------------------- < Start: TestCase 3 > ------------------------')
    await testItemSubtotalsInCart();
    console.log('---------------------- [ End: TestCase 3 ] ------------------------')
}

async function runAll() {
    await TestCase1();
    await TestCase2();
    await TestCase3();   
}

runAll();

