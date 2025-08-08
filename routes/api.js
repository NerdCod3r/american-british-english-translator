'use strict';

const Translator = require('../components/translator.js');
const translatorObject = new Translator();
const validLocale = ["american-to-british", "british-to-american"];

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      if ( req.body.text === undefined || req.body.locale === undefined ){
        res.json({
          "error": "Required field(s) missing"
        });
      } else if ( req.body.text === '' ){
        res.json({
            "error":"No text to translate"
          });
      } else{
        const inputText = req.body.text;
        const locale = req.body.locale;

        if ( validLocale.indexOf(locale) === -1 ){
          res.json({
            "error": "Invalid value for locale field"
          });
        } else if (inputText.length !== 0 && validLocale.indexOf(locale) !== -1){

          const localeIndex = validLocale.indexOf(locale);
          let chosenLocale = null;

          switch(localeIndex){

            case 0:
              // american - to - british
              chosenLocale = validLocale[localeIndex];
              console.log("Translation: ", chosenLocale);
              break;
            
            case 1:
              // british - to - american
              chosenLocale = validLocale[localeIndex];
              console.log("Translation: ", chosenLocale);
              break;
            
            default:
              console.log({
                "error":"Locale does not exist"
              });
          }
          let translatedWordsArray = [];
          //------Translating from American-to-British--------
          if ( chosenLocale === "american-to-british" ){
              const inputsWordArray = inputText.split(" ");
              const translatingObject = new Translator("american");
              translatedWordsArray = translatingObject.americanTranslate(inputsWordArray);
          } 
          //-----Translating from British-to-American-----
          else if ( chosenLocale === "british-to-american" ) {
            const translatingObject = new Translator("british");
            translatedWordsArray = translatingObject.britishTranslate(inputText);
          }

          if ( translatedWordsArray.length !== 0 ){
            const Translation = translatedWordsArray.join(" ");
            res.json({
            "text": inputText,
            "translation": Translation
            });
        } else {
          res.json({
            "text": inputText,
            "translation": "Everything looks good to me!"
          });
        }
          
        }
      }
    });
};
