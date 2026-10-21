import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeHeroSceneProps {
  theme?: 'emerald' | 'gold';
}

export function ThreeHeroScene({ theme = 'emerald' }: ThreeHeroSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGLError, setHasWebGLError] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 400;

    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let mainGroup: THREE.Group;
    let animationFrameId: number;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 8;
      camera.position.y = 0.5;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);

      mainGroup = new THREE.Group();
      scene.add(mainGroup);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);

      const primaryColor = theme === 'gold' ? 0xF7D287 : 0x00A86B;
      const secondaryColor = theme === 'gold' ? 0xD6B56D : 0x10D88B;

      const pointLight = new THREE.PointLight(primaryColor, 3, 20);
      pointLight.position.set(4, 3, 4);
      scene.add(pointLight);

      const backLight = new THREE.PointLight(secondaryColor, 2, 20);
      backLight.position.set(-4, -2, -3);
      scene.add(backLight);

      // Orbiting rings
      const ringGeometry = new THREE.TorusGeometry(2.8, 0.035, 16, 80);
      const ringMaterial = new THREE.MeshStandardMaterial({
        color: primaryColor,
        roughness: 0.2,
        metalness: 0.8,
        emissive: primaryColor,
        emissiveIntensity: 0.35,
      });
      const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
      ring1.rotation.x = Math.PI / 3;
      ring1.rotation.y = Math.PI / 6;
      mainGroup.add(ring1);

      const ringGeometry2 = new THREE.TorusGeometry(3.3, 0.02, 16, 80);
      const ringMaterial2 = new THREE.MeshStandardMaterial({
        color: theme === 'gold' ? 0x00A86B : 0xF7D287,
        roughness: 0.3,
        metalness: 0.7,
        emissive: theme === 'gold' ? 0x00A86B : 0xF7D287,
        emissiveIntensity: 0.25,
      });
      const ring2 = new THREE.Mesh(ringGeometry2, ringMaterial2);
      ring2.rotation.x = -Math.PI / 4;
      ring2.rotation.z = Math.PI / 5;
      mainGroup.add(ring2);

      // Floating particles
      const particleCount = 80;
      const particleGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 8;
        positions[i + 1] = (Math.random() - 0.5) * 8;
        positions[i + 2] = (Math.random() - 0.5) * 6;
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particleMaterial = new THREE.PointsMaterial({
        color: primaryColor,
        size: 0.06,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      });
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      mainGroup.add(particles);

      // Central pedestal
      const pedestalGeo = new THREE.CylinderGeometry(1.6, 1.9, 0.35, 32);
      const pedestalMat = new THREE.MeshStandardMaterial({
        color: 0x081C12,
        roughness: 0.3,
        metalness: 0.6,
      });
      const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
      pedestal.position.y = -1.6;
      mainGroup.add(pedestal);

      const rimGeo = new THREE.TorusGeometry(1.7, 0.04, 16, 48);
      const rimMat = new THREE.MeshStandardMaterial({
        color: primaryColor,
        metalness: 0.9,
        roughness: 0.2,
        emissive: primaryColor,
        emissiveIntensity: 0.6,
      });
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.rotation.x = Math.PI / 2;
      rim.position.y = -1.4;
      mainGroup.add(rim);

      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;

      const handleMouseMove = (event: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
        targetX = x * 0.35;
        targetY = y * 0.25;
      };

      window.addEventListener('mousemove', handleMouseMove);

      const handleResize = () => {
        if (!container || !camera || !renderer) return;
        const newW = container.clientWidth;
        const newH = container.clientHeight;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      };

      window.addEventListener('resize', handleResize);

      const clock = new THREE.Clock();

      const animate = () => {
        const elapsedTime = clock.getElapsedTime();

        if (!prefersReducedMotion) {
          ring1.rotation.y = elapsedTime * 0.2;
          ring1.rotation.x = Math.PI / 3 + Math.sin(elapsedTime * 0.5) * 0.08;

          ring2.rotation.z = -elapsedTime * 0.22;
          ring2.rotation.x = -Math.PI / 4 + Math.cos(elapsedTime * 0.4) * 0.06;

          particles.rotation.y = elapsedTime * 0.04;

          currentX += (targetX - currentX) * 0.05;
          currentY += (targetY - currentY) * 0.05;

          mainGroup.rotation.y = currentX;
          mainGroup.rotation.x = -currentY;
        }

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);

        ringGeometry.dispose();
        ringMaterial.dispose();
        ringGeometry2.dispose();
        ringMaterial2.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
        pedestalGeo.dispose();
        pedestalMat.dispose();
        rimGeo.dispose();
        rimMat.dispose();
        renderer.dispose();

        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch (err) {
      console.warn('WebGL init skipped, falling back to CSS glowing atmosphere', err);
      setHasWebGLError(true);
    }
  }, [theme]);

  if (hasWebGLError) {
    return (
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden flex items-center justify-center">
        <div className={`w-[500px] h-[500px] rounded-full blur-[100px] opacity-25 animate-pulse ${theme === 'gold' ? 'bg-[#F7D287]' : 'bg-[#00A86B]'}`} />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
