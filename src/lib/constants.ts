let getWindowSize = () => {
	return {
		width: window.innerWidth,
		height: window.innerHeight,
		DPR: window.devicePixelRatio || 1
	};
};

enum Direction {
	Up,
	Down,
	Left,
	Right
}

export { getWindowSize, Direction };
