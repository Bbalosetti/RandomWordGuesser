import React from "react";

function Header(props) {
    return (
        <div className="headerZone">
            <h1 id="title">Random Word Guesser</h1>
            <button className="btn" onClick={props.showHelp}>How to play</button>
        </div>
    )
}

export default Header;