"use client";

import React, { useRef, useMemo, useEffect, Suspense } from 'react'
import { useRouter } from "next/navigation"
import dynamic from 'next/dynamic'
import * as THREE from 'three'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const DynamicCanvas = dynamic(() => import('@react-three/fiber').then((mod) => mod.Canvas), {
  ssr: false,
})

function ImageParticles({ count = 1000 }) {
  const mesh = useRef()
  const texture = useLoader(TextureLoader, '/cat.png')

  const particles = useMemo(() => {
    const temp = new Float32Array(count * 16)
    for (let i = 0; i < count; i++) {
      const i16 = i * 16
      const matrix = new THREE.Matrix4()
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      )
      const rotation = new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0
      )
      const scale = Math.random() * 0.5 + 0.1
      matrix.compose(position, new THREE.Quaternion().setFromEuler(rotation), new THREE.Vector3(scale, scale, scale))
      temp.set(matrix.elements, i16)
    }
    return temp
  }, [count])

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.01
      mesh.current.rotation.y += delta * 0.01
    }
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent />
      <instancedBufferAttribute
        attach="instanceMatrix"
        args={[particles, 16]}
      />
    </instancedMesh>
  )
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#43a4e0']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <ImageParticles />
      </Suspense>
    </>
  )
}

export default function LandingPage() {
  const router = useRouter();
  const { address } = useWeb3ModalAccount();

  useEffect(() => {
    if (address) {
      router.push("/pet/profile");
    }
  }, [address]);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'fixed', width: '100%', height: '100%' }}>
        <DynamicCanvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </DynamicCanvas>
      </div>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        color: 'white',
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        <main className="container mx-auto p-6">
          <section id="hero" className="text-center py-20">
            <h2 className="text-5xl font-bold mb-4">Capture the Magic of Digital Companions</h2>
            <p className="text-xl mb-8">Raise, train, and photograph your unique blockchain pets in stunning virtual landscapes!</p>
            <center>
              <w3m-button />
            </center>
          </section>

          <section id="about" className="py-20">
            <h2 className="text-3xl font-bold mb-6">About Virtual Vista Pets</h2>
            <p className="text-lg mb-4">Virtual Vista Pets is an innovative on-chain game that combines the joy of raising virtual pets with the excitement of blockchain technology and photography.</p>
            <p className="text-lg">Create unique pets, train them in stunning digital vistas, and capture their growth through beautiful snapshots - all secured on the blockchain!</p>
          </section>

          <section id="features" className="py-20">
            <h2 className="text-3xl font-bold mb-6">Key Features</h2>
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>Unique, blockchain-verified pets</li>
              <li>Stunning virtual landscapes to explore</li>
              <li>In-game photography feature</li>
              <li>Train and evolve your pets</li>
              <li>Trade pets and photos as NFTs</li>
              <li>Engage in pet battles and competitions</li>
            </ul>
          </section>

          <section id="signup" className="py-20 text-center">
            <h2 className="text-3xl font-bold mb-6">Join the Virtual Vista Pets Community</h2>
            <form className="max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="w-full p-2 mb-4 rounded text-purple-900" required />
              <button type="submit" className="bg-yellow-400 text-purple-900 py-2 px-6 rounded-full text-lg font-semibold hover:bg-yellow-300">
                Sign Up for Updates
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  )
}