'use strict';

const Translator = require('../components/translator.js');
const translatorObject = new Translator();
const validLocale = ["american-to-british", "british-to-american"];

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      if (!req.body.text || !req.body.locale ){
        res.json({
          "error": "Required field(s) missing"
        });
      } else{
        const inputText = req.body.text;
        const locale = req.body.locale;

        if ( validLocale.indexOf(locale) === -1 ){
          console.log({
            "error":"Invalid value for locale field"
          });
          res.json({
            "error": "Invalid value for locale field"
          });
        } else if ( inputText.length === 0 ) {
          console.log({
            "error":'No text to translate'
          })
          res.json({
            "error":"No text to translate"
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

          const inputsWordArray = inputText.split(" ");
          let translatedWordsArray = [];

          //------Translating from American-to-British--------
          if ( chosenLocale === "american-to-british" ){
              const translatingObject = new Translator("american");
              translatedWordsArray = translatingObject.americanTranslate(inputsWordArray);
          } else if ( chosenLocale === "british-to-american" ) {
            const translatingObject = new Translator("british");
            translatingObject.britishTranslate(inputsWordArray);
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
