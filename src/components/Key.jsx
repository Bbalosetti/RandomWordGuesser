import React from "react";
import {letterStateMap} from "../guessChecker"

function Key(props) {
    function getKeyEvent(name) {
        let keyCode = 0;
        let key = name;
        if (name === ">") key = 'Enter';
        else if (name === "<") key = 'Backspace';
        else keyCode = name.charCodeAt(0);

        return {key: key, keyCode: keyCode};
    }

    return (
        <button className="btn input" onClick={(e) => {
            props.pressed(getKeyEvent(props.name));
            e.currentTarget.blur();
        }}

        style={{
            backgroundColor: (
                props.state === letterStateMap.get("notChecked") ? "#5C8374" : 
                    props.state === letterStateMap.get("notInWord") ? "#B70D00" :
                        props.state === letterStateMap.get("inWord") ? "#FE6E00" : "#005C01"
            )}}>
            {props.content}
        </button>
    )
}

export default Key;