const letterStateMap = new Map([["notChecked", 0], ["notInWord", 1], ["inWord", 2], ["correct", 3]]);

function checkGuess(guessedWordParam, correctWordParam, keyboardStateMap) {
    let resultTable = [];
    let guessedWord = guessedWordParam.split("");
    let correctWord = correctWordParam.split("");

    let remainingLettersInWord = [...correctWord];
    for (var i = 0; i < guessedWord.length; i++)
    {
        if (guessedWord[i] === correctWord[i])
        {
            resultTable.push(letterStateMap.get("correct"));
            keyboardStateMap.set(guessedWord[i], letterStateMap.get("correct"));
            remainingLettersInWord[i] = ' ';
        }
        else
        {
            resultTable.push(letterStateMap.get("notInWord"));
            if (keyboardStateMap.get(guessedWord[i]) === letterStateMap.get("notChecked")) {
                keyboardStateMap.set(guessedWord[i], letterStateMap.get("notInWord"));
            }
        }
    }

    for (var j = 0; j < guessedWord.length; j++)
    {
        if (remainingLettersInWord.includes(guessedWord[j]) && guessedWord[j] !== correctWord[j])
        {
            resultTable[j] = letterStateMap.get("inWord");
            if (keyboardStateMap.get(guessedWord[j]) !== letterStateMap.get("correct")) {
                keyboardStateMap.set(guessedWord[j], letterStateMap.get("inWord"));
            }
            let index = remainingLettersInWord.indexOf(guessedWord[j]);
            remainingLettersInWord[index] = ' ';
        }
    }

    return { wordResult: resultTable, keyboardState: keyboardStateMap };
}

export default checkGuess;
export { letterStateMap };