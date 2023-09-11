import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { useEffect, useState } from "react";

type Props = {
  boundary: number;
  count: number;
};

type TreeType = {
  position: {
    x: number;
    z: number;
  };
  box: number;
};

export const Trees: React.FC<Props> = ({ count, boundary }) => {
  const { scene } = useGLTF(
    "../public/models/free_low_poly_sakura_tree.glb"
  ) as GLTF;

  const [trees, setTrees] = useState<TreeType[]>();

  const boxIntersect = (minAx:number, minAz:number,maxAx:number, maxAz: number, minBx:number, minBz: number, maxBx:number, maxBz:number) => {

    let aLeftOfB = maxAx< minBx;
    let aRightOfB = minAx > maxBx;
    let aAboveB = minAz > maxBz;
    let aBelowB = maxAz< minBz;

    return !(aLeftOfB || aRightOfB || aAboveB || aBelowB)
  }

  const isOverlapping = (index: number, tree: any, trees: any[]) => {
    const minTargetX = tree.position.x - tree.box / 2;
    const maxTargetX = tree.position.x + tree.box / 2;
    const minTargetZ = tree.position.z - tree.box / 2;
    const maxTargetZ = tree.position.z + tree.box / 2;

    for (let i = 0; i < index; i++) {
      let minChildX = trees[i].position.x - trees[i].box / 2;
      let maxChildX = trees[i].position.x + trees[i].box / 2;
      let minChildZ = trees[i].position.z - trees[i].box / 2;
      let maxChildZ = trees[i].position.z + trees[i].box / 2;

      if (
        boxIntersect(
          minTargetX,
          minTargetZ,
          maxTargetX,
          maxTargetZ,
          minChildX,
          minChildZ,
          maxChildX,
          maxChildZ
        )
      ) {
        return true
      }
    }
    return false
  };

  scene.traverse((object) => {
    if ("isMesh" in object && object.isMesh) {
      object.castShadow = true;
    }
  });

  const newPosition = (box: number, boundary: number) => {
    return (
      boundary / 2 -
      box / 2 -
      (boundary - box) * (Math.round(Math.random() * 100) / 100)
    );
  };

  const updatePosition = (treeArray: TreeType[], boundary: number) => {
    treeArray.forEach((tree, index) => {
      do {
        tree.position.x = newPosition(tree.box, boundary);
      tree.position.z = newPosition(tree.box, boundary);
      } while (isOverlapping(index,  tree, treeArray));
      
    });
    setTrees(treeArray);
  };

  useEffect(() => {
    const tempTree: TreeType[] = [];
    for (let i = 0; i < count; i++) {
      tempTree.push({
        position: {
          x: 0,
          z: 0,
        },
        box: 1,
      });
    }
    updatePosition(tempTree, boundary);
  }, [boundary, count]);

  return (
    <group>
      {trees?.map((tree, index) => {
        const { x, z } = tree.position;
        return (
          <object3D key={index} position={[x, -0.3, z]} scale={2}>
            <mesh scale={tree.box}>
              <boxGeometry />
              <meshBasicMaterial color={"blue"} wireframe />
            </mesh>
            <primitive object={scene.clone()}></primitive>
          </object3D>
        );
      })}
    </group>
  );
};

// export function TiltTree() {
//     const tiltTree = useGLTF('../public/models/tilt_tree.glb');
//     tiltTree.scene.traverse((object) => {
//         if('isMesh' in object && object.isMesh) {
//             object.castShadow = true
//         }
//     })
//     return (
//       <group rotation={[0,4,0]}>
//         <primitive object={tiltTree.scene.clone()}></primitive>
//       </group>
//     );
// }

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: bedo.waves (https://sketchfab.com/bedo.waves)
License: CC-BY-SA-4.0 (http://creativecommons.org/licenses/by-sa/4.0/)
Source: https://sketchfab.com/3d-models/tilt-tree-a3b1c7d1b2c84e3e80fd2d495b275345
Title: Tilt Tree
*/

// export function LowSakuraTreeTree(props: JSX.IntrinsicElements["group"]) {
//   const { nodes, materials } = useGLTF(
//     "../public/models/free_low_poly_sakura_tree.glb"
//   ) as GLTFResultLowSakuraTreeTree;
//   return (
//     <group {...props} dispose={null}>
//       <group rotation={[-Math.PI / 2, 0, 0]}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_2.geometry}
//           material={materials["Material.001"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_3.geometry}
//           material={materials["Material.002"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_4.geometry}
//           material={materials["Material.003"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_5.geometry}
//           material={materials["Material.004"]}
//         />
//       </group>
//     </group>
//   );
// }

// useGLTF.preload("../public/models/free_low_poly_sakura_tree.glb");

// type GLTFResultTiltTree = GLTF & {
//   nodes: {
//     Object_4: THREE.Mesh;
//     Object_6: THREE.Mesh;
//     Object_9: THREE.Mesh;
//     Object_11: THREE.Mesh;
//   };
//   materials: {
//     brush_MatteHull: THREE.MeshStandardMaterial;
//     brush_Spikes: THREE.MeshStandardMaterial;
//   };
// };

// export function TiltTree(props: JSX.IntrinsicElements["group"]) {
//   const { nodes, materials } = useGLTF("../public/models/tilt_tree.glb") as GLTFResultTiltTree;
//   return (
//     <group {...props} dispose={null}>
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_4.geometry}
//         material={materials.brush_MatteHull}
//         // material-color={'yellow'}

//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_6.geometry}
//         material={materials.brush_Spikes}
//         // material-color={'red'}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_9.geometry}
//         material={materials.brush_Spikes}
//         // to change material color of the mesh
//         // material-color={'blue'}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_11.geometry}
//         material={materials.brush_MatteHull}
//         // material-color={'pink'}

//       />
//     </group>
//   );
// }

// useGLTF.preload("../public/models/tilt_tree.glb");
