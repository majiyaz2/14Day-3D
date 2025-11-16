import {
  ContactShadows,
  Environment,
  Gltf,
  OrbitControls,
  PerspectiveCamera,
  Sky,
  useFBO,
  useVideoTexture,
} from "@react-three/drei";
import { Vector3 } from "three";
import { Avatar } from "./Avatar";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {useRemote} from "../hooks/useRemote"
const VECTOR_ZERO = new Vector3(0, 0, 0);

export const Experience = () => {

  const {mode} = useRemote()
  const frontCamera = useRef();
  const frontRenderTarget = useFBO()
  
  const topCamera = useRef();
  const topRenderTarget = useFBO()
  
  const cornerCamera = useRef();
  const cornerRenderTarget = useFBO()
  
  const tvMaterial = useRef()
  const videoTexture = useVideoTexture("/textures/bounce-patrick.mp4");
  
  
  useFrame(({gl, camera, scene}) => {
    topCamera.current.lookAt(VECTOR_ZERO)
    cornerCamera.current.lookAt(VECTOR_ZERO)
    frontCamera.current.lookAt(VECTOR_ZERO)
    
    tvMaterial.current.map = videoTexture
    
    let currentScreenTexture = videoTexture

    if(mode === "top"){
      currentScreenTexture = topRenderTarget.texture
      gl.setRenderTarget(topRenderTarget)
      gl.render(scene, topCamera.current)      
    }
    
    if(mode === "corner"){
      currentScreenTexture = cornerRenderTarget.texture
      gl.setRenderTarget(cornerRenderTarget)
      gl.render(scene, cornerCamera.current)      
    }
    
    if(mode === "front"){
      currentScreenTexture = frontRenderTarget.texture
      scene.traverse((node) => {
        if(node.morphTargetInfluences){
          node.morphTargetInfluences[
            node.morphTargetDictionary["mouthSmile"]
          ] = 1
          node.morphTargetInfluences[
            node.morphTargetDictionary["mouthOpen"]
          ] = 1
        }
      })
      
      gl.setRenderTarget(frontRenderTarget)
      gl.render(scene, frontCamera.current)      
    }

    gl.setRenderTarget(null)

    tvMaterial.current.map = currentScreenTexture
    scene.traverse((node) => {
        if(node.morphTargetInfluences){
          node.morphTargetInfluences[
            node.morphTargetDictionary["mouthSmile"]
          ] = 0
          node.morphTargetInfluences[
            node.morphTargetDictionary["mouthOpen"]
          ] = 0
        }
      })
  })
  
  return (
    <>
      <OrbitControls
        maxPolarAngle={Math.PI / 2}
        minDistance={2}
        maxDistance={5}
      />

      <PerspectiveCamera
        position={[0, 0, -0.3]}
        fov={50}
        near={0.1}
        ref={frontCamera}
      />
      <PerspectiveCamera
        position={[0, 2.2, 0]}
        fov={30}
        near={0.1}
        ref={topCamera}
      />
      <PerspectiveCamera
        position={[2, 1.2, 2]}
        fov={30}
        near={0.1}
        ref={cornerCamera}
      />

      <group position-y={-0.5}>
        <group>
          <Sky />
          <Avatar rotation-y={Math.PI} scale={0.45} position-z={0.34} />
          <Gltf src="models/Room.glb" scale={0.3} rotation-y={-Math.PI / 2} />
          <mesh position-x={0.055} position-y={0.48} position-z={-0.601}>
            <planeGeometry args={[0.63, 0.44]} />
            <meshBasicMaterial ref={tvMaterial} />
          </mesh>
        </group>
      </group>
      <Environment preset="sunset" />
      <ContactShadows position-y={-1} blur={2} opacity={0.42} />
    </>
  );
};
