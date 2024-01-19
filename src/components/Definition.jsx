import React from "react";
import DefMeaningsDisplay from "./DefMeaningsDisplay"

function Definition(props) {
    return (
        <div id="defArea">
            <h2><b>{props.def.word.toUpperCase()}</b> {props.def.phonetic && <em>{props.def.phonetic}</em>}</h2>
            {props.def.origin && <p id="originP">Origin: {props.def.origin}</p>}
            
            {props.def.meanings && <div id="defs">{props.def.meanings.map((meaning, index) => <DefMeaningsDisplay key={index} meaning={meaning} index={index}/>)}</div>}
        </div>
    );
}

export default Definition;