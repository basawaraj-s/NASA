import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const Earth = () => {
    const earthRef = useRef();
    const cloudsRef = useRef();
    const atmosphereRef = useRef();

    // Try to load textures, but don't fail if they don't load
    let earthAlbedo, earthBump, earthClouds, earthNightLights;

    try {
        const textures = useLoader(
            THREE.TextureLoader,
            [
                '/textures/earth_albedo.jpg',
                '/textures/earth_bump.jpg',
                '/textures/clouds_earth.png',
                '/textures/earth_night_lights_modified.png'
            ]
        );
        [earthAlbedo, earthBump, earthClouds, earthNightLights] = textures;
        console.log('✅ Textures loaded successfully');
    } catch (error) {
        console.warn('⚠️ Texture loading failed, using fallback colors:', error);
    }

    // Rotate Earth and clouds
    useFrame(() => {
        if (earthRef.current) {
            earthRef.current.rotation.y += 0.001; // Slow rotation
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y += 0.0012; // Clouds move slightly faster
        }
    });

    return (
        <group>
            {/* Main Earth sphere */}
            <mesh ref={earthRef}>
                <sphereGeometry args={[50, 128, 128]} />
                {earthAlbedo ? (
                    <meshStandardMaterial
                        map={earthAlbedo}
                        bumpMap={earthBump || null}
                        bumpScale={0.5}
                        emissiveMap={earthNightLights || null}
                        emissive={new THREE.Color('#ffdd88')}
                        emissiveIntensity={0.3}
                        roughness={0.9}
                        metalness={0.0}
                    />
                ) : (
                    <meshStandardMaterial
                        color="#2266aa"
                        roughness={0.7}
                        metalness={0.1}
                    />
                )}
            </mesh>

            {/* Cloud layer */}
            <mesh ref={cloudsRef}>
                <sphereGeometry args={[50.8, 96, 96]} />
                {earthClouds ? (
                    <meshStandardMaterial
                        map={earthClouds}
                        transparent={true}
                        opacity={0.85}
                        depthWrite={false}
                        alphaTest={0.1}
                    />
                ) : (
                    <meshStandardMaterial
                        color="#ffffff"
                        transparent={true}
                        opacity={0.2}
                        depthWrite={false}
                    />
                )}
            </mesh>

            {/* Atmosphere inner glow */}
            <mesh ref={atmosphereRef} scale={1.05}>
                <sphereGeometry args={[50, 64, 64]} />
                <meshBasicMaterial
                    color="#4488ff"
                    transparent={true}
                    opacity={0.15}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Atmosphere outer glow */}
            <mesh scale={1.12}>
                <sphereGeometry args={[50, 64, 64]} />
                <meshBasicMaterial
                    color="#6699ff"
                    transparent={true}
                    opacity={0.08}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
};

export default Earth;
