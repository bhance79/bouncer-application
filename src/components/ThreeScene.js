import React, { useEffect } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeScene = () => {
  useEffect(() => {
    let camera, scene, renderer, group;

    // Initialize the scene
    init();
    // Start the animation loop
    animate();

    function init() {
      // Create a container element for the scene
      const container = document.createElement('div');
      document.getElementById('three-scene').appendChild(container);

      // Initialize the scene
      scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0xffffff, 5, 100); // Add fog to the scene

      // Initialize the camera
      camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.set(0, 0, 20); // Set camera position
      scene.add(camera);

      // Add ambient light
      scene.add(new THREE.AmbientLight(0xaaaaaa, 3));

      // Add directional light
      const light = new THREE.DirectionalLight(0xf0f6ff, 4.5);
      light.position.set(2, 8, 4);
      light.castShadow = true;
      light.shadow.mapSize.width = 1024;
      light.shadow.mapSize.height = 1024;
      light.shadow.camera.far = 20;
      scene.add(light);

      // Remove helper for light's shadow camera
      // scene.add(new THREE.CameraHelper(light.shadow.camera));

      // Create a group to hold the spheres
      group = new THREE.Group();
      scene.add(group);

      // Create spheres and add them to the group
      const geometry = new THREE.SphereGeometry(0.3, 20, 20);
      const sphereCount = 20; // Number of spheres
      const spacing = 20; // Spacing between spheres
      for (let i = 0; i < sphereCount; i++) {
        const material = new THREE.MeshPhongMaterial({ color: Math.random() * 0xffffff });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.x = (i - sphereCount / 2) * spacing; // Spread spheres along the x-axis
        sphere.position.z = Math.random() - 0.1;
        sphere.position.normalize();
        sphere.position.multiplyScalar(Math.random() * 2 + 1);
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        sphere.userData.phase = Math.random() * Math.PI; // Store random phase for animation
        group.add(sphere);
      }

      // Create and add the ground
      const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x898989 });
      const ground = new THREE.Mesh(new THREE.PlaneGeometry(20000, 20000, 8, 8), groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      scene.add(ground);


        // Load the font and create 3D text with custom letter spacing
        const fontLoader = new FontLoader();
        fontLoader.load('/fonts/helvetiker_bold.typeface.json', (font) => {
            const textMaterial = new THREE.MeshPhongMaterial({ color: 0x663399 });
    
            // Function to create each letter with custom spacing
            const createLetter = (char, xOffset) => {
            const textGeometry = new TextGeometry(char, {
                font: font,
                size: 1.5,
                height: 1,
                curveSegments: 15,
                bevelEnabled: true,
                bevelThickness: 0.1,
                bevelSize: 0.2,
                bevelOffset: 0,
                bevelSegments: 5
            });
    
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.set(xOffset, 1, 0); // Adjust the position as needed
            textMesh.castShadow = true;
            textMesh.receiveShadow = true;
            scene.add(textMesh);
            };
    
            // Create each letter of "BOUNCER" with custom spacing
            const text = "BOUNCER";
            let xOffset = -6.5;
            const letterSpacing = 2; // Adjust this value to change the spacing
    
            for (let i = 0; i < text.length; i++) {
            createLetter(text[i], xOffset);
            xOffset += letterSpacing;
            }
        });

      // Initialize the renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(scene.fog.color);
      container.appendChild(renderer.domElement);
      renderer.shadowMap.enabled = true;

      // Initialize the orbit controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.maxPolarAngle = Math.PI * 0.5; // Limit the vertical angle of the camera
      controls.minDistance = 10; // Set the minimum zoom distance
      controls.maxDistance = 75; // Set the maximum zoom distance
      controls.target.set(0, 2.5, 0); // Set the target position for the controls
      controls.update();

      // Handle window resize events
      window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize() {
      // Update camera aspect ratio and renderer size on window resize
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      // Animation loop
      const time = performance.now() / 1000;
      // Update the position of each sphere
      group.traverse((child) => {
        if ('phase' in child.userData) {
          child.position.y = Math.abs(Math.sin(time + child.userData.phase)) * 4 + 0.3;
        }
      });
      // Render the scene from the perspective of the camera
      renderer.render(scene, camera);
      // Request the next frame
      requestAnimationFrame(animate);
    }

    // Cleanup function to remove event listeners and dispose of the renderer
    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return <div id="three-scene" className="w-full h-screen" />;
};

export default ThreeScene;
