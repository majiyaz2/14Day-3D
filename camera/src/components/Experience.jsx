import { CameraControls } from "@react-three/drei";
import { Environment, Gltf } from "@react-three/drei";
import { useRef } from "react";
import {button, useControls} from "leva"
import * as THREE from "three"
import { degToRad } from "three/src/math/MathUtils.js";
import { useEffect } from "react";
import { sections } from "./UI";
import { useState } from "react";

export const Experience = ({section}) => {
  const controls = useRef()
  const box = useRef()
  const sphere = useRef()
  const [isInit, setIsInit] = useState(false)

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
  
  useControls("Helper", {
    getLookAt: button(() => {
      const position = controls.current.getPosition()
      const target = controls.current.getTarget()
      const positionArray = [...position, ...target]
      console.log(positionArray)
      // paste the position to the clipboard
      navigator.clipboard.writeText(JSON.stringify(positionArray))
      
    })
  })

  const cameraPositions = {
    intro: [
    -1.1422336853949702,
    -1.0395651187178276,
    1.2491512263629012,
    0.08624609435243494,
    0.015001006483064036,
    0.07495885782589522
],
    titanium: [
    0.16184765364550557,
    -0.9426708713671603,
    0.6238447121585883,
    2.6020852139652106e-18,
    0,
    -1.249000902703301e-16
],
    camera: [
    -0.8517821664163588,
    -0.45451834782724254,
    -1.472714571411691,
    2.6020852139652106e-18,
    0,
    -1.249000902703301e-16
],
    "action-button": [
    0.3103368078229888,
    -0.11632974754077707,
    -0.1009925066009875,
    -0.03055263011638721,
    0.4981142167933199,
    0.0005141969276344199
],
    chip: [0, 0, 7, 0, 0, 0],
    display: [0, 0, 2, 0, 0, 0],
    battery: [0, 0, 1, 0, 0, 0],
  }

  const intro = async () => {
   controls.current.setLookAt(0, 0, 5, 0, 0, 0, false)
   await controls.current.dolly(3, true);
   await controls.current.rotate(degToRad(45), degToRad(25), true) 
   setIsInit(true)
   playTransition()
  }

  const playTransition =  () => {
    controls.current.setLookAt(...cameraPositions[sections[section]], true)
  }

  useEffect(() => {
    intro()
  },[])

  useEffect(() => {
    if(isInit){
      playTransition()
    }
  }, [section])
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
        <Environment preset="city"  />
      </group>
      <mesh ref={box} visible={false}>
        <boxGeometry args={[0.5, 1, 0.2]} />
        <meshBasicMaterial color={"mediumpurple"} wireframe />
      </mesh>
      <mesh ref={sphere} visible={false} >
        <sphereGeometry args={[0.4, 64]} />
        <meshBasicMaterial color={"hotpink"} wireframe />
      </mesh>
    </>
  );
};
