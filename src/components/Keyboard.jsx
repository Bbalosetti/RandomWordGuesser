import React from "react";
import KeyRow from "./KeyRow";

const keyRowUp = "AZERTYUIOP".split("");
const keyRowMid = "QSDFGHJKLM".split("");
const keyRowDown = "<WXCVBN>".split("");

function Keyboard(props) {
    return (
        <div id="keyboard">
            <KeyRow row={keyRowUp} onKey={props.onKey} keyboardState={props.keyboardState} />
            <KeyRow row={keyRowMid} onKey={props.onKey} keyboardState={props.keyboardState}/>
            <KeyRow row={keyRowDown} onKey={props.onKey} keyboardState={props.keyboardState}/>
        </div>
    )
}

export default Keyboard;