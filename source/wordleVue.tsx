import React from "react";
import { useInput, Text } from 'ink';
import { Grid } from "./grid.js";
import { ForegroundColorName } from "chalk";
import { useWordle } from "./wordleHook.js";
import { WordleGameState, WordleLetterState } from "./wordle.js";

const KEYS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

export interface WordleProps {
	nbLetters: number
	nbTries: number
}

function mapColors(state: WordleLetterState): ForegroundColorName {
	switch (state) {
		case "CORRECT":
			return "green"
		case "WRONG":
		case "NO_STATE":
			return "gray"
		case "WRONG_POS":
			return "yellow";
	}
}

function mapEndingMessages(state: WordleGameState): string {
	switch (state) {
		case "LOST":
			return "You have used all your tries. You lost :(";
		case "WON":
			return "You won !";
		case "ONGOING": 
			return "";
	}
}

export function WordleVue({ nbLetters = 5, nbTries = 6 }: WordleProps) {
	const wordle = useWordle(nbLetters, nbTries);

	useInput((input, key) => {
		if (KEYS.includes(input)) {
			wordle.addLetter(input);
		}
		if (key.return) {
			wordle.checkAnswer();
		}
		if (key.backspace || key.delete) {
			wordle.removeLetter();
		}
	});

	const colors = wordle.history
		.map(hEntry => hEntry.map(letter => mapColors(letter.state)));

	const history = wordle.history
		.map(hEntry => hEntry.map(letter => letter.letter));

	const letters = wordle.letters
		.map(it => it.letter);

	return (
		<>
			<Grid
				width={nbLetters}
				height={nbTries}
				contents={[...history, letters]}
				colors={colors} />
			<Text>{ mapEndingMessages(wordle.state) }</Text>
		</>
	);
}
