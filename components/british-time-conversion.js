class BritishToAmericanTime{
    setAmericanTime(inputTimeString){
        let convertedTime = "";
        convertedTime = inputTimeString.replace(".", ":");

        return convertedTime;
    }
}

module.exports = BritishToAmericanTime;