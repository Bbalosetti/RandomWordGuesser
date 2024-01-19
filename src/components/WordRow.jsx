import React from "react";
import Letter from "./Letter";

function WordRow(props) {
    return (
        <div className="row wordRow">
            {props.word.split("").map((l, i) => <Letter key={i} letter={l} state={props.lettersState[i]} />)}
        </div>
    )
}

export default WordRow;

/**
            <Letter letter={props.word[0]} />
            <Letter letter={props.word[1]}/>
            <Letter letter={props.word[2]}/>
            <Letter letter={props.word[3]}/>
            <Letter letter={props.word[4]}/>
 */