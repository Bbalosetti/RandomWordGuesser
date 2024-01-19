import React from "react";

function DefinitionDisplay(props) {
    return (
        <div className="definitionDisplay">
            {props.def.definition}
        </div>
    );
}

export default DefinitionDisplay;