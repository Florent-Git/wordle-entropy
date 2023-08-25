export type WordleLetterState = "WRONG" | "WRONG_POS" | "CORRECT" | "NO_STATE";
export type WordleGameState = "ONGOING" | "WON" | "LOST";

export interface WordleLetter {
    letter: string,
    state: WordleLetterState
}

export abstract class Wordle {
    protected abstract _history: WordleLetter[][]
    protected abstract _letters: WordleLetter[]
    protected abstract _state: WordleGameState

    get letters(): WordleLetter[] {
        return this._letters;
    }

    get history(): WordleLetter[][] {
        return this._history;
    }

    get state(): WordleGameState {
        return this._state;
    }

    constructor(
        protected nbLetters: number,
        protected nbTries: number,
        private wordRetriever: () => string
    ) { }

    protected abstract setHistory(history: WordleLetter[][]): void;
    protected abstract setLetters(letters: WordleLetter[]): void;
    protected abstract setState(b: WordleGameState): void;

    private pushHistory(lettersToBePushed: WordleLetter[]) {
        this.setHistory([...this._history, lettersToBePushed])
    }

    clearLetters() {
        this.setLetters([]);
    }

    addLetter(letter: string) {
        if (this._letters.length < this.nbLetters) {
            this.setLetters([...this._letters, { letter, state: "NO_STATE" }])
        }
    }

    removeLetter() {
        this.setLetters([...this._letters.slice(0, -1)]);
    }

    checkAnswer() {
        if (this._letters.length != this.nbLetters)
            return;
        
        const word = this.wordRetriever();
        const wordArray = word.split("");

        for (let i = 0; i < this._letters.length; ++i) {
            for (let j = 0; j < wordArray.length; ++j) {
                if (wordArray[j] == this._letters[i].letter) {
                    if (i == j) this._letters[i].state = "CORRECT";
                    if (i != j) this._letters[i].state = "WRONG_POS";
                    delete wordArray[j];
                    break;
                } else {
                    this._letters[i].state = "WRONG";
                }
            }
        }

        this.pushHistory(this._letters);
        this.clearLetters();

        const historyState = this._history[-1]
            ?.map(it => it?.state == "CORRECT" ?? false)
            ?.reduce((a, b) => a && b) ?? false;

        if (historyState) 
            this.setState("WON");
        else if (this.history.length == this.nbTries) 
            this.setState("LOST");
        else 
            this.setState("ONGOING");
    }
}