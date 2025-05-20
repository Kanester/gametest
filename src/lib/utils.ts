import { getWindowSize } from './constants.ts';

let resize = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
	const { width, height, DPR } = getWindowSize();

	canvas.width = width * DPR;
	canvas.height = height * DPR;
	canvas.style.width = width + 'px';
	canvas.style.height = height + 'px';
	ctx?.scale(DPR, DPR);
};

export { resize };
