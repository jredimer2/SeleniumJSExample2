
const { Builder, By, Key } = require("selenium-webdriver");
const { Assertions, Utils } = require("./Utilities")

let utils = new Utils();

class JupiterCart {
    constructor(driver) {
        this.driver = driver
    }

    async _cartItems() {
        try {
            return await this.driver.findElements(By.xpath("//table[contains(@class, 'cart-items')]/tbody/tr"))
        } catch (err) {
            console.error(err)
        }
    }

    async _itemPrice(cartItem) {  // base 0
        try {
            //search relative to current object
            return await (await cartItem.findElement(By.xpath(`.//../td[2]`)).getText());
        } catch (err) {
            console.error(err)
        }
    }

    async _itemSubtotal(cartItem) {  // base 0
        try {
            //search relative to current object
            return await (await cartItem.findElement(By.xpath(`.//../td[4]`)).getText());
        } catch (err) {
            console.error(err)
        }
    }

    async verifyNumberOfItems(expected) {
        try {
            const assert = new Assertions();
            let actual = (await this._cartItems()).length;
            console.log(await assert.verify({ expected, actual }, 'number of cart items -'));
        } catch (err) {
            console.error(err);
        }
    }

    async verifyItems(details) {
        const assert = new Assertions();
        var items = await this._cartItems();
        for (let i = 0; i < items.length; i++) {
            let { name, quantity } = details[i];
            try {
                await items[i].findElement(By.xpath(`.//td[contains(text(), '${name}')]/../td/input[@value = ${quantity}]`))
                console.log(await assert.verify({ expected: true, actual: true }, `${name}, quantity: ${quantity}  exists -`));
            } catch (err) {
                console.log(await assert.verify({ expected: true, actual: false }, `${name}, quantity: ${quantity}  exists -`));
            }
        }
    }

    async verifySubtotals(details) {
        try {
            const assert = new Assertions();
            var items = await this._cartItems();
            for (let i = 0; i < items.length; i++) {
                let { name, quantity } = details[i];
                let price = await this._itemPrice(await items[i].findElement(By.xpath(`.//td[contains(text(), '${name}')]`))); //search relative to current object
                let expected = '$' + (parseFloat(price.substring(1)) * quantity);
                let actual = await this._itemSubtotal(await items[i].findElement(By.xpath(`.//td[contains(text(), '${name}')]`))); //search relative to current object
                console.log(await assert.verify({ expected, actual }, `${name} Subtotal - `));
            }
        } catch (err) {
            console.error(err)
        }
    }
}


module.exports = { JupiterCart }