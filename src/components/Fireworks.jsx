import { PositionalAudio } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { degToRad } from "three/src/math/MathUtils.js";
import { VFXEmitter } from "wawa-vfx";
import { useFireworks } from "../hooks/useFireworks";

export const Fireworks = () => {
  const fireworks = useFireworks((state) => state.fireworks);

  return fireworks.map((firework) => (
    <Firework key={firework.id} {...firework} />
  ));
};

const Firework = ({ velocity, delay, position, color }) => {
  const ref = useRef();
  const age = useRef(0);
  const audioRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      audioRef.current?.play();
    }, delay * 1000);
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.position.x += velocity[0] * delta;
      ref.current.position.y +=
        velocity[1] * delta + age.current * age.current * -9.0 * delta;
      ref.current.position.z += velocity[2] * delta;
      age.current += delta;
    }
  });

  return (
    <>
      <group ref={ref} position={position}>
        {/* Explosion */}
        <PositionalAudio
          url="sfxs/firecracker-corsair-4-95046.mp3"
          ref={audioRef}
          distance={20}
          loop={false}
          autoplay={false}
        />
        <VFXEmitter
          emitter="firework-particles"
          settings={{
            nbParticles: 5000,
            delay,
            spawnMode: "burst",
            colorStart: color,
            particlesLifetime: [0.1, 2],
            size: [0.01, 0.4],
            startPositionMin: [-0.1, -0.1, -0.1],
            startPositionMax: [0.1, 0.1, 0.1],
            directionMin: [-1, -1, -1],
            directionMax: [1, 1, 1],
            startRotationMin: [degToRad(-90), 0, 0],
            startRotationMax: [degToRad(90), 0, 0],
            rotationSpeedMin: [0, 0, 0],
            rotationSpeedMax: [3, 3, 3],
            speed: [1, 12],
          }}
        />

        {/* Trail */}
        <PositionalAudio
          url="sfxs/firework-whistle-190306.mp3"
          distance={20}
          loop={false}
          autoplay
        />
        <VFXEmitter
          emitter="firework-particles"
          settings={{
            duration: delay,
            nbParticles: 100 * delay,
            delay: 0,
            spawnMode: "time",
            loop: false,
            colorStart: ["white", "skyblue"],
            particlesLifetime: [0.1, 0.6],
            size: [0.01, 0.05],
            startPositionMin: [-0.02, 0, -0.02],
            startPositionMax: [0.02, 0, 0.02],
            startRotationMin: [0, 0, 0],
            startRotationMax: [0, 0, 0],
            rotationSpeedMin: [-12, -12, -12],
            rotationSpeedMax: [12, 12, 12],
            directionMin: [-1, -1, -1],
            directionMax: [1, 1, 1],
            speed: [0, 0.5],
          }}
        />
      </group>
    </>
  );
};
