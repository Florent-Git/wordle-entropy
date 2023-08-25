import React from 'react';
import { WordleVue } from './wordleVue.js';


export default function App() {
	return (
		<WordleVue nbLetters={5} nbTries={6}/>
	);
}
