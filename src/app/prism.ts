import {ExtrudeGeometry, Shape, Vector2} from "three";

export class PrismGeometry extends ExtrudeGeometry {
  constructor(vertices: Vector2[], height: any) {
    super(new Shape(vertices), {depth: height, bevelEnabled: false});
  }
}