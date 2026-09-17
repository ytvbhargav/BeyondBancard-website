"use client";

import { useEffect, useRef } from "react";

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

// Exact port of .hero-glow (app/globals.css, >=64rem): layered radial
// gradients in CSS px, drawn bottom layer first (.hero-glow, then
// .hero-glow-core). Colours are the brand tokens
// ink-950, brand-900/800/600/500 and sky-400. At uTime 0 the result matches the
// static CSS; afterwards the core breathes and drifts very slightly.
const FRAG = `precision mediump float;
uniform vec2 uRes;uniform vec2 uSize;uniform float uRem;uniform float uTime;
const vec3 INK950=vec3(.0275,.0627,.1647);const vec3 B900=vec3(.1020,.1804,.5020);const vec3 B800=vec3(.1020,.2039,.6510);
const vec3 B600=vec3(.1843,.3569,1.);const vec3 B500=vec3(.3020,.4471,1.);const vec3 SKY=vec3(.3686,.7686,1.);
float L(vec2 p,vec2 c,vec2 r,float a,float s){return a*(1.-clamp(length((p-c)/r)/s,0.,1.));}
float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
void main(){
  vec2 p=vec2(gl_FragCoord.x,uRes.y-gl_FragCoord.y)*(uSize/uRes);
  float W=uSize.x,H=uSize.y;
  float br=1.+.03*sin(uTime*.17);
  vec2 k=vec2(.5*W+.015*W*sin(uTime*.21),H-16.*uRem);
  vec3 c=INK950;
  c=mix(c,B900,L(p,vec2(.5*W,0.),vec2(.60*W,.45*H),.55,.72));
  c=mix(c,B900,L(p,k,vec2(.90*W,1.50*H),.80,.80));
  c=mix(c,B800,L(p,k,vec2(.62*W,1.00*H*br),.85,.74));
  c=mix(c,B600,L(p,k,vec2(.52*W,.64*H*br),.80,.72));
  c=mix(c,B500,L(p,k,vec2(.34*W,.36*H*br),.85,.72));
  c=mix(c,B500,L(p,k,vec2(.60*W,.22*H*br),.90,.76));
  c=mix(c,SKY,L(p,vec2(k.x,H-17.5*uRem),vec2(30.*uRem,6.*uRem),.50,.70));
  c+=(hash(gl_FragCoord.xy+fract(uTime))-.5)*(2./255.);
  gl_FragColor=vec4(c,1.);
}`;

/**
 * Slow brand glow behind the homepage hero (S1). Renders at half
 * resolution, caps DPR at 1.5, throttles to ~30fps and pauses when offscreen or
 * the tab is hidden. A fresh canvas is created per mount so a released WebGL
 * context is never reused. Never mounted for reduced motion (static CSS
 * fallback stays visible underneath).
 */
export default function MeshGradient({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity 1200ms ease-out";

    // Software renderers (blocklisted GPUs, headless audits) keep the static CSS gradient.
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
      failIfMajorPerformanceCaveat: true,
    });
    if (!gl) return;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    if (/swiftshader|llvmpipe|software|basic render/i.test(renderer)) return;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uSize = gl.getUniformLocation(prog, "uSize");
    const uRem = gl.getUniformLocation(prog, "uRem");

    host.appendChild(canvas);

    // t = 0 at mount, so the first frames match the static CSS composition.
    const start = performance.now();
    const draw = (now: number) => {
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.5;
      const w = Math.max(1, Math.round(host.clientWidth * scale));
      const h = Math.max(1, Math.round(host.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
      gl.uniform2f(uSize, host.clientWidth, host.clientHeight);
      gl.uniform1f(uRem, parseFloat(getComputedStyle(document.documentElement).fontSize) || 16);
      draw(performance.now());
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let raf = 0;
    let visible = true;
    let last = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (now - last < 33) return;
      last = now;
      draw(now);
    };
    const play = () => {
      cancelAnimationFrame(raf);
      if (visible && !document.hidden) raf = requestAnimationFrame(frame);
    };

    requestAnimationFrame(() => {
      canvas.style.opacity = "1";
    });

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      play();
    });
    io.observe(host);
    document.addEventListener("visibilitychange", play);
    play();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", play);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, []);

  return <div ref={hostRef} aria-hidden className={className} />;
}
