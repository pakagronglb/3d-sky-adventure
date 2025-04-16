import { randFloat, randInt } from "three/src/math/MathUtils.js";
import { create } from "zustand";

const themeColors = {
  classic: [
    ["skyblue", "pink"],
    ["orange", "yellow"],
    ["green", "teal"],
    ["mediumpurple", "indigo"],
    ["#ff9fed", "#e885ff", "#ff85b2", "#d69eff"],
  ],
  love: [
    ["red"],
    ["red", "fuchsia"],
    ["red", "pink"],
    ["pink"],
    ["fuchsia", "yellow"],
  ],
  sea: [
    ["skyblue", "white"],
    ["deepskyblue", "skyblue"],
    ["aquamarine", "mediumaquamarine"],
    ["#368bff"],
  ],
};

const SPAWN_OFFSET = 0.2;

const spawns = [
  [1.004, -0.001 + SPAWN_OFFSET, 3.284],
  [-2.122, -0.001 + SPAWN_OFFSET, 2.678],
  [-0.988, -0.001 + SPAWN_OFFSET, 3.287],
  [2.888, -0.001 + SPAWN_OFFSET, 1.875],
  [2.115, -0.001 + SPAWN_OFFSET, 2.684],
];

const useFireworks = create((set) => {
  return {
    fireworks: [],
    addFirework: (firework) => {
      set((state) => {
        const colors = themeColors[firework.theme];
        return {
          fireworks: [
            ...state.fireworks,
            {
              id: `${Date.now()}-${randInt(0, 100)}-${state.fireworks.length}`,
              position: spawns[randInt(0, spawns.length - 1)],
              velocity: [randFloat(-8, 8), randFloat(5, 10), randFloat(-8, 8)],
              delay: randFloat(0.8, 2),
              color: colors[randInt(0, colors.length - 1)],
              time: Date.now(),
            },
          ],
        };
      });
      setTimeout(() => {
        set((state) => ({
          fireworks: state.fireworks.filter(
            (firework) => Date.now() - firework.time < 4000 // Max delay of 2 seconds +  Max lifetime of particles of 2 seconds
          ),
        }));
      }, 4000);
    },
  };
});

export { useFireworks };
