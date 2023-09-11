import { useHelper } from '@react-three/drei'
import { useRef } from 'react'
import { DirectionalLightHelper } from 'three'

function Lights() {
  const lightRef1 = useRef<THREE.DirectionalLight>(null)
  const lightRef2 = useRef<THREE.DirectionalLight>(null)
    // useHelper(lightRef1, DirectionalLightHelper, 5, 'red')
    // useHelper(lightRef2, DirectionalLightHelper, 5, 'white')
  return (
    <>
     <ambientLight intensity={1} color={'black'}/>
        <directionalLight ref={lightRef1} intensity={5} color={'white'} position={[-50,50,0]} castShadow 
        shadow-mapSize-height={1000}
        shadow-mapSize-width={1000}
        shadow-camera-left={-100}
        shadow-camera-top={100}
        shadow-camera-right={100}
        shadow-camera-bottom={-100}
        />

    <directionalLight ref={lightRef2} intensity={5} color={'white'} position={[0,50,50]} castShadow 
        shadow-mapSize-height={1000}
        shadow-mapSize-width={1000}
        shadow-camera-left={-100}
        shadow-camera-top={100}
        shadow-camera-right={100}
        shadow-camera-bottom={-100}
        />
        {/* <hemisphereLight args={['#7cdbe6', '#5e9c49', 0.7]} /> */}
    </>
  )
}

export default Lights