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
            const input = 'Mangoes are my favorite fruit.';
            const output = "Mangoes are my favourite fruit.";
            const result = BritishTranslator.americanTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });

        // 11.
        test("Highlight translation in 'Mangoes are my favorite fruit.'", (done)=>{
            const input = 'Mangoes are my favorite fruit.';
            const output = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
            const result = BritishTranslator.americanTranslate(input).join(" ");

            assert.equal(result, output);
            done();
        
        });

        // 2.
        test("translate 'I ate yogurt for breakfast.'", (done)=>{
            const input = 'I ate yogurt for breakfast.';
            const output = "I ate yoghurt for breakfast.";
            const result = BritishTranslator.americanTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });

        // 12.
        test("Highlight the translation in 'I ate yogurt for breakfast.'", (done)=>{
            const input = 'I ate yogurt for breakfast.';
            const output = 'I ate <span class="highlight">yoghurt</span> for breakfast.';
            const result = BritishTranslator.americanTranslate(input).join(" ");

            assert.equal(result, output);
            done();
        
        });

        // 3.
        test("translate 'We had a party at my friend's condo'", (done)=>{
            const input = "We had a party at my friend's condo";
            const output = "We had a party at my friend's flat";
            const result = BritishTranslator.americanTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });

        // 4.
        test("translate 'Can you toss this in the trashcan for me?'", (done)=>{
            const input = "Can you toss this in the trashcan for me?";
            const output = "Can you toss this in the rubbishcan for me?";
            const result = BritishTranslator.americanTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });

        // 5.
        test("translate 'The parking lot was full.'", (done)=>{
            const input = "The parking lot was full.";
            const output = "The car park was full.";
            const result = BritishTranslator.americanTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });

         // 6.
        test("translate 'Like a high tech Rube Goldberg machine.'", (done)=>{
            const input = "Like a high tech Rube Goldberg machine";
            const output = "Like a high tech Heath Robinson device";
            const result = BritishTranslator.americanTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });

        // 7.
        test("translate 'To play hooky means to skip class or work.'", (done)=>{
            const input = "To play hooky means to skip class or work.";
            const output = "To bunk off means to skip class or work.";
            const result = BritishTranslator.americanTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });

        // 8.
        test("translate 'No Mr. Bond, I expect you to die.'", (done)=>{
            const input = "No Mr. Bond, I expect you to die.";
            const output = "No Mr Bond, I expect you to die.";
            const result = BritishTranslator.americanTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });

        // 9.
        test("translate 'Dr. Grosh will see you now.'", (done)=>{
            const input = "Dr. Grosh will see you now.";
            const output = "Dr Grosh will see you now.";
            const result = BritishTranslator.americanTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });

        // 10.
        test("translate 'Lunch is at 12:15 today.'", (done)=>{
            const input = "Lunch is at 12:15 today.";
            const output = "Lunch is at 12.15 today.";
            const result = BritishTranslator.americanTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });
});
        suite("Translate to American English", ()=>{
        // 1.
        test("translate 'We watched the footie match for a while.'", (done)=>{
            const input = "We watched the footie match for a while.";
            const output = "We watched the soccer match for a while.";
            const result = AmericanTranslator.britishTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });

        // 10.
        test("Highlight the translation in 'We watched the footie match for a while.'", (done)=>{
            const input = "We watched the footie match for a while.";
            const output = 'We watched the <span class="highlight">soccer</span> match for a while.';
            const result = AmericanTranslator.britishTranslate(input).join(" ");

            assert.equal(result, output);
            done();
        
        });
        // 2.
        test("translate 'Paracetamol takes up to an hour to work.'", (done)=>{
            const input = "Paracetamol takes up to an hour to work.";
            const output = "Tylenol takes up to an hour to work.";
            const result = AmericanTranslator.britishTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });

        // 11.
        test("Highlight the translation in 'Paracetamol takes up to an hour to work.'", (done)=>{
            const input = "Paracetamol takes up to an hour to work.";
            const output = '<span class="highlight">Tylenol</span> takes up to an hour to work.';
            const result = AmericanTranslator.britishTranslate(input).join(" ");

            assert.equal(result, output);
            done();
        
        });

        // 3.
        test("translate 'First, caramelise the onions.'", (done)=>{
            const input = "First, caramelise the onions.";
            const output = "First, caramelize the onions.";
            const result = AmericanTranslator.britishTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });

        // 4.
        test("translate 'I spent the bank holiday at the funfair.'", (done)=>{
            const input = "I spent the bank holiday at the funfair.";
            const output = "I spent the public holiday at the funfair.";
            const result = AmericanTranslator.britishTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });

        // 5.
        test("translate 'I had a bicky then went to the chippy.'", (done)=>{
            const input = "I had a bicky then went to the chippy.";
            const output = "I had a cookie then went to the chippy.";
            const result = AmericanTranslator.britishTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });
        
        // 6.
        test("translate 'I\'ve just got bitts and bobs in my bum bag.'", (done)=>{
            const input = "I've just got bitts and bobs in my bum bag";
            const output = "I've just got bitts and bobs in my fanny pack";
            const result = BritishTranslator.britishTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });

        // 7.
        test("translate 'The car boot sale at Boxted Airfield was called off.'", (done)=>{
            const input = "The car boot sale at Boxted Airfield was called off.";
            const output = "The swap meet at Boxted Airfield was called off.";
            const result = BritishTranslator.britishTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });

        // 8.
        test("translate 'Have you met Mrs Kyalani?'", (done)=>{
            const input = "Have you met Mrs Kyalani?";
            const output = "Have you met Mrs. Kyalani?";
            const result = BritishTranslator.britishTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });

        // 9.
        test("translate 'Prof Joyner of King's College, London.'", (done)=>{
            const input = "Prof Joyner of King's College, London.";
            const output = "Prof. Joyner of King's College, London.";
            const result = BritishTranslator.britishTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });

        // 10.
        test("translate 'Tea time is usually around 4 or 4.30'", (done)=>{
            const input = 'Tea time is usually around 4 or 4.30';
            const output = 'Tea time is usually around 4 or 4:30';
            const result = BritishTranslator.britishTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });
});

/*
        // Skeleton...
        test("translate ''", (done)=>{
            const input = null;
            const output = null;
            const result = BritishTranslator.americanTranslate(input).join(" ");
            const finalResult = result.replace(noHighlightRegex, "");

            assert.equal(finalResult, output);
            done();
        
        });
*/
        
});
