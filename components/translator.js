const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

const AmericanToBritishTime = require("./american-time-conversion.js");
const americanToBritishTimeObject = new AmericanToBritishTime();

const BritishToAmericanTime = require("./british-time-conversion.js");
const britishToAmericanTimeObject = new BritishToAmericanTime();

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
        const americanSpellings = {
            ...americanOnly,
            ...americanToBritishSpelling
        };
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
                const translatedBritishWord = americanSpellings[key];
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
    britishTranslate(input){
        let translation = input;
        // convert words
        const wordLookup = {
            ...britishOnly
        };

        const wordRegex = new RegExp(Object.keys(wordLookup).join("|"), 'gi');
        const matchingWords = translation.match(wordRegex);
        if ( matchingWords ){
            for ( let word = 0; word < matchingWords.length; word++ ){
            const  matchingword = matchingWords[word];
            translation = translation.replace(matchingword, `<span class="highlight">${wordLookup[matchingword]}</span>`);
            }
        }

        // convert titles
        let temp = input.split(" ");
        for ( let search = 0; search < temp.length;search++ ){
            let curr_word = temp[search];
            const Title = curr_word + ".";

            if ( americanToBritishTitles.hasOwnProperty(Title.toLowerCase()) ) {
                translation = translation.replace(curr_word, `<span class="highlight">${Title}</span>`);
            }
        }


        // convert time
        const timeRegex = /\d{1,2}.\d{1,2}/g;
        const matchingTime = translation.match(timeRegex);
        if ( matchingTime ){
            for ( let m = 0; m < matchingTime.length; m++ ){
                const prev = matchingTime[m];
                let NewTime = prev.replace(".", ":");
                translation = translation.replace(prev, `<span class="highlight">${NewTime}</span>`);
            }
        }

        return translation.split(" ");
    }


}

module.exports = Translator;