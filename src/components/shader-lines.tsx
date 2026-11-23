import { useEffect, useRef } from 'react';

/**
 * The glass theme's animated background.
 *
 * This used to pull Three.js r89 off a CDN — 517 KB to draw a single quad with
 * one fragment shader, on a theme that is the site's default, so every visitor
 * paid for it. There is no scene, camera or geometry here worth a scene graph:
 * a fullscreen triangle and a shader program is the whole thing, which is what
 * this does directly against WebGL. The rendered output is unchanged.
 */

/** Cap the render resolution: this fragment shader runs 15 iterations per pixel. */
const MAX_PIXEL_RATIO = 1.5;
const MAX_PIXEL_RATIO_SMALL = 1;
const SMALL_SCREEN = 768;

const VERTEX_SHADER = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif

  uniform vec2 resolution;
  uniform float time;

  float random (in float x) {
      return fract(sin(x)*1e4);
  }

  void main(void) {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

    vec2 fMosaicScal = vec2(4.0, 2.0);
    vec2 vScreenSize = vec2(256,256);
    uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
    uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);

    float t = time*0.06+random(uv.x)*0.4;
    float lineWidth = 0.0008;

    vec3 color = vec3(0.0);
    for(int j = 0; j < 3; j++){
      for(int i=0; i < 5; i++){
        color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*1.0 - length(uv));
      }
    }

    gl_FragColor = vec4(color[2],color[1],color[0],1.0);
  }
`;

function pixelRatioFor(width: number): number {
  const cap = width < SMALL_SCREEN ? MAX_PIXEL_RATIO_SMALL : MAX_PIXEL_RATIO;
  return Math.min(window.devicePixelRatio || 1, cap);
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    }) as WebGLRenderingContext | null;

    // The background is decorative: no WebGL means no background, not a crash.
    if (!gl) return;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();

    if (!vertexShader || !fragmentShader || !program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    gl.useProgram(program);

    // One triangle large enough to cover clip space: cheaper than two, and the
    // shader only ever reads gl_FragCoord.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, 'resolution');
    const timeLocation = gl.getUniformLocation(program, 'time');

    container.appendChild(canvas);

    let animationId: number | null = null;
    let time = 1.0;
    let lastTime = performance.now();

    const render = (): void => {
      gl.uniform1f(timeLocation, time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = (): void => {
      const rect = container.getBoundingClientRect();
      const ratio = pixelRatioFor(rect.width);
      const width = Math.max(1, Math.floor(rect.width * ratio));
      const height = Math.max(1, Math.floor(rect.height * ratio));

      if (canvas.width === width && canvas.height === height) return;

      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.uniform2f(resolutionLocation, width, height);
    };

    resize();

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const stop = (): void => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    const frame = (now: number): void => {
      // Advance by elapsed time so speed is framerate-independent.
      time += (now - lastTime) * 0.003;
      lastTime = now;
      render();
      animationId = requestAnimationFrame(frame);
    };

    const start = (): void => {
      if (animationId !== null) return;
      if (reduceMotion.matches || document.hidden) {
        render();
        return;
      }
      lastTime = performance.now();
      animationId = requestAnimationFrame(frame);
    };

    const onVisibility = (): void => (document.hidden ? stop() : start());
    const onResize = (): void => {
      resize();
      if (animationId === null) render();
    };

    // A lost context cannot be drawn to; stop rather than spin on failed draws.
    const onContextLost = (event: Event): void => {
      event.preventDefault();
      stop();
    };
    const onContextRestored = (): void => {
      resize();
      start();
    };

    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    reduceMotion.addEventListener('change', onVisibility);

    start();

    return () => {
      stop();
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      reduceMotion.removeEventListener('change', onVisibility);

      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.getExtension('WEBGL_lose_context')?.loseContext();

      canvas.remove();
    };
  }, []);

  return <div ref={containerRef} className="absolute h-full w-full" />;
}
