import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Stats, useTexture } from "@react-three/drei";
import Lights from "./components/Lights";
import Ground from "./components/Ground";
import { LowSakuraTreeTree, TiltTree } from "./components/Tree";

function App() {


  const testDevelopmentMode = false;
  return (
    <div className="container">
      <Canvas className="canvas" shadows>
        <Environment files={'../public/textures/evening_road_01_puresky_4k.hdr'} background="only" />
        {/* <PerspectiveCamera makeDefault position={[0,3,10]}/> */}
        {testDevelopmentMode && <Stats />}
        {testDevelopmentMode && <axesHelper args={[2]} />}
        {testDevelopmentMode && <gridHelper args={[10, 10]} />}
        <OrbitControls />
        <TiltTree position={[5,0,0]}/>
        <LowSakuraTreeTree position={[0,-0.3,0]}/>
        <Lights />
        <Ground />
        {/* <TextureSpheres /> */}
      </Canvas>
    </div>
  );
}

export default App;
