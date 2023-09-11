import { useHelper } from '@react-three/drei'
import { useRef } from 'react'
import { DirectionalLightHelper } from 'three'

function Lights() {
  const lightRef = useRef<THREE.DirectionalLight>(null)
    useHelper(lightRef, DirectionalLightHelper, 5, 'white')
  return (
    <>
     <ambientLight intensity={0.2} color={'yellow'}/>
        <directionalLight ref={lightRef} intensity={2} color={'white'} position={[0,10,10]} castShadow 
        shadow-mapSize-height={1000}
        shadow-mapSize-width={1000}
        shadow-camera-left={-20}
        shadow-camera-top={20}
        shadow-camera-right={20}
        shadow-camera-bottom={-20}
        />
        {/* <hemisphereLight args={['#7cdbe6', '#5e9c49', 0.7]} /> */}
    </>
  )
}

export default Lights