export const GameConfig = {
  entities: {
    dinosaur: {
      moveSpeed: 400,
      fallSpeed: 500,
    },
    floor: {
      moveSpeed: 400,
    }
  },
  pools: {
    floor: {
      size: 10,
    }
  },
  spawners: {
    floor: {
      delay: 1000,
    }
  }
};