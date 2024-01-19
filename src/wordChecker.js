import axios from "axios";
import React from "react";
import Definition from "./components/Definition";

async function checkWord(word){
    const endpoint = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    try {
        await axios.get(endpoint);
        return true;
    } 
    catch (error) {
        console.error("Failed to make request:", error.message);
        return false;
    }
}

async function getDefinition(word) {
    const endpoint = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    try {
        const response = await axios.get(endpoint);
        const def = response.data[0];
        return <Definition def={def}/>;
    } 
    catch (error) {
        console.error("Failed to make request:", error.message);
        return "Definition not found";
    }
}

export default checkWord;
export {getDefinition};

