import React, { useState } from "react";
import Header from "./Header"
import Footer from "./Footer"
import HelpContent from "./HelpContent";
import GameContent from "./GameContent";

function App() {
    const [isHelpRequested, setHelpRequested] = useState(false);

    function showHelp() {
        setHelpRequested(prev => !prev);
    }

    return (
        <div>
            <Header showHelp={showHelp} />
            {isHelpRequested && <HelpContent />}
            <GameContent />
            <Footer/>
        </div>
    )
}

export default App;