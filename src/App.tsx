import { Canvas } from "@react-three/fiber";
import AnimatedBox from "./components/AnimatedBox";
import { OrbitControls, Stats, useTexture } from "@react-three/drei";
import Lights from "./components/Lights";
import Ground from "./components/Ground";

function App() {
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

  const testDevelopmentMode = true;
  return (
    <div className="container">
      <Canvas className="canvas" shadows>
        {/* <PerspectiveCamera makeDefault position={[0,3,10]}/> */}
        {testDevelopmentMode && <Stats />}
        {testDevelopmentMode && <axesHelper args={[2]} />}
        {testDevelopmentMode && <gridHelper args={[10, 10]} />}
        <OrbitControls />
        <Lights />
        <Ground />
        <TextureSpheres />
      </Canvas>
    </div>
  );
}

export default App;
