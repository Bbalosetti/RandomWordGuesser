import React from "react";
import DefinitionDisplay from "./DefinitionDisplay";

function DefMeaningsDisplay(props) {
    return (
        <div className="meaning">
            {props.index > 0 && <hr/>}
            <p>{props.index + 1}. <em>{props.meaning.partOfSpeech}. </em></p>
            {
                (props.meaning.definitions.length === 1) ? 
                <DefinitionDisplay def={props.meaning.definitions[0]}/> : 
                <ul>{props.meaning.definitions.map((def, index) => <li><DefinitionDisplay key={index * (props.index + 1)} def={def}/></li>)}</ul>
            }
        </div>
    );
}

export default DefMeaningsDisplay;