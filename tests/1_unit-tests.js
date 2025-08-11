const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const BritishTranslator = new Translator("american");
const AmericanTranslator = new Translator("british");
const noHighlightRegex = /<span class=\"highlight\">|<\/span>/g;
suite('Unit Tests', () => {
    suite("Translate to American English", ()=>{

    });
    suite("Translate to British English", ()=>{
        // 1.
        test("translate 'Mangoes are my favorite fruit.'", (done)=>{
            const input = 'Mangoes are my favorite fruit.'.split(" ");
            const output = "Mangoes are my favourite fruit.";
            const result = BritishTranslator.americanTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });

        // 2..
        test("translate 'I ate yogurt for breakfast.'", (done)=>{
            const input = 'I ate yogurt for breakfast.'.split(" ");
            const output = "I ate yoghurt for breakfast.";
            const result = BritishTranslator.americanTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });

        // 3.
        test("translate 'We had a party at my friend's condo'", (done)=>{
            const input = "We had a party at my friend's condo".split(" ");
            const output = "We had a party at my friend's flat";
            const result = BritishTranslator.americanTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });

        // 4.
        test("translate 'Can you toss this in the trashcan for me?'", (done)=>{
            const input = "Can you toss this in the trashcan for me?".split(" ");
            const output = "Can you toss this in the bin for me?";
            const result = BritishTranslator.americanTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });

        
    });
});
