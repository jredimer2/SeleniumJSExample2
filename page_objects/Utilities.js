var assert = require('assert')

// Wrapper class for Javscript assert module
class Assertions {
    constructor() {
    }

    async verify(result, message) {
        const { expected, actual } = result;
        try {            
            assert(expected === actual)
            return `Verify ${message} expected [${expected}], actual [${actual}] - PASS`;
        } catch (err) {
            return `Verify ${message} expected [${expected}], actual [${actual}] - FAIL`;
        }
    }

}

class Utils {
    constructor() {
    }
    // NodeJs delay function
    sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
}

module.exports = { Assertions, Utils }