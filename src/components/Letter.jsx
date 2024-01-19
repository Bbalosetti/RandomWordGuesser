import React from "react";
import {letterStateMap} from "../guessChecker"

function Letter(props) {
    return (
        <div className="letter" style={{
            backgroundColor: (
                props.state === letterStateMap.get("notChecked") ? "#5C8374" : 
                    props.state === letterStateMap.get("notInWord") ? "#B70D00" :
                        props.state === letterStateMap.get("inWord") ? "#FE6E00" : "#005C01"
            )
        }}>
            {props.letter}
        </div>
    )
}

export default Letter;