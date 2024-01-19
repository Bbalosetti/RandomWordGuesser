import React from "react";
import Letter from "./Letter";
import { letterStateMap } from "../guessChecker";

// TODO: make help page

function HelpContent() {
    return (
        <div className="help">
            <p>You have as many attemps as you want to guess the hidden 5-letters word.<br />
                On each attempt, letters of the word you entered will have a color reflecting how close you are to finding the hidden word.<br />
                ----------<br />
            </p>
            <div className="centerDiv">
                <div className="helpGrid">
                    <div className="letterHelp">
                        <Letter letter="A" state={letterStateMap.get("notInWord")}/>
                    </div>
                    <p>This letter is not contained in hidden word.</p>
                    <div className="letterHelp">
                        <Letter letter="A" state={letterStateMap.get("inWord")}/>
                    </div>
                    <p>This letter is contained in hidden word but is not in the correct place.</p>
                    <div className="letterHelp">
                        <Letter letter="A" state={letterStateMap.get("correct")}/>
                    </div>
                    <p>This letter is contained in the hidden word and is in this place.</p>
                </div>
            </div>
            
            <hr/>
        </div>
    )
}

export default HelpContent;