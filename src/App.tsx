import { Canvas } from "@react-three/fiber";
import AnimatedBox from "./components/AnimatedBox";
import { OrbitControls, Stats, useTexture } from "@react-three/drei";

function App() {

  const TextureSpheres = () => {
    const map = useTexture("../public/textures/metal_plate_diff_1k.png");
    const displacementMap = useTexture("../public/textures/metal_plate_disp_1k.png");
    const normalMap = useTexture("../public/textures/metal_plate_nor_gl_1k.png");
    const roughnessMap = useTexture("../public/textures/metal_plate_rough_1k.png");

    return (
      <>
        <mesh scale={[0.5, 0.5, 0.5]} position={[-1, 0, 0]}>
          <sphereGeometry />
          <meshStandardMaterial map={map} />
        </mesh>

        <mesh scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]}>
          <sphereGeometry />
          <meshStandardMaterial map={map} normalMap={normalMap} roughnessMap={roughnessMap} />
        </mesh>

        <mesh scale={[0.5, 0.5, 0.5]} position={[1, 0, 0]}>
          <sphereGeometry args={[1,200,200]}/>
          <meshStandardMaterial map={map} normalMap={normalMap} roughnessMap={roughnessMap} displacementMap={displacementMap} displacementScale={0.05} />
        </mesh>
      </>
    );
  };

  const testDevelopmentMode = true;
  return (
    <div className="container">
      <Canvas className="canvas">
        {/* <PerspectiveCamera makeDefault position={[0,5,10]}/> */}
        {testDevelopmentMode && <Stats />}
        {testDevelopmentMode && <axesHelper args={[2]} />}
        {testDevelopmentMode && <gridHelper args={[10, 10]} />}
        <OrbitControls />
        <ambientLight intensity={0.3} />
        <directionalLight color={"white"} position={[0, 5, 5]} />
        {/* <AnimatedBox testMode={testDevelopmentMode} /> */}
        <TextureSpheres />
      </Canvas>
    </div>
  );
}

export default App;
