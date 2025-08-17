class britishToAmericanTime{
    setAmericanTime(inputTimeString){
        let convertedTime = "";
        convertedTime = inputTimeString.replace(".", ":");

        return convertedTime;
    }
}

module.exports = britishToAmericanTime;