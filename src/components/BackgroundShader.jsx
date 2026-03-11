'use client';

import React, { useEffect, useRef } from 'react';

const BackgroundShader = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Vertex Shader
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment Shader - Aurora with FBM
    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      // Palette function
      vec3 palette(float t) {
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.263, 0.416, 0.557);
        // Custom palette for CREATIVEVERSE: Violet (#6d28ff), Rose (#ff1a6e), Cyan (#00e5ff)
        vec3 col1 = vec3(0.427, 0.157, 1.0); // #6d28ff
        vec3 col2 = vec3(1.0, 0.102, 0.431); // #ff1a6e
        vec3 col3 = vec3(0.0, 0.898, 1.0);   // #00e5ff
        
        return a + b * cos(6.28318 * (c * t + d));
      }

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      #define OCTAVES 5
      float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < OCTAVES; i++) {
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.y, u_resolution.x);
        
        float t = u_time * 0.1;
        
        // Animated Aurora
        float n = fbm(p * 0.5 + t);
        float n2 = fbm(p * 0.8 - t * 0.5 + n);
        
        vec3 finalColor = vec3(0.0);
        
        // Brand colors interpolation
        vec3 color1 = vec3(0.427, 0.157, 1.0); // Violet
        vec3 color2 = vec3(1.0, 0.102, 0.431); // Rose
        vec3 color3 = vec3(0.0, 0.898, 1.0);   // Cyan
        
        float mask = smoothstep(0.4, 0.7, n2);
        finalColor = mix(color1, color2, n) * mask;
        finalColor = mix(finalColor, color3, n2 * 0.5) * mask;
        
        // Mouse Reactive Glow
        float d = length(p - (u_mouse * 2.0 - 1.0) * vec2(u_resolution.x/u_resolution.y, 1.0));
        float glow = smoothstep(0.8, 0.0, d);
        finalColor += color3 * glow * 0.15;
        
        // Background base (Deep Ink Black)
        vec3 bg = vec3(0.02, 0.02, 0.04);
        finalColor = mix(bg, finalColor, 0.6);
        
        // Vignette
        float vignette = 1.0 - length(uv - 0.5) * 1.5;
        finalColor *= smoothstep(0.0, 1.0, vignette);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const createShader = (gl, type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, createShader(gl, gl.VERTEX_SHADER, vsSource));
    gl.attachShader(shaderProgram, createShader(gl, gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posAttrib = gl.getAttribLocation(shaderProgram, 'position');
    gl.enableVertexAttribArray(posAttrib);
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);

    const timeUniform = gl.getUniformLocation(shaderProgram, 'u_time');
    const resUniform = gl.getUniformLocation(shaderProgram, 'u_resolution');
    const mouseUniform = gl.getUniformLocation(shaderProgram, 'u_mouse');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1.0 - (e.clientY / window.innerHeight)
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let start = null;
    const render = (time) => {
      if (!start) start = time;
      const elapsed = (time - start) / 1000;

      gl.uniform1f(timeUniform, elapsed);
      gl.uniform2f(resUniform, canvas.width, canvas.height);
      gl.uniform2f(mouseUniform, mouseRef.current.x, mouseRef.current.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{ filter: 'blur(20px)' }}
    />
  );
};

export default BackgroundShader;
