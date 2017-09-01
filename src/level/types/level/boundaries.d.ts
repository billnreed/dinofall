import { Boundary } from "../../entities/boundary";

export interface LevelStateBoundaries {
  left: Boundary,
  right: Boundary,
  top: Boundary,
  bottom: Boundary,
}