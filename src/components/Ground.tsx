import { useTexture } from "@react-three/drei";
import React from "react";

function Ground() {
  const map = useTexture(
    "../public/textures/ground-texture2/forest_floor_diff_1k.png"
  );
  const displacementMap = useTexture(
    "../public/textures/ground-texture2/forest_floor_disp_1k.png"
  );
  const normalMap = useTexture(
    "../public/textures/ground-texture2/forest_floor_nor_gl_1k.png"
  );
  const roughnessMap = useTexture(
    "../public/textures/ground-texture2/forest_floor_rough_1k.png"
  );

  return (
    <mesh rotation-x={Math.PI * -0.5} receiveShadow>
      <planeGeometry args={[100, 100, 10, 5]} />
      <meshStandardMaterial
        //  color={"#458745"}
        map={map}
        displacementMap={displacementMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        displacementScale={0.05}
      />
    </mesh>
  );
}

export default Ground;
