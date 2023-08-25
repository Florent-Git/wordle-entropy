import { BOX_CROSS, BOX_E, BOX_H, BOX_LL, BOX_LR, BOX_TD, BOX_TL, BOX_TR, BOX_TU, BOX_UL, BOX_UR, BOX_V } from "./gridCharacters.js";
import React from "react";
import { Text } from "ink";
import { ForegroundColorName } from "chalk";

export interface GridProps {
	width: number,
	height: number,
	contents: string[][],
	colors: ForegroundColorName[][]
}

export interface GridContentLineProps {
	width: number,
	content: string[]
	colors: ForegroundColorName[]
}

function GridTopLine(width: number) {
	let topline = BOX_UL;
	for (let i = 0; i < width; ++i) {
		topline += BOX_H + BOX_H + BOX_H + BOX_TU;
	}
	topline = topline.slice(0, -1) + BOX_UR;

	return (
		<Text>
			{topline}
		</Text>
	)
}

function GridMiddleLine(width: number) {
	let midline = BOX_TL;
	for (let i = 0; i < width; ++i) {
		midline += BOX_H + BOX_H + BOX_H + BOX_CROSS;
	}
	midline = midline.slice(0, -1) + BOX_TR;

	return (
		<Text>{midline}</Text>
	)
}

function GridBottomLine(width: number) {
	let bottomline = BOX_LL;
	for (let i = 0; i < width; ++i) {
		bottomline += BOX_H + BOX_H + BOX_H +  BOX_TD;
	}
	bottomline = bottomline.slice(0, -1) + BOX_LR;

	return (
		<Text>{bottomline}</Text>
	)
}

function GridContentLine({width, content, colors}: GridContentLineProps) {
	let contentLine = [Text({"children": BOX_V})];
	for (let i = 0; i < width; ++i) {
		contentLine.push(Text({"children": BOX_E + (i in content ? content[i] : BOX_E) + BOX_E, backgroundColor: colors[i]}));
		contentLine.push(Text({"children": BOX_V}));
	}

	return (
		<Text>{contentLine}</Text>
	)
}

export function Grid({width, height, contents = [], colors = []}: GridProps) {
	let grid = [GridTopLine(width)];
	for (let i = 0; i < height; ++i) {
		grid.push(GridContentLine({width, content: i in contents ? contents[i] : [], colors: i in colors ? colors[i] : []}));
		grid.push(GridMiddleLine(width));
	}
	grid = [...grid.slice(0, -1), GridBottomLine(width)]
	return grid;
}

