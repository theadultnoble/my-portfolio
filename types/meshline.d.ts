// meshline.d.ts
import { MeshLine, MeshLineMaterial } from "three.meshline";
import { Object3DNode } from "@react-three/fiber";
import { MeshLineGeometry } from "meshline";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLine: Object3DNode<MeshLine, typeof MeshLine>;
      meshLineMaterial: Object3DNode<MeshLineMaterial, typeof MeshLineMaterial>;
      meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
    }
  }
}
