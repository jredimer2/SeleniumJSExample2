const { Builder, By, Key, promise } = require("selenium-webdriver");
var assert = require('assert')
const { JupiterHome } = require("./page_objects/JupiterHome")
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

// NodeJs delay function
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const testData = [{
    forename: "John",
    surname: "Doe",
    email: "test@testproj.com",
    message: "This is a test message"
}]

async function testFillOutContactPage(i) {
    try {
        await sleep(100);  // minimum 100 msec delay

        var driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().setTimeouts({ implicit: 3000, pageLoad: 5000, script: 5000 });
        await driver.manage().window().maximize();
        const jupiterHome = new JupiterHome(driver)
        const jupiterContact = new JupiterContact(driver)

        // Test steps
        await jupiterHome.gotoUrl();
        await jupiterHome.navigateToContactPage();
        await jupiterContact.enterForename(testData[0].forename);
        await jupiterContact.enterSurname(testData[0].surname);
        await jupiterContact.enterEmail(testData[0].email);
        await jupiterContact.enterMessage(testData[0].message);
        await jupiterContact.clickSubmit();
        await jupiterContact.waitForThankYou();

        await sleep(50);  // minimum 50 msec delay
        driver.close();

    } catch (err) {
        console.log('Main error ', err)
    }
}

async function runFiveTimes() {
    for (i = 0; i < 5; i++) {
        await testFillOutContactPage(i)
    }
}

runFiveTimes();

