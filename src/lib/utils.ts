import { writable, type Writable } from 'svelte/store';

const ctx: Writable<CanvasRenderingContext2D | null> = writable(null);

export { ctx };
