import { FloorPool } from "../pools/floor-pool";
import { Dinosaur } from "../entities/dinosaur";

export interface GameStateEntities {
  floorPool: FloorPool,
  dinosaur: Dinosaur
}