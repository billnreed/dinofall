export const GameConfig = {
  entities: {
    dinosaur: {
      moveSpeed: 500,
      fallSpeed: 500,
    },
    floor: {
      moveSpeed: 300,
    }
  },
  pools: {
    floor: {
      size: 10,
    }
  },
  spawners: {
    floor: {
      delay: 2000,
    }
  }
};