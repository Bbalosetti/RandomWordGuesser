import axios from "axios";
import checkWord from "./wordChecker";

async function getRandomWord() {
    const endpoint = "https://random-word-api.herokuapp.com/word?length=5";
    
    try {
        const response = await axios.get(endpoint);
        const randomWord = response.data[0];
        console.log(randomWord);
        let check = await checkWord(randomWord);
        if (!check) {
            return await getRandomWord();
        }
        else return randomWord.toString();
    } 
    catch (error) {
        console.error("Failed to make request:", error.message);
        return false;
    }
}

export default getRandomWord;