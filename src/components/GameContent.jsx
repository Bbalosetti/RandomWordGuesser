import React, {useState, useEffect, useCallback} from "react";
import Keyboard from "./Keyboard";
import WordsGrid from "./WordsGrid";
import checkGuess, { letterStateMap } from "../guessChecker";
import defaultKeyboardStateMap from "../defaultKeyboardState";
import getRandomWord from "../randomWordGenerator";
import checkWord, {getDefinition} from "../wordChecker";
import { Tooltip as ReactTooltip } from "react-tooltip";

const firstAnswer = await getRandomWord();
const firstDef = await getDefinition(firstAnswer);

function GameContent() {
    const [answer, setAnswer] = useState(firstAnswer);
    const [words, setWords] = useState([""]);
    const [letterStates, setLetterStates] = useState([Array(5).fill(letterStateMap.get("notChecked"))]);
    const [keyboardState, setKeyboardState] = useState(defaultKeyboardStateMap);
    const [currentWord, setCurrentWord] = useState("");
    const [isFound, setIsFound] = useState(false);
    const [message, setMessage] = useState("");
    const [answerDef, setAnswerDef] = useState(firstDef);
    const [showToolTip, setShowToolTip] = useState(false);

    const enterKeyCallback = useCallback((e) => {
        async function keyEntered(key) {
            if (!isFound) {
                if (key === ">") {
                    if (currentWord.length === 5) {
                        if (currentWord.toLowerCase() === answer.toLowerCase()) {
                            letterChecker();
                            setShowToolTip(true);
                            setIsFound(true);
                            setMessage("Congrats! you found the word " + answer + " in " + words.length + " attempt" + (words.length > 1 ? "s" : "") + "!!");
                        }
                        else if(await checkWord(currentWord)) {
                            letterChecker();
                            setCurrentWord("");
                            setWords(previous => {
                                return [...previous, ""];
                            });
                        }
                        else {
                            setMessage(currentWord + ": word not found");
                            setTimeout(() => setMessage(""), 3000);
                            //updateWords(""); // Resetting word after failed attempt may not be ideal functionality
                        }
    
                        document.getElementById("bottomDiv").scrollIntoView({behavior: 'smooth'})
                    }
                }
                else if (key === "<") {
                    if (currentWord.length > 0) {
                        const word = currentWord.slice(0, -1);
                        updateWords(word);
                    }
                }
                else if (key && keyboardState.has(key.toLowerCase())) {
                    if (currentWord.length < 5) {
                        const word = currentWord + key;
                        updateWords(word);
                    }
                }
            }
        }

        function letterChecker() {
            let keyboardStateCopy = new Map(keyboardState);
            let checkResult = checkGuess(currentWord.toLowerCase(), answer.toLowerCase(), keyboardStateCopy);
            let letterStateCopy = [...letterStates];
            letterStateCopy[letterStateCopy.length - 1] = checkResult.wordResult;
            setLetterStates([...letterStateCopy, Array(5).fill(letterStateMap.get("notChecked"))]);
            setKeyboardState(checkResult.keyboardState);
        }
    
        function updateWords(word) {
            let wordsCopy = [...words];
            let index = wordsCopy.length === 0 ? 0 : wordsCopy.length - 1;
            wordsCopy[index] = word;
            setCurrentWord(word);
            setWords(wordsCopy);
        }

        if (e.keyCode >= 65 && e.keyCode <= 90)
            keyEntered(String.fromCharCode(e.keyCode));
        else if (e.key === 'Enter')
            keyEntered(">");
        else if (e.key === 'Backspace')
            keyEntered("<");
    }, [isFound, currentWord, answer, keyboardState, words, letterStates]);

    useEffect(() => {
        function handleKeyDown(e) {
            if ((e.keyCode >= 65 && e.keyCode <= 90) || e.key === 'Enter' || e.key === 'Backspace') {
                enterKeyCallback(e);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        // Don't forget to clean up
        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [enterKeyCallback]);

    async function newAnswer(e) {
        e.currentTarget.blur();
        setShowToolTip(false);
        setIsFound(false);
        setMessage("");
        setWords([""]);
        setLetterStates([Array(5).fill(letterStateMap.get("notChecked"))]);
        setKeyboardState(defaultKeyboardStateMap);
        setCurrentWord("");
        const newWord = await getRandomWord();
        console.log(newWord);
        if (newWord) {
            setAnswer(newWord);
            const def = await getDefinition(newWord);
            setAnswerDef(def);
        }
    }

    function giveUp(e) {
        e.currentTarget.blur();
        // replace current attempt with answer
        let word = answer.toUpperCase();
        let wordsCopy = [...words];
        let index = wordsCopy.length === 0 ? 0 : wordsCopy.length - 1;
        wordsCopy[index] = word;
        setCurrentWord(word);
        setWords(wordsCopy);

        // set letter states
        let keyboardStateCopy = new Map(keyboardState);
        let checkResult = checkGuess(word.toLowerCase(), answer.toLowerCase(), keyboardStateCopy);
        let letterStateCopy = [...letterStates];
        letterStateCopy[letterStateCopy.length - 1] = checkResult.wordResult;
        setLetterStates([...letterStateCopy, Array(5).fill(letterStateMap.get("notChecked"))]);
        setKeyboardState(checkResult.keyboardState);

        // display message to user
        setShowToolTip(true);
        setIsFound(true);
        setMessage("You'll do better next time ! The word was " + answer + ".");
    }

    return (
        <div>
            <WordsGrid words={words} lettersState={letterStates} />
            <div className="centerDiv">
                <p className="message" data-tooltip-id="def-tooltip">{message} {isFound && <em><br/>Pass your cursor on this message to see word definition.</em>}</p>
            </div>
            {
                isFound ?
                <button className="btn" onClick={newAnswer} style={{margin:"1rem"}}>Play again</button> :
                <button className="btn" onClick={giveUp} style={{margin:"1rem"}}>Give up</button>
            }
            <Keyboard onKey={enterKeyCallback} keyboardState={keyboardState} />
            <div id="bottomDiv"></div>
            <ReactTooltip
                id="def-tooltip"
                place="bottom"
                content={showToolTip ? answerDef : ""}
            />
        </div>
    )
}

export default GameContent;