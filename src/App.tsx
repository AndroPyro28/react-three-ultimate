import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, PerspectiveCamera, Stats, useTexture } from "@react-three/drei";
import Lights from "./components/Lights";
import {Ground} from "./components/Ground2";
import { Trees } from "./components/Tree";
import Character from "./components/Character";

function App() {

  const testDevelopmentMode = false;

  return (
    <div className="container">
      <Canvas className="canvas" shadows>
        <Environment files={'../public/textures/evening_road_01_puresky_4k.hdr'} background="only" />
        <PerspectiveCamera makeDefault position={[-5,6,25]}/>
        {testDevelopmentMode && <Stats />}
        {testDevelopmentMode && <axesHelper args={[2]} />}
        {testDevelopmentMode && <gridHelper args={[10, 10]} />}
        {/* <OrbitControls  /> */}
        <Trees boundary={140} count={30} />
        <Lights />
        <Ground />
        <Character />
        {/* <TextureSpheres /> */}
      </Canvas>
    </div>
  );
}

export default App;
