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
    /**
     * getAmericanFromBritishSwaps method reverses the key/values
     * of the methods.
     */
    getAmericanFromBritishSwaps(){
        let dictObject = {};
        Object.keys(americanToBritishSpelling).map(key=>{
            dictObject[americanToBritishSpelling[key]] = key;
        });
        return dictObject;
    }

    /**
     * americanTranslate method translates American English spelling into
     * British English spelling.
     * @param {String} input 
     */
    americanTranslate(input){
        let translation = input;
        // convert words
        const wordLookup = {
            ...americanOnly,
            ...americanToBritishSpelling
        };

        const wordRegex = new RegExp(Object.keys(wordLookup).join("|"), 'gi');
        const matchingWords = translation.match(wordRegex);
        if ( matchingWords ){
            for ( let word = 0; word < matchingWords.length; word++ ){
            const  matchingword = matchingWords[word];
            translation = translation.replace(matchingword, `<span class="highlight">${wordLookup[matchingword.toLowerCase()]}</span>`);
            }
        }

        // convert titles
        let temp = input.split(" ");
        for ( let search = 0; search < temp.length;search++ ){
            let curr_word = temp[search];
            const Title = curr_word ;

            if ( americanToBritishTitles.hasOwnProperty(Title.toLowerCase()) ) {
                let translatedTitle = americanToBritishTitles[Title.toLowerCase()];
                let updatedCasedTitle = "";
                for ( let ind = 0; ind < translatedTitle.length; ind++ ){
                    if ( Title[ind] !== translatedTitle[ind] ){
                        updatedCasedTitle += translatedTitle[ind].toUpperCase();
                    } else {
                        updatedCasedTitle += translatedTitle[ind];
                    }
                }
                translation = translation.replace(curr_word, `<span class="highlight">${updatedCasedTitle}</span>`);
            }
        }

        // convert time
        const timeRegex = /\d{1,2}:\d{1,2}/g;
        const matchingTime = translation.match(timeRegex);
        if ( matchingTime ){
            for ( let m = 0; m < matchingTime.length; m++ ){
                const prev = matchingTime[m];
                let NewTime = prev.replace(":", ".");
                translation = translation.replace(prev, `<span class="highlight">${NewTime}</span>`);
            }
        }

        return translation.split(" ");
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
            ...britishOnly,
            ...this.getAmericanFromBritishSwaps()
        }
        Object.keys(wordLookup).map(word =>{
            const regex = new RegExp(word, "gi");
            const matchingWords = translation.match(regex);
            if ( matchingWords ) {
                let complete = false;
                while ( !complete ) {
                    const startIndex = translation.toLowerCase().indexOf(word);
                    if ( startIndex === -1 ){
                        complete = true;
                    } else {
                        const stopIndex = startIndex + word.length;
                        if ( (translation[stopIndex] && translation[stopIndex] === " ") || (translation[stopIndex] === undefined) ){
                            translation = translation.replace(regex, `<span class="highlight">${wordLookup[word]}</span>`);
                        } else {
                            complete = true;
                        }
                }
                    }
            } 
        });

        //After here, word conversions are proper
        // convert titles
        let temp = input.split(" ");
        for ( let search = 0; search < temp.length;search++ ){
            let curr_word = temp[search];
            const Title = curr_word + ".";

            if ( americanToBritishTitles.hasOwnProperty(Title.toLowerCase()) ) {
                let translatedTitle = americanToBritishTitles[Title.toLowerCase()];
                let updatedCasedTitle = "";
                for ( let ind = 0; ind < translatedTitle.length; ind++ ){
                    if ( Title[ind] !== translatedTitle[ind] ){
                        updatedCasedTitle += translatedTitle[ind].toUpperCase();
                    } else {
                        updatedCasedTitle += translatedTitle[ind];
                    }
                }
                updatedCasedTitle += ".";
                translation = translation.replace(curr_word, `<span class="highlight">${updatedCasedTitle}</span>`);
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