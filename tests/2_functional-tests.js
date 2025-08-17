const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

// Useful objects...
const BritishTranslator = new Translator("american");
const AmericanTranslator = new Translator("british");
const noHighlightRegex = /<span class=\"highlight\">|<\/span>/g;


suite('Functional Tests', () => {
    test("Translation with text and locale fields", (done)=>{
        chai
        .request(server)
        .post("/api/translate")
        .send({
            "text": "Mangoes are my favorite fruit.",
            "locale":"american-to-british"
        })
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal;(res.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.');
            done();
        })
    });

    test("Translation with text and invalid locale fields", (done)=>{
        chai
        .request(server)
        .post("/api/translate")
        .send({
            "text": "Mangoes are my favorite fruit.",
            "locale":"american-to-chinese"
        })
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal;(res.body.error, 'Invalid value for locale field');
            done();
        })
    });

    test("Translation with missing text", (done)=>{
        chai
        .request(server)
        .post("/api/translate")
        .send({
            "locale":"american-to-british"
        })
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal;(res.body.error, 'Required field(s) missing');
            done();
        })
    });

    test("Translation with missing locale field", (done)=>{
        chai
        .request(server)
        .post("/api/translate")
        .send({
            "text": "Mangoes are my favorite fruit."
        })
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal;(res.body.error, 'Required field(s) missing');
            done();
        })
    });

    test("Translation with empty text", (done)=>{
        chai
        .request(server)
        .post("/api/translate")
        .send({
            "text":"",
            "locale":"american-to-british"
        })
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal;(res.body.error, 'No text to translate');
            done();
        })
    });

    test("Transation with text that needs no translation", (done)=>{
        chai
        .request(server)
        .post("/api/translate")
        .send({
            "text": "Mr",
            "locale":"american-to-british"
        })
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal;(res.body.translation, 'Everything looks good to me!');
            done();
        })
    });
});
