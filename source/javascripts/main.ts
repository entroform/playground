import {
  Vector2,
  Viewport,
} from '@nekobird/rocket';

// https://stackoverflow.com/questions/29586754/how-can-i-recreate-this-wavy-image-effect

class PrettyCircle {
  canvasContainer: HTMLElement | null = null;

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  radius: number;
  segments: number;

  constructor() {
    this.canvas = document.createElement('CANVAS') as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');
  }

  resizeCanvas() {
    this.canvas.width = Viewport.width;
    this.canvas.height = Viewport.height;
  }
}

const canvasContainer = document.getElementById('canvas');

if (canvasContainer) {
  // Create canvas element
}