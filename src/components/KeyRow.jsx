import React from "react";
import Key from "./Key";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import BackspaceIcon from '@mui/icons-material/Backspace';

function KeyRow(props) {
    return (
        <div className="row">
            {props.row.map(l => {
                if (l !== "<" && l !== ">") {
                    return <Key key={l} name={l} content={l} pressed={props.onKey} state={props.keyboardState.get(l.toLowerCase())} />
                }
                else if (l === ">") {
                    return <Key key={l} name={l} content={<KeyboardReturnIcon/>} pressed={props.onKey} state={0}/>
                }
                else return <Key key={l} name={l} content={<BackspaceIcon/>} pressed={props.onKey} state={0}/>
            })}
        </div>
    )
}

export default KeyRow;