import React from 'react'

function Ground() {
  return (
    <mesh rotation-x={Math.PI * -0.5} receiveShadow >
          <planeGeometry args={[1000,1000]}/>
          <meshStandardMaterial color={'#458745'} />
        </mesh>
  )
}

export default Ground