const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

const AmericanToBritishTime = require("./american-time-conversion.js");
const americanToBritishTimeObject = new AmericanToBritishTime();

const britishToAmericanTime = require("./british-time-conversion.js");
const britishToAmericanTimeObject = new britishToAmericanTime();

const AmericanTitleConversion = require("./american-title-conversion.js");
const AmericanToBritishTitleObject = new AmericanTitleConversion();

class Translator {
    constructor(initialLanguage){
        if ( initialLanguage === "american" ){
            this.inputLanguage = "American";
        } else if ( initialLanguage === "british" ){
            this.inputLanguage = "British";
        }
    }
    /*
    isAmericanTime method returns true if a word is an American Time format
    returns false if it is not.
    */
    isAmericanTime(word){
        const americanRegex = /^\d{1,2}:\d{1,2}$/;
        if ( americanRegex.test(word) ) {
            return true;
        }
        return false;
    }

    /*
    isAmericanHonorific method returns true if a word is an American Honorific
    returns false if it is not
    */
   isAmericanHonorific(word){
    if ( americanToBritishTitles.hasOwnProperty(word.toLowerCase()) ){
        return true;
    }
    return false;
   }

    /**
     * americanTranslate method translates American English spelling into
     * British English spelling.
     * @param {Array} inputArray 
     */
    americanTranslate(inputArray){
        let translatedTexts = []
        for ( let index = 0; index < inputArray.length; index++ ){
            const currWord = inputArray[index];
            let translatedText = "";
            if ( this.isAmericanTime(currWord) ){

            translatedText = americanToBritishTimeObject.setBritishTime(currWord);
            // console.log("British time result: ", translatedText);
            const wrappedTranslatedTime = `<span class="highlight">${translatedText}</span>`;
            translatedTexts.push(wrappedTranslatedTime);

            } else if ( this.isAmericanHonorific(currWord) ) {
            const translatedTitle = AmericanToBritishTitleObject.convert(currWord);
            let finalString = "";
            for ( let char = 0; char < currWord.length - 1; char++ ) {
                if ( currWord[char] !== translatedTitle[char]){
                    console.log(":",translatedTitle[char]);
                    finalString += translatedTitle[char].toUpperCase();
                } else {
                    finalString += translatedTitle[char];
                }
            }

            // console.log("British title result: ", finalString);
            const wrappedTranslatedTitle = `<span class="highlight">${finalString}</span>`;
            translatedTexts.push(wrappedTranslatedTitle);

            } else {
                const key = currWord.toLowerCase();
                const translatedBritishWord = americanToBritishSpelling[key];
                if ( !translatedBritishWord ){
                    // console.log("No translation for: ", currWord);
                    translatedTexts.push(currWord);
                } else {
                    const wrappedTranslation = `<span class="highlight">${translatedBritishWord}</span>`;
                    translatedTexts.push(wrappedTranslation);
                }
            }
        }
        return translatedTexts;
    }
    /**
     * Translates a sentence from British English spelling to
     * American English spelling.
     * @param {Array} inputCommunicationArray 
     */
    britishTranslate(inputCommunicationArray){
        let translatedTexts = [];
        for ( let britishIndex = 0; britishIndex < inputCommunicationArray.length; britishIndex++ ) {
            const currWord = inputCommunicationArray[britishIndex];
            if ( this.isBritishTime(currWord) ){
                console.log(currWord, " is British time.");
            } else if ( this.isBritishTitle(currWord) ){
                console.log(currWord, " is a British title.");
            } else {
                console.log(currWord, " is a regular British word.");
            }
        }
    }

    /**
     * isBritishTime function returns true if the format
     * of the input time string is from the British english language
     * Returns false if not.
     */
    isBritishTime(time){
        const britishTimeRegex = /^\d{1,2}.\d{1,2}$/;
        if ( britishTimeRegex.test(time) ){
            return true;
        }
        return false;
    }

    /**
     * isBritishTitle function returns true if the format 
     * of the input title is from the British English language
     * Returns false if not.
     */
    isBritishTitle(title){
        const Title = title + ".";

        if ( americanToBritishTitles.hasOwnProperty(Title.toLowerCase()) ){
            return true;
        }
        return false;
    }

}

module.exports = Translator;