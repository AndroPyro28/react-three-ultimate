import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const CameraOrbitControls = () => {
    const {camera, gl} = useThree();

    useEffect(() => {
      const controls = new OrbitControls(camera, gl.domElement); // custom hook orbit controls

      return () => controls.dispose()
    }, [camera, gl])
    return null;
  }

  export default CameraOrbitControls