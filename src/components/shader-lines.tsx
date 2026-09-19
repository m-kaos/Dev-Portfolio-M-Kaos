import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    THREE: any;
  }
}

const THREE_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/89/three.min.js';

/** Cap the render resolution: this fragment shader runs 15 iterations per pixel. */
const MAX_PIXEL_RATIO = 1.5;
const MAX_PIXEL_RATIO_SMALL = 1;
const SMALL_SCREEN = 768;

let threeLoader: Promise<void> | null = null;

/** Load Three.js once per document and reuse it across mounts. */
function loadThree(): Promise<void> {
  if (window.THREE) return Promise.resolve();
  if (threeLoader) return threeLoader;

  threeLoader = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = THREE_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      threeLoader = null;
      reject(new Error('Failed to load Three.js'));
    };
    document.head.appendChild(script);
  });

  return threeLoader;
}

function pixelRatioFor(width: number): number {
  const cap = width < SMALL_SCREEN ? MAX_PIXEL_RATIO_SMALL : MAX_PIXEL_RATIO;
  return Math.min(window.devicePixelRatio || 1, cap);
}

const vertexShader = `
  void main() {
    gl_Position = vec4( position, 1.0 );
  }
`;

const fragmentShader = `
  #define TWO_PI 6.2831853072
  #define PI 3.14159265359

  precision highp float;
  uniform vec2 resolution;
  uniform float time;

  float random (in float x) {
      return fract(sin(x)*1e4);
  }
  float random (vec2 st) {
      return fract(sin(dot(st.xy,
                           vec2(12.9898,78.233)))*
          43758.5453123);
  }

  varying vec2 vUv;

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

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let animationId: number | null = null;
    let renderer: any = null;
    let cleanupListeners: (() => void) | null = null;

    loadThree()
      .then(() => {
        if (disposed || !containerRef.current || !window.THREE) return;

        const THREE = window.THREE;
        const camera = new THREE.Camera();
        camera.position.z = 1;

        const scene = new THREE.Scene();
        const geometry = new THREE.PlaneBufferGeometry(2, 2);
        const uniforms = {
          time: { type: 'f', value: 1.0 },
          resolution: { type: 'v2', value: new THREE.Vector2() },
        };

        const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
        scene.add(new THREE.Mesh(geometry, material));

        renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'low-power' });
        container.appendChild(renderer.domElement);

        const resize = (): void => {
          const rect = container.getBoundingClientRect();
          renderer.setPixelRatio(pixelRatioFor(rect.width));
          renderer.setSize(rect.width, rect.height);
          uniforms.resolution.value.x = renderer.domElement.width;
          uniforms.resolution.value.y = renderer.domElement.height;
        };

        resize();

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        const stop = (): void => {
          if (animationId !== null) {
            cancelAnimationFrame(animationId);
            animationId = null;
          }
        };

        let lastTime = performance.now();

        const frame = (now: number): void => {
          // Advance by elapsed time so speed is framerate-independent.
          uniforms.time.value += (now - lastTime) * 0.003;
          lastTime = now;
          renderer.render(scene, camera);
          animationId = requestAnimationFrame(frame);
        };

        const start = (): void => {
          if (animationId !== null || disposed) return;
          if (reduceMotion.matches || document.hidden) {
            renderer.render(scene, camera);
            return;
          }
          lastTime = performance.now();
          animationId = requestAnimationFrame(frame);
        };

        const onVisibility = (): void => (document.hidden ? stop() : start());
        const onResize = (): void => {
          resize();
          if (animationId === null) renderer.render(scene, camera);
        };

        window.addEventListener('resize', onResize);
        document.addEventListener('visibilitychange', onVisibility);
        reduceMotion.addEventListener('change', onVisibility);

        cleanupListeners = () => {
          stop();
          window.removeEventListener('resize', onResize);
          document.removeEventListener('visibilitychange', onVisibility);
          reduceMotion.removeEventListener('change', onVisibility);
          geometry.dispose();
          material.dispose();
        };

        start();
      })
      .catch(() => {
        // Background is decorative: a load failure must not break the page.
      });

    return () => {
      disposed = true;
      if (animationId !== null) cancelAnimationFrame(animationId);
      cleanupListeners?.();
      if (renderer) {
        renderer.forceContextLoss?.();
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute h-full w-full" />;
}
