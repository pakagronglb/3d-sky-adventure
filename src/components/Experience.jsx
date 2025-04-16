import {
  CameraControls,
  Cloud,
  Clouds,
  Float,
  Gltf,
  Stars,
  Stats,
} from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import { MeshBasicMaterial } from "three";
import { VFXParticles } from "wawa-vfx";
import { useFireworks } from "../hooks/useFireworks";
import { Fireworks } from "./Fireworks";
import { GradientSky } from "./GradientSky";

export const Experience = () => {
  const controls = useRef();

  useEffect(() => {
    controls.current.setLookAt(0, 15, 10, 0, 25, 0);
    controls.current.setLookAt(12, 8, 26, 4, 0, 0, true);
  }, []);

  const fireworks = useFireworks((state) => state.fireworks);
  useEffect(() => {
    if (fireworks.length) {
      controls.current.setLookAt(0, 12, 42, 0, 0, 0, true);
    } else {
      controls.current.setLookAt(12, 8, 26, 4, 0, 0, true);
    }
  }, [fireworks]);

  const { cloud1Color, cloud2Color, cloud3Color } = useControls("Clouds ☁️", {
    cloud1Color: "#54496c",
    cloud2Color: "orange",
    cloud3Color: "#9d7796",
  });

  return (
    <>
      <Stats />
      <CameraControls ref={controls} />
      <directionalLight
        position={[1, 0.5, -10]}
        intensity={2}
        color="#ffe7ba"
      />

      <Clouds material={MeshBasicMaterial}>
        <Cloud
          position-z={0}
          position-y={-5}
          seed={2}
          scale={2}
          volume={8}
          color={cloud1Color}
          fade={1000}
        />
        <Cloud
          position-x={12}
          position-z={-10}
          seed={1}
          scale={2}
          volume={6}
          color={cloud2Color}
          fade={800}
        />
        <Cloud
          position-x={-8}
          position-z={10}
          seed={5}
          scale={1}
          volume={12}
          color={cloud3Color}
          fade={100}
        />
      </Clouds>

      <Stars fade speed={3} count={2000} />
      <GradientSky />

      <Float
        speed={0.6}
        rotationIntensity={2}
        position-x={4}
        floatIntensity={2}
      >
        <Fireworks />
        <Gltf src="/models/SkyIsland.glb" />
      </Float>

      <VFXParticles
        name="firework-particles"
        settings={{
          nbParticles: 100000,
          gravity: [0, -9.8, 0],
          renderMode: "billboard",
          intensity: 3,
        }}
      />

      <EffectComposer>
        <Bloom intensity={1.2} luminanceThreshold={1} mipmapBlur />
      </EffectComposer>
    </>
  );
};
