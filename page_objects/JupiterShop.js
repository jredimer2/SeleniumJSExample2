const { Builder, By, Key } = require("selenium-webdriver");
const { Utils } = require("./Utilities")


class JupiterShop {
    constructor(driver) {
        this.driver = driver
    }

    async _itemBuyButton(name) {
        try {
            return await this.driver.findElement(By.xpath(`//h4[contains(@class,'product-title') and text() = '${name}']/../p/a[text() = 'Buy']`));
        } catch (err) {
            console.error(err);
        }
    }

    async clickBuy(name) {
        try {
            var utils = new Utils();
            await utils.sleep(50);
            await (await (this._itemBuyButton(name))).click();
        } catch (err) {
            console.error(err);
        }
    }


}


module.exports = { JupiterShop }