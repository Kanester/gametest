function resize(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
	const width = window.innerWidth;
	const height = window.innerHeight;
	const DPR = window.devicePixelRatio || 1;

	canvas.width = width * DPR;
	canvas.height = height * DPR;
	canvas.style.width = width + 'px';
	canvas.style.height = height + 'px';
	ctx?.scale(DPR, DPR);
}

export { resize };
