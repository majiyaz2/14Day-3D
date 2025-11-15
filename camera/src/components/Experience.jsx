import { CameraControls } from "@react-three/drei";
import { Environment, Gltf } from "@react-three/drei";
import { useRef } from "react";
import {button, useControls} from "leva"
import * as THREE from "three"

export const Experience = () => {
  const controls = useRef()
  const box = useRef()
  const sphere = useRef()

  useControls("dolly",{
    in: button(() => {controls.current.dolly(1, true)}),
    out: button(() => {controls.current.dolly(-1, true)})
  })

  useControls("truck",{
    up: button(() => {controls.current.truck(0, -0.5, true)}),
    left: button(() => {controls.current.truck(-0.5, 0, true)}),
    down: button(() => {controls.current.truck(0, 0.5, true)}),
    right: button(() => {controls.current.truck(0.5, 0, true)})
  })

  useControls("rotate",{
    up: button(() => {controls.current.rotate(0, -0.5, true)}),
    down: button(() => {controls.current.rotate(0, 0.5, true)}),
    left: button(() => {controls.current.rotate(-0.5, 0, true)}),
    right: button(() => {controls.current.rotate(0.5, 0, true)})
  })

  useControls("settings",{
    reset: button(() => {controls.current.reset()}),
    smoothTime: {
      min: 0, 
      max: 2, 
      step: 0.1, 
      value: 0.35,
      onChange: (value) => {controls.current.smoothTime = value}
    }
  })

  useControls("fit",{
    fitToBox: button(() => {controls.current.fitToBox(box.current, true)}),
    fitToSphere: button(() => {controls.current.fitToSphere(sphere.current, true)}),
  })  

  
  return (
    <>
      <CameraControls ref={controls} />
      <Gltf
        position={[0, 0, 0]}
        scale={5}  
        src="models/iphone17promax.glb"
        // "Apple iPhone 15 Pro Max Black" (https://skfb.ly/oLpPT) by polyman is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
      />
      <group rotation-y={Math.PI}>
        <Environment preset="city" blur />
      </group>
      <mesh ref={box}>
        <boxGeometry args={[0.5, 1, 0.2]} />
        <meshBasicMaterial color={"mediumpurple"} wireframe />
      </mesh>
      <mesh ref={sphere} >
        <sphereGeometry args={[0.4, 64]} />
        <meshBasicMaterial color={"hotpink"} wireframe />
      </mesh>
    </>
  );
};
