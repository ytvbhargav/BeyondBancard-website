"use client";

import { useEffect, useRef } from "react";

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

// Brand-only palette (ink → brand → sky). The main glow sits centre-low,
// behind the hero device, with a sky hint top-right.
const FRAG = `precision mediump float;
uniform vec2 uRes;uniform float uTime;uniform float uLayout;
const vec3 INK=vec3(0.0549,0.1059,0.2392);
const vec3 INK8=vec3(0.1059,0.1647,0.3333);
const vec3 BRAND=vec3(0.1843,0.3569,1.0);
const vec3 BRAND7=vec3(0.1137,0.2471,0.8196);
const vec3 SKY=vec3(0.3686,0.7686,1.0);
float blob(vec2 p,vec2 c,float r){vec2 d=p-c;return exp(-dot(d,d)/(r*r));}
float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
void main(){
  float m=min(uRes.x,uRes.y);
  vec2 s=uRes/m;
  vec2 p=gl_FragCoord.xy/m;
  float t=uTime*0.055;
  vec2 a1=mix(vec2(0.50,0.36),vec2(0.50,0.34),uLayout)+0.06*vec2(sin(t*1.1),cos(t*0.9));
  vec2 a2=mix(vec2(0.12,0.04),vec2(0.10,0.04),uLayout)+0.07*vec2(cos(t*0.7),sin(t*1.3));
  vec2 a3=mix(vec2(0.90,0.94),vec2(1.02,0.92),uLayout)+0.05*vec2(sin(t*1.7+1.0),cos(t*1.2));
  vec2 a4=mix(vec2(0.08,0.88),vec2(0.05,0.70),uLayout)+0.05*vec2(cos(t*0.8+2.0),sin(t));
  a1*=s;a2*=s;a3*=s;a4*=s;
  vec3 c=INK;
  c=mix(c,INK8,blob(p,a4,0.62)*0.55);
  c=mix(c,BRAND7,blob(p,a1,0.62)*0.70);
  c=mix(c,BRAND,blob(p,a1,0.30)*0.50);
  c=mix(c,BRAND7,blob(p,a2,0.45)*0.40);
  c=mix(c,SKY,blob(p,a3,0.30)*0.30);
  c+=(hash(gl_FragCoord.xy+fract(t))-0.5)*(2.0/255.0);
  gl_FragColor=vec4(c,1.0);
}`;

/**
 * Slow brand mesh gradient behind the homepage hero (S1). Renders at half
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
    const uLayout = gl.getUniformLocation(prog, "uLayout");

    host.appendChild(canvas);

    const start = performance.now() - 20000;
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
      gl.uniform1f(uLayout, host.clientWidth < 1024 ? 1 : 0);
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
