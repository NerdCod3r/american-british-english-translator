const titles = require("./american-to-british-titles.js");

class AmericanTitleConversion {
    /** 
     * This class is used to convert an American-english-spelled
     * title into a British-English-spelled title.
    */

    convert(title){
        const key = title.toLowerCase();
        return titles[key];
    }
}
module.exports = AmericanTitleConversion;