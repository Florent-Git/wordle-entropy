import { useState } from "react";
import { Wordle, WordleGameState, WordleLetter } from "./wordle.js";

export function useWordle(
    nbLetters: number, 
    nbTries: number
): Wordle {
    const [history, setHistory] = useState([]);
	const [letters, setLetters] = useState([]);
	const [state, setState] = useState<WordleGameState>("ONGOING");

    class ReactWordle extends Wordle {
        protected override _history: WordleLetter[][] = history;
        protected override _letters: WordleLetter[] = letters;
        protected override _state: WordleGameState = state;
        protected override setHistory = setHistory;
        protected override setLetters = setLetters;
        protected override setState = setState;
    }

    return new ReactWordle(nbLetters, nbTries, () => "clear");
}