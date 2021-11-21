
const { Builder, By, Key } = require("selenium-webdriver");
const assert = require('assert')
const { ts } = require("./timer")

class JupiterContact {
    constructor(driver) {
        this.driver = driver
    }

    async _forename() {
        try {
            return await this.driver.findElement(By.id("forename"))
            //return await driver.findElement(By.xpath("//input[@id='forename']"))
        } catch (err) {
            console.error(err)
        }
    }

    async _surname() {
        try {
            return await this.driver.findElement(By.id("surname"))
        } catch (err) {
            console.error(err)
        }
    }

    async _email() {
        try {
            return await this.driver.findElement(By.id("email"))
        } catch (err) {
            console.error(err)
        }
    }

    async _message() {
        try {
            return await this.driver.findElement(By.id("message"))
        } catch (err) {
            console.error(err)
        }
    }

    async _submit() {
        try {
            return await this.driver.findElement(By.xpath("//a[text() = 'Submit']"))
        } catch (err) {
            console.error(err)
        }
    }

    async _thankYou() {
        try {
            return await this.driver.findElement(By.xpath("//div[contains(@class, 'alert-success')]"))
        } catch (err) {
            console.error(err)
        }
    }


    async enterForename(name) {
        try {
            await (await this._forename()).sendKeys(name);
        } catch (err) {
            console.error(err)
        }
    }

    async enterSurname(name) {
        try {
            await (await this._surname()).sendKeys(name);
        } catch (err) {
            console.error(err)
        }
    }

    async enterEmail(name) {
        try {
            await (await this._email()).sendKeys(name);
        } catch (err) {
            console.error(err)
        }
    }

    async enterMessage(message) {
        try {
            await (await this._message()).sendKeys(message);
        } catch (err) {
            console.error(err)
        }
    }

    async clickSubmit(message) {
        try {
            await (await this._submit()).click();
        } catch (err) {
            console.error(err)
        }
    }

    async waitForThankYou() {
        try {
            this.driver.manage().setTimeouts({ implicit: 20000 });
            await this._thankYou();
        } catch (err) {
            console.error(err)
        } finally {
            this.driver.manage().setTimeouts({ implicit: 3000 });
        }
    }

}


module.exports = { JupiterContact }