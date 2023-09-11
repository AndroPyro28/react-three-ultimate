import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import  { useEffect, useRef } from "react";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useInput } from "../hooks/useInput";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const walkDirection = new THREE.Vector3();
const rotateAngle = new THREE.Vector3(0,1,0);
const rotateQuaternion = new THREE.Quaternion();
const cameraTarget = new THREE.Vector3();

const directionOffset = ({forward, backward, left, right}: {forward: boolean, backward:boolean, left:boolean, right:boolean }) => {

  let directionOffsetVar = 0 // w
  // controls direction
  if(forward) {
    if(left) {
      directionOffsetVar = Math.PI / 4;  // w + a
    } else if(right) {
      directionOffsetVar = -Math.PI / 4;  // w + d
    }
  } 
  
  else if(backward) {
    if(left) {
      directionOffsetVar = Math.PI / 4 + Math.PI / 2;  // s + a
    } else if(right) {
      directionOffsetVar = -Math.PI / 4 - Math.PI / 2; // s + d
    } else {
      directionOffsetVar = Math.PI // s
    }
  } 

  else if (left) {
    directionOffsetVar = Math.PI / 2; // a
  } 

  else if (right) {
    directionOffsetVar = -Math.PI / 2; // d
  }

  return directionOffsetVar
}

function Character() {
  const { animations, scene } = useGLTF("../public/models/aatrox2.glb") as GLTF;
  const { actions } = useAnimations(animations, scene);

  const { forward, backward, left, right, jump, shift } = useInput();

  scene.traverse((object) => {
    if ("isMesh" in object && object.isMesh) {
      object.castShadow = true;
    }
  });

  const currentAction = useRef("");
  const controlRef = useRef<typeof OrbitControls>()

  const {camera} = useThree(state => state)

  const updateCameraTarget =(moveX:number, moveZ:number) => {
    camera.position.x += moveX / 3;
    camera.position.z += moveZ / 3;

    cameraTarget.x = scene.position.x
    cameraTarget.y = scene.position.y + 2
    cameraTarget.z = scene.position.z

    if(controlRef.current) controlRef.current.target = cameraTarget
  }
  const anmExt = "anm";

  useEffect(() => {
    let action = "";

    if (forward || backward || left || right) {
      action = `aatrox_passive_run.${anmExt}`; // walking
      if (shift) {
        action = `aatrox_ult_run.${anmExt}`; // runnung
      }
    } else if (jump) {
      action = `aatrox_passive_attack.${anmExt}`; // jumping / attacking
    } else {
      action = `aatrox_passive_idle.${anmExt}`; // idle
    }

    if (currentAction.current != action) {
      const nextActionToPlay = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.2);
      nextActionToPlay?.reset().fadeIn(0.2).play();
      currentAction.current = action;
    }
  }, [forward, backward, left, right, jump, shift]);

  useFrame((state, delta) => {
    if(currentAction.current == `aatrox_passive_run.${anmExt}` || currentAction.current == `aatrox_ult_run.${anmExt}`) {
      // scene.position.x += 2;

      let angleYCameraDirection = Math.atan2(camera.position.x - scene.position.x, camera.position.z - scene.position.z)

      let newDirectionOffset = directionOffset({
        forward,
        backward,
        left,
        right
      })

      // rotate model

      rotateQuaternion.setFromAxisAngle(rotateAngle, angleYCameraDirection + newDirectionOffset);
      scene.quaternion.rotateTowards(rotateQuaternion, 0.2)

      //calculate direction

      camera.getWorldDirection(walkDirection)
      walkDirection.y = 0;
      // walkDirection.normalize()
      walkDirection.applyAxisAngle(rotateAngle,newDirectionOffset)

      // if running or walking
      const charVelocity = currentAction.current === `aatrox_ult_run.${anmExt}` ? 20 : 15;

      //move model & camera
      const moveX = walkDirection.x * charVelocity * delta;
      const moveZ = walkDirection.z * charVelocity * delta;
      scene.position.x += moveX * 20;
      scene.position.z += moveZ * 20;

       updateCameraTarget(moveX, moveZ)
    }

  })

  return (
    <>
    {/* <OrbitControls ref={controlRef} /> */}
    <object3D position={[-5, 0.2, 15]} scale={0.02} castShadow>
      <primitive object={scene} />
    </object3D>
    </>
  );
}

export default Character;
