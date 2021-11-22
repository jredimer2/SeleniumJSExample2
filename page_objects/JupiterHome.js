
const { Builder, By, Key } = require("selenium-webdriver");

class JupiterHome {
    
    constructor(driver) {
        this.driver = driver
    }

    async gotoUrl() {
        try {
            await this.driver.get("https://jupiter.cloud.planittesting.com/#/home")
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

    async _cart() {
        try {
            return await this.driver.findElement(By.xpath("//a[@href='#/cart']"))
        } catch (err) {
            console.error(err)
        }
    }

    async navigateToHomePage() {
        try {
           await (await this._home()).click();
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
            await (await this._contact()).click(); 
        } catch (err) {
            console.error(err)
        }
    }

    async navigateToCartPage() {
        try {
            await (await this._cart()).click(); 
        } catch (err) {
            console.error(err)
        }
    }

}


module.exports = { JupiterHome }