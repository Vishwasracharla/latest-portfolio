export class WireframeGrid {
  constructor(canvas) {
    if (!canvas) return;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.time = 0;
    this.visible = true;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    document.addEventListener('visibilitychange', () => {
      this.visible = !document.hidden;
    });

    this.animate();
  }

  resize() {
    // Make the canvas double size for high-DPI displays if necessary, but standard is fine
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width || window.innerWidth;
    this.canvas.height = rect.height || 350; // set a fixed logical height for bottom terrain
  }

  animate() {
    if (this.visible) {
      this.time += 0.006;
      this.draw();
    }
    requestAnimationFrame(() => this.animate());
  }

  draw() {
    const { ctx, canvas, time } = this;
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const cols = 28;
    const rows = 14;
    const points = [];

    // 3D parameters
    const fov = 250;
    const centerX = width / 2;
    const centerY = height * 0.4; // Center vertical anchor

    // 1. Calculate and project all grid points
    for (let r = 0; r < rows; r++) {
      points[r] = [];
      for (let c = 0; c < cols; c++) {
        // Map grid coordinates to 3D space
        // x goes from left to right
        const x3d = (c / (cols - 1) - 0.5) * width * 1.5;
        // y represents depth (goes from front to back)
        const y3d = (r / (rows - 1)) * 260 + 80;
        
        // z represents height (the wave function)
        // Combine multiple sine waves for organic fluid movement
        const wave1 = Math.sin(c * 0.28 + time * 2.2) * Math.cos(r * 0.22 + time * 1.8) * 22;
        const wave2 = Math.sin(r * 0.35 - time * 1.2) * 10;
        const z3d = wave1 + wave2;

        // Perspective projection
        const scale = fov / (fov + y3d);
        const screenX = centerX + x3d * scale;
        // Adjust vertical position based on depth and wave height
        const screenY = centerY + y3d * 0.65 + z3d * scale;

        // Fade out lines in the distance (deeper y3d)
        // Also fade out lines towards the sides
        const distFromCenterPct = Math.abs(c / (cols - 1) - 0.5) * 2;
        const depthAlpha = Math.max(0, 1 - (y3d - 80) / 260); // 1 at front, 0 at back
        const edgeAlpha = Math.max(0, 1 - distFromCenterPct);
        const alpha = depthAlpha * edgeAlpha * 0.32; // max alpha of 0.32

        points[r][c] = { x: screenX, y: screenY, alpha };
      }
    }

    // 2. Draw lines connecting the projected points
    ctx.lineWidth = 1;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const p1 = points[r][c];

        // Draw horizontal line (connect to next column)
        if (c < cols - 1) {
          const p2 = points[r][c + 1];
          const avgAlpha = (p1.alpha + p2.alpha) / 2;
          if (avgAlpha > 0.01) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Neon purple stroke
            ctx.strokeStyle = `rgba(168, 85, 247, ${avgAlpha})`;
            ctx.stroke();
          }
        }

        // Draw vertical line (connect to next row)
        if (r < rows - 1) {
          const p2 = points[r + 1][c];
          const avgAlpha = (p1.alpha + p2.alpha) / 2;
          if (avgAlpha > 0.01) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Blend from purple to cyan slightly depending on depth, or keep pure neon purple
            ctx.strokeStyle = `rgba(168, 85, 247, ${avgAlpha})`;
            ctx.stroke();
          }
        }
      }
    }
  }
}
