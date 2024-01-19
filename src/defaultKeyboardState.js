import { letterStateMap } from "./guessChecker";

const keyboardStateMap = new Map();

for (var i = 0; i < 26; i++) {
    keyboardStateMap.set(String.fromCharCode(97 + i), letterStateMap.get("notChecked"));
}

export default keyboardStateMap;