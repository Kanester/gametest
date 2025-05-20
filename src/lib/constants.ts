let getWindowSize = () => {
	return {
		width: window.innerWidth,
		height: window.innerHeight,
		dpr: window.devicePixelRatio || 1
	};
};

enum Direction {
	Up,
	Down,
	Left,
	Right
}

export { getWindowSize, Direction };
