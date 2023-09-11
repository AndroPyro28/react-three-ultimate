import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
  };
  materials: {
    palette: THREE.MeshStandardMaterial;
  };
};

export function Ground(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("../public/models/sakura.glb") as GLTFResult;
  return (
    <group {...props} dispose={null} scale={10} position={[0,-9.7,0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.palette}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.991}
      />
    </group>
  );
}

useGLTF.preload("/sakura.glb");