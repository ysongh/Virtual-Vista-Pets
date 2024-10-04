"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  uniform sampler2D displacementMap;
  uniform float displacementScale;

  void main() {
    vUv = uv;
    vec4 displacement = texture2D(displacementMap, uv);
    vec3 newPosition = position + normal * displacement.r * displacementScale;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D colorMap;

  void main() {
    vec4 color = texture2D(colorMap, vUv);
    gl_FragColor = color;
  }
`;

function ImageModel({ imageUrl, displacementUrl, displacementScale = 0.1 }) {
  const mesh = useRef();
  const colorMap = useLoader(TextureLoader, imageUrl);
  const displacementMap = useLoader(TextureLoader, displacementUrl);

  const uniforms = useMemo(() => ({
    colorMap: { value: colorMap },
    displacementMap: { value: displacementMap },
    displacementScale: { value: displacementScale }
  }), [colorMap, displacementMap, displacementScale]);

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function Image3DModel() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 1.5], fov: 75 }}>
        <ImageModel imageUrl="/cat.png" displacementUrl="/cat.png" />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
      </Canvas>
    </div>
  );
}