import { writable, type Writable } from 'svelte/store';

const ctx: Writable<CanvasRenderingContext2D | null> = writable(null);

const joystick: Writable<{ x: number; y: number }> = writable({ x: 0, y: 0 });

export { ctx, joystick };
