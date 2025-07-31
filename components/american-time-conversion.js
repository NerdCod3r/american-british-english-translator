class AmericanToBritishTime {
    setBritishTime(timeString){
        let newTranslatedTime = "";
        newTranslatedTime = timeString.replace(":", ".");
        return newTranslatedTime;
    }
}

module.exports = AmericanToBritishTime;