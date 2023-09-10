import { useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BoxHelper } from "three";

type AnimatedBoxProps = {
  testMode: boolean;
}

const AnimatedBox: React.FC<AnimatedBoxProps> = ({testMode}) => {
    const meshRef = useRef<THREE.Mesh>(null)
    {testMode && useHelper(meshRef,BoxHelper,'blue')}
    useFrame(() => {
      if(meshRef.current) {
        meshRef.current.rotation.x += 0.01;
      }
    })
    return <mesh ref={meshRef} scale={[0.5,0.5,0.5]}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  }

  export default AnimatedBox