class helpers {

    constructor(){}

    toFunctionName(phrase) {
        //change the phrase to camel case
        let functionName = phrase
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')

        //change the first letter of the first word to lowercase and join the whole string together to remove spaces
        functionName = functionName[0].charAt(0).toLowerCase() + functionName.slice(1).split(" ").join("")

        return functionName;
    };
}