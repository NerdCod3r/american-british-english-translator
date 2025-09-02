const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');


suite('Functional Tests', () => {
    // Test #1
    test("Translation with text and valid locale field", (done)=>{
            chai
            .request(server)
            .post("/api/translate")
            .send({"text":"Mangoes are my favorite fruit.", "locale":"american-to-british"})
            .end((err, res)=>{
                assert.equal(res.status, 200);
                assert.equal(res.body.translation, "Mangoes are my <span class=\"highlight\">favourite</span> fruit.");
                done();
            });
    })

    // Test #2
    test("Translation with text and invalid locale field", (done)=>{
        chai
        .request(server)
        .post("/api/translate")
        .send({"text":"Mangoes are my favorite fruit.", "locale":"american-to-bolonese"})
        .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "Invalid value for locale field");
            done();
        })
    })

    // Test #3
    test("Translation with missing text", (done)=>{
        chai
        .request(server)
        .post("/api/translate")
        .send({"locale":"american-to-british"})
        .end((end, res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "Required field(s) missing");
            done();
        })
    })
    /*
// 4.
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

// 5.
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

// 6.
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
    */
});// end of Main Suite
