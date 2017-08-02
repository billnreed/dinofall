import { Floors } from "../entities/floors";
import { Dinosaur } from "../entities/dinosaur";

export interface GameStateEntities {
  floors: Floors,
  dinosaur: Dinosaur
}