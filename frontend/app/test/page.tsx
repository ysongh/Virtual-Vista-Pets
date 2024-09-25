"use client";

import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Image } from '@react-three/drei';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

// Create a new 2D noise function
const noise2D = createNoise2D();

const ImageItem = ({ url, index, totalImages, radius, onClick, expandedIndex }) => {
  const mesh = useRef();
  const { viewport } = useThree();

  // Generate unique offsets for each image
  const offsets = useMemo(() => ({
    x: Math.random() * 1000,
    y: Math.random() * 1000,
    z: Math.random() * 1000
  }), []);

  const speedFactor = 0.05;

  // Function to clamp a value between a min and max
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  useFrame((state) => {
    const isExpanded = expandedIndex === index;
    const time = state.clock.getElapsedTime();
    
    if (isExpanded) {
      mesh.current.position.lerp(new THREE.Vector3(0, 0, 2), 0.1);
      mesh.current.scale.lerp(new THREE.Vector3(5, 5, 1), 0.1);
      mesh.current.rotation.y = 0;  // Keep expanded image facing the camera
    } else {
      const targetScale = expandedIndex !== null ? 0.5 : 1;
      mesh.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.1);

      // Generate smooth random movement using Perlin noise
      const noiseX = noise2D(time * speedFactor + offsets.x, 0) * radius * 0.5;
      const noiseY = noise2D(time * speedFactor + offsets.y, 0) * radius * 0.5;
      const noiseZ = noise2D(time * speedFactor + offsets.z, 0) * radius * 0.5;

      // Calculate the maximum allowed position based on viewport and current scale
      const maxX = (viewport.width / 2) - (mesh.current.scale.x / 2);
      const maxY = (viewport.height / 2) - (mesh.current.scale.y / 2);
      const maxZ = radius; // Limit Z movement to the radius

      // Clamp the target position within the visible area
      const targetX = clamp(noiseX, -maxX, maxX);
      const targetY = clamp(noiseY, -maxY, maxY);
      const targetZ = clamp(noiseZ, -maxZ, maxZ);

      // Slow down the lerp speed
      mesh.current.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.01);
      
      // Make the image face the camera
      mesh.current.lookAt(state.camera.position);
    }
  });

  return (
    <Image
      ref={mesh}
      url={url}
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
      onClick={(e) => {
        e.stopPropagation();
        onClick(index);
      }}
    />
  );
};

const Scene = ({ images }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const { viewport } = useThree();
  const radius = Math.min(viewport.width, viewport.height) * 0.8; // Adjust the multiplier as needed

  const handleImageClick = useCallback((index) => {
    setExpandedIndex(prevIndex => prevIndex === index ? null : index);
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {images.map((url, index) => (
        <ImageItem
          key={index}
          url={url}
          index={index}
          totalImages={images.length}
          radius={radius}
          onClick={handleImageClick}
          expandedIndex={expandedIndex}
        />
      ))}
    </>
  );
};

const ExpandableGallery = () => {
  const images = [
   '/cat.png',
   '/cat.png',
   '/cat.png',
   '/cat.png',
   '/cat.png',
   '/cat.png',
   '/cat.png',
   '/cat.png',
  ];

  return (
    <div className="w-full h-screen bg-blue-100">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Scene images={images} />
      </Canvas>
    </div>
  );
};

export default ExpandableGallery;