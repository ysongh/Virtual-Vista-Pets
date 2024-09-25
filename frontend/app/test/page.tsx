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

  const speedFactor = 0.01;

  useFrame((state) => {
    const isExpanded = expandedIndex === index;
    const time = state.clock.getElapsedTime();
    
    if (isExpanded) {
      mesh.current.position.lerp(new THREE.Vector3(0, 0, 2), 0.1);
      mesh.current.scale.lerp(new THREE.Vector3(2, 2, 1), 0.1);
      mesh.current.rotation.y = 0;  // Keep expanded image facing the camera
    } else {
      const targetScale = expandedIndex !== null ? 0.5 : 1;
      mesh.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.1);

      // Generate smooth random movement using Perlin noise
      const noiseX = noise2D(time * speedFactor + offsets.x, 0) * radius * 0.5;
      const noiseY = noise2D(time * speedFactor + offsets.y, 0) * radius * 0.5;
      const noiseZ = noise2D(time * speedFactor + offsets.z, 0) * radius * 0.5;

      const targetX = noiseX * radius;
      const targetY = noiseY * radius;
      const targetZ = noiseZ * radius;

      mesh.current.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.02);
      
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
  const radius = 5;

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
    <div className="w-full h-screen bg-gray-100">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Scene images={images} />
      </Canvas>
    </div>
  );
};

export default ExpandableGallery;