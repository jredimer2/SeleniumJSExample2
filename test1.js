const { Builder, By, Key, promise } = require("selenium-webdriver");
var assert = require('assert')

const { ebayHome } = require("./page_objects/ebayHome")
const { ebayProductDetails } = require("./page_objects/ebayProductDetails")
const { ebayCart } = require("./page_objects/ebayCart")

const { JupiterHome } = require("./page_objects/JupiterHome")
const { JupiterShop } = require("./page_objects/JupiterShop")
const { JupiterCart } = require("./page_objects/JupiterCart")
const { JupiterContact } = require("./page_objects/JupiterContact")
const { ts } = require("./page_objects/timer")


function assertIsSame(text1, text2) {
    try {
        assert(text1 === text2)
        console.log(`Verify [${text1}] == [${text2}] - PASS`)
    } catch (err) {
        console.log(`Verify [${text1}] == [${text2}] - FAIL`)

    }
}

const testData = {
    forename: "John",
    surname: "Doe",
    email: "test@testproj.com",
    message: "This is a test message"
}

// NodeJs delay function
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function testCase1(i) {
    try {
        await sleep(100);  // slight delay before starting tests

        var driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().setTimeouts({ implicit: 3000, pageLoad: 5000, script: 5000 });  // set to 20 seconds
        await driver.manage().window().maximize();
        const jupiterHome = new JupiterHome(driver)
        const jupiterContact = new JupiterContact(driver)

        await jupiterHome.gotoUrl();
        await jupiterHome.navigateToContactPage();
        await jupiterContact.enterForename(testData.forename);
        await jupiterContact.enterSurname(testData.surname);
        await jupiterContact.enterEmail(testData.email);
        await jupiterContact.enterMessage(testData.message);
        await jupiterContact.clickSubmit();
        await jupiterContact.waitForThankYou();

        await sleep(100);  // slight delay before calling driver.quit()
        driver.quit();

    } catch (err) {
        console.log('Main error ', err)
    }

}

async function runFiveTimes() {
    for (i = 0; i < 5; i++) {
        await testCase1(i)
    }
}

runFiveTimes();


