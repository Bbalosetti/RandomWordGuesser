import React from "react";
import WordRow from "./WordRow";

function WordsGrid(props) {
    return (
        <div id="wordsGrid">
            {props.words.map((w, i) => <WordRow key={i} rowId={i} word={w} lettersState={props.lettersState[i]} />)}
        </div>
    )
}

export default WordsGrid;

/*
            <WordRow word={props.words[0]} />
            <WordRow word={props.words[1]} />
            <WordRow word={props.words[2]} />
            <WordRow word={props.words[3]} />
            <WordRow word={props.words[4]} />
            <WordRow word={props.words[5]} />
*/