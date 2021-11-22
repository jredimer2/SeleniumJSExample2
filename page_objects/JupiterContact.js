const { Builder, By, Key } = require("selenium-webdriver");
const { Assertions } = require("./Utilities")

class JupiterContact {
    constructor(driver) {
        this.driver = driver
    }

    async _forename() {
        try {
            return await this.driver.findElement(By.id("forename"))
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

    async validateThankYou(forename, surname) {
        try {
            const assert = new Assertions();
            this.driver.manage().setTimeouts({ implicit: 20000 });
            await this._thankYou();
            console.log(`Testing ${forename} ${surname} - ` + await assert.verify({expected: true, actual: true}, '\'Thank You\' message appears -'));
        } catch (err) {
            console.log(`Testing ${forename} ${surname} - ` + await assert.verify({expected: true, actual: false}, '\'Thank You\' message appears -'));
        } finally {
            this.driver.manage().setTimeouts({ implicit: 3000 });
        }
    }

}


module.exports = { JupiterContact }