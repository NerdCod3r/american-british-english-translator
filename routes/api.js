'use strict';

const Translator = require('../components/translator.js');
const translatorObject = new Translator();
const validLocale = ["american-to-british", "british-to-american"];

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
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

        //------Translating from American-to-British--------
        console.log(inputText);
        res.json({
        "text": inputText,
        "translation": "N/A"
      });
      }
    });
};
