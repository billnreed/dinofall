import { Boundary } from "../../../entities/boundary";

export interface GameStateBoundaries {
  left: Boundary,
  right: Boundary,
  top: Boundary,
  bottom: Boundary,
}