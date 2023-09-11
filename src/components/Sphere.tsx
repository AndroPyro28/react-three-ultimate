import { useTexture } from "@react-three/drei";

const TextureSpheres = () => {
    const map = useTexture("../public/textures/metal_plate_diff_1k.png");
    // const displacementMap = useTexture("../public/textures/metal_plate_disp_1k.png");
    const normalMap = useTexture(
      "../public/textures/metal_plate_nor_gl_1k.png"
    );
    const roughnessMap = useTexture(
      "../public/textures/metal_plate_rough_1k.png"
    );

    return (
      <>
        <mesh scale={[0.5, 0.5, 0.5]} position={[0, 1, 0]} castShadow>
          <sphereGeometry />
          <meshStandardMaterial
            map={map}
            normalMap={normalMap}
            roughnessMap={roughnessMap}
          />
        </mesh>
      </>
    );
  };
 
  export default TextureSpheres