
const { Builder, By, Key } = require("selenium-webdriver");
const assert = require('assert')
const { ts } = require("./timer")

class JupiterHome {
    
    constructor(driver) {
        this.driver = driver
    }

    async gotoUrl() {
        try {
            console.log('JupiterHomel::gotoUrl  tp-1')
            await this.driver.get("https://jupiter.cloud.planittesting.com/#/home")
            console.log('JupiterHomel::gotoUrl  tp-2')
        } catch (err) {
            console.error(err)
        }
    }

    async _home() {
        try {
            return await this.driver.findElement(By.xpath("//a[@href='#/home']"))
        } catch (err) {
            console.error(err)
        }
    }

    async _shop() {
        try {
            return await this.driver.findElement(By.xpath("//a[@href='#/shop']"))
        } catch (err) {
            console.error(err)
        }
    }

    async _contact() {
        try {
            return await this.driver.findElement(By.xpath("//a[@href='#/contact']"))
        } catch (err) {
            console.error(err)
        }
    }

    async navigateToHomePage() {
        try {
           var hl = await this._home();
           await hl.click();
        } catch (err) {
            console.error(err)
        }
    }

    async navigateToShopPage() {
        try {
           await (await this._shop()).click(); 
        } catch (err) {
            console.error(err)
        }
    }

    async navigateToContactPage() {
        try {
            console.log('JupiterHomel::navigateToContactPage  tp-1')

            await (await this._contact()).click(); 

            console.log('JupiterHomel::navigateToContactPage  tp-2')


            // const fl = await driver.findElement(By.xpath("//input[@id='forename']"));
            // await fl.sendKeys('123');
        } catch (err) {
            console.error(err)
        }
    }

}


module.exports = { JupiterHome }