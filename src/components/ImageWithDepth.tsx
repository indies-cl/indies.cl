'use client';

import React, { useRef, useEffect, useState, MutableRefObject } from 'react';

interface ImageWithDepthProps {
  imageSrc: string; // ruta a la imagen
  depthSrc: string; // ruta al depth map (blanco = cerca)
  /**
   * Intensidad “lógica” del efecto (0–1).
   * Internamente se mapea a un desplazamiento UV seguro.
   * Recomendado: 0.2–0.7
   */
  strength?: number;
  /** Suavizado del movimiento (0–1, más alto = más suave). Default: 0.18 */
  smoothing?: number;
  /** Alto del bloque en px. Default: 550 */
  height?: number;
}

/**
 * Hook: devuelve un valor -1..1 según la posición vertical
 * del contenedor en el viewport (parallax basado en scroll).
 */
function useSectionParallax(
  ref: MutableRefObject<HTMLDivElement | null>,
): number {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    const handle = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight || 1;

      const center = rect.top + rect.height / 2;
      const delta = (center - viewH / 2) / viewH; // aprox -1..1
      const clamped = Math.max(-1, Math.min(1, delta));

      setValue(clamped);
    };

    handle();
    window.addEventListener('scroll', handle, { passive: true });
    window.addEventListener('resize', handle);

    return () => {
      window.removeEventListener('scroll', handle);
      window.removeEventListener('resize', handle);
    };
  }, [ref]);

  return value;
}

/** Helpers WebGL */

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error('No se pudo crear shader');
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error('Error compilando shader: ' + info);
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vsSource: string,
  fsSource: string,
): WebGLProgram {
  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  const program = gl.createProgram();
  if (!program) {
    throw new Error('No se pudo crear programa');
  }
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error('Error linkeando programa: ' + info);
  }
  return program;
}

function createTextureFromImage(
  gl: WebGLRenderingContext,
  image: HTMLImageElement,
): WebGLTexture {
  const tex = gl.createTexture();
  if (!tex) {
    throw new Error('No se pudo crear textura');
  }
  gl.bindTexture(gl.TEXTURE_2D, tex);

  // Importante para que no quede invertida verticalmente
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.bindTexture(gl.TEXTURE_2D, null);
  return tex;
}

const VERTEX_SHADER_SOURCE = `
  attribute vec2 a_position;
  attribute vec2 a_uv;
  varying vec2 v_uv;

  void main() {
    v_uv = a_uv;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Shader con depth centrado, parallax divertido y zoom 5% en bordes
const FRAGMENT_SHADER_SOURCE = `
  precision mediump float;

  varying vec2 v_uv;

  uniform sampler2D u_image;
  uniform sampler2D u_depth;
  uniform float u_scroll;       // -1..1 desde scroll
  uniform float u_strength;     // intensidad (relativa en UV)
  uniform float u_imgAspect;    // imgWidth / imgHeight
  uniform float u_canvasAspect; // canvasWidth / canvasHeight

  void main() {
    vec2 uv = v_uv;

    // ===== background-size: cover =====
    float imgA = u_imgAspect;
    float canA = u_canvasAspect;

    if (imgA > canA) {
      // Imagen más ancha -> recortamos laterales
      float scale = canA / imgA;
      uv = (uv - 0.5) * vec2(scale, 1.0) + 0.5;
    } else {
      // Imagen más alta -> recortamos arriba/abajo
      float scale = imgA / canA;
      uv = (uv - 0.5) * vec2(1.0, scale) + 0.5;
    }

    // ==== Zoom extra (clip 4% en los bordes) ====
    // Mantiene el 96% central de la imagen (0.02..0.98)
    float zoom = 0.96;
    uv = (uv - 0.5) * zoom + 0.5;

    // Depth map (blanco = cerca, negro = lejos)
    float d = texture2D(u_depth, uv).r;

    // Recentramos:
    //  0.5 => 0 (plano medio)
    //  1.0 => +1 (muy cerca)
    //  0.0 => -1 (muy lejos)
    float dCentered = (d - 0.5) * 2.0;

    // Curva no lineal para que se note un poco más
    float depthFactor = sign(dCentered) * pow(abs(dCentered), 1.2);

    // Parallax vertical con depth
    float shift = u_scroll * depthFactor * u_strength;

    // Toque extra horizontal para 3D (suavizado)
    float sideShift = u_scroll * dCentered * (u_strength * 0.25);

    vec2 displacedUV = uv + vec2(sideShift, shift);

    // Clamping para evitar bordes negros
    displacedUV = clamp(displacedUV, 0.0, 1.0);

    vec4 color = texture2D(u_image, displacedUV);
    gl_FragColor = color;
  }
`;

const ImageWithDepth: React.FC<ImageWithDepthProps> = ({
  imageSrc,
  depthSrc,
  strength = 0.4, // valor "divertido" por defecto (0–1)
  smoothing = 0.18,
  height = 550,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const parallax = useSectionParallax(containerRef);
  const parallaxRef = useRef<number>(0);

  useEffect(() => {
    parallaxRef.current = parallax;
  }, [parallax]);

  const [webglOk, setWebglOk] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Detectar preferencia de reduce motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Lazy loading: solo inicializar cuando esté visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { rootMargin: '50px' },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // No inicializar WebGL hasta que sea visible
    if (!isVisible) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const context =
      canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl');

    const gl = context as WebGLRenderingContext | null;

    if (!gl) {
      console.warn('WebGL no disponible, usando fallback <img>.');
      setWebglOk(false);
      return;
    }

    let frameId: number | null = null;
    let running = true;

    let program: WebGLProgram | null = null;
    let positionBuffer: WebGLBuffer | null = null;
    let uvBuffer: WebGLBuffer | null = null;

    let uImageLoc: WebGLUniformLocation | null = null;
    let uDepthLoc: WebGLUniformLocation | null = null;
    let uScrollLoc: WebGLUniformLocation | null = null;
    let uStrengthLoc: WebGLUniformLocation | null = null;
    let uImgAspectLoc: WebGLUniformLocation | null = null;
    let uCanvasAspectLoc: WebGLUniformLocation | null = null;

    let imgTexture: WebGLTexture | null = null;
    let depthTexture: WebGLTexture | null = null;

    let imgAspect = 1.0;
    let canvasAspect = 1.0;
    let currentScroll = 0;

    const img: HTMLImageElement = new Image();
    const depth: HTMLImageElement = new Image();
    img.crossOrigin = 'anonymous';
    depth.crossOrigin = 'anonymous';
    // Priorizar la carga de estas imágenes
    img.fetchPriority = 'high';
    depth.fetchPriority = 'high';
    img.src = imageSrc;
    depth.src = depthSrc;

    const resizeCanvas = () => {
      if (!container) return;
      const width = container.clientWidth || 1;
      const h = height;

      canvas.width = width;
      canvas.height = h;
      canvas.style.width = '100%';
      canvas.style.height = `${h}px`;

      gl.viewport(0, 0, width, h);
      canvasAspect = width / h;

      if (program && uCanvasAspectLoc) {
        gl.useProgram(program);
        gl.uniform1f(uCanvasAspectLoc, canvasAspect);
      }
    };

    const initGL = () => {
      program = createProgram(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
      gl.useProgram(program);

      const posLoc = gl.getAttribLocation(program, 'a_position');
      const uvLoc = gl.getAttribLocation(program, 'a_uv');

      const positions = new Float32Array([
        -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
      ]);

      const uvs = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]);

      positionBuffer = gl.createBuffer();
      if (!positionBuffer) {
        throw new Error('No se pudo crear positionBuffer');
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      uvBuffer = gl.createBuffer();
      if (!uvBuffer) {
        throw new Error('No se pudo crear uvBuffer');
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(uvLoc);
      gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

      uImageLoc = gl.getUniformLocation(program, 'u_image');
      uDepthLoc = gl.getUniformLocation(program, 'u_depth');
      uScrollLoc = gl.getUniformLocation(program, 'u_scroll');
      uStrengthLoc = gl.getUniformLocation(program, 'u_strength');
      uImgAspectLoc = gl.getUniformLocation(program, 'u_imgAspect');
      uCanvasAspectLoc = gl.getUniformLocation(program, 'u_canvasAspect');

      // Mapear strength (0–1) a un rango UV sano y con buen efecto (0.05–0.35)
      if (uStrengthLoc) {
        const clamped = Math.max(0, Math.min(1, strength));
        const uvStrength = 0.05 + clamped * 0.3; // 0.05 .. 0.35
        gl.uniform1f(uStrengthLoc, uvStrength);
      }
    };

    const setupTexturesAndUniforms = () => {
      if (!program) return;

      imgTexture = createTextureFromImage(gl, img);
      depthTexture = createTextureFromImage(gl, depth);

      imgAspect = img.width / img.height || 1.0;

      gl.useProgram(program);

      if (uImgAspectLoc) {
        gl.uniform1f(uImgAspectLoc, imgAspect);
      }

      resizeCanvas();

      if (uCanvasAspectLoc) {
        gl.uniform1f(uCanvasAspectLoc, canvasAspect);
      }

      if (uImageLoc && imgTexture) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, imgTexture);
        gl.uniform1i(uImageLoc, 0);
      }

      if (uDepthLoc && depthTexture) {
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, depthTexture);
        gl.uniform1i(uDepthLoc, 1);
      }
    };

    const render = () => {
      if (!running) return;

      gl.clear(gl.COLOR_BUFFER_BIT);

      if (!program || !imgTexture || !depthTexture || !uScrollLoc) {
        frameId = window.requestAnimationFrame(render);
        return;
      }

      // Suavizado del scroll
      const targetScroll = parallaxRef.current; // -1..1
      currentScroll += (targetScroll - currentScroll) * 0.12;

      // Reducir la intensidad para que no esté atado 1:1 al scroll
      const scrollForShader = currentScroll * 0.35;

      gl.useProgram(program);
      gl.uniform1f(uScrollLoc, scrollForShader);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      frameId = window.requestAnimationFrame(render);
    };

    const maybeSetupAndStart = () => {
      if (
        img.complete &&
        depth.complete &&
        img.naturalWidth > 0 &&
        depth.naturalWidth > 0
      ) {
        setupTexturesAndUniforms();
        if (frameId === null) {
          frameId = window.requestAnimationFrame(render);
        }
      }
    };

    try {
      initGL();
    } catch (error) {
      console.error(error);
      setWebglOk(false);
      return;
    }

    if (img.complete && depth.complete) {
      maybeSetupAndStart();
    } else {
      img.onload = maybeSetupAndStart;
      depth.onload = maybeSetupAndStart;
    }

    const resizeObserver: ResizeObserver | null =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            resizeCanvas();
          })
        : null;

    if (resizeObserver && container) {
      resizeObserver.observe(container);
    }

    gl.clearColor(0, 0, 0, 1);

    return () => {
      running = false;
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      if (resizeObserver && container) {
        resizeObserver.disconnect();
      }

      if (imgTexture) gl.deleteTexture(imgTexture);
      if (depthTexture) gl.deleteTexture(depthTexture);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      if (uvBuffer) gl.deleteBuffer(uvBuffer);
      if (program) gl.deleteProgram(program);
    };
  }, [imageSrc, depthSrc, height, strength, smoothing, isVisible]);

  // Fallback si no hay WebGL o si el usuario prefiere reducir movimiento
  if (!webglOk || prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: `${height}px`,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt="depth image"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: 'grayscale(100%)',
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: `${height}px`,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'black',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          filter: 'grayscale(100%)',
        }}
      />
    </div>
  );
};

export default ImageWithDepth;
