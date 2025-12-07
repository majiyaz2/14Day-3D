import { Center, Environment, Float, MeshDistortMaterial, RoundedBox, useScroll } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useRef } from "react";
import { SectionTitle } from "./SectionTitle";
import { useFrame } from "@react-three/fiber";
import { Star } from "./Star";
import { MacBookPro } from "./MacBookPro";
import { PalmTree } from "./PalmTree";
import { BookCase } from "./BookCase";
import { CouchSmall } from "./CouchSmall";
import { Lamp } from "./Lamp"
import { Monitor } from "./Monitor"

import * as THREE from "three"
import { config } from "../config";

const SECTIONS_DISTANCE = 10

export const Experience = () => {
  const sceneContainer = useRef()
  const scrollData = useScroll()

  useFrame(() => {
    sceneContainer.current.position.z = -scrollData.offset * SECTIONS_DISTANCE * (scrollData.pages - 1)
  })
  return (
    <>
      <Environment preset="sunset" />
      <Avatar />

      <group ref={sceneContainer}>
        {/* Home */}
        <group>
          <Star position-z={0} position-y={2.2} scale={0.3}/>
          <Float floatIntensity={2} speed={2}>
            <MacBookPro
              position={[-1, 0.5, 0]}
              scale={0.3}
              rotation={[0, Math.PI / 4, 0]}
            />
          </Float>
          <PalmTree 
            position={[4, 0, -5]}
            scale={0.018}
            rotation-y={THREE.MathUtils.degToRad(140)}
          />
          <Float floatIntensity={0.6}>
            <Center disableY disableZ>
              <SectionTitle
                size={0.8}
                position-y={1.6}
                position-z={-3}
                bevelEnabled
                bevelThickness={0.3}
                // bevelSize={0.02}
              >
                {config.home.title}
              </SectionTitle>
            </Center>
          </Float>
          <Center disableY disableZ>
              <SectionTitle
                size={1.2}
                position-x={2.6}
                position-z={-3}
                bevelEnabled
                rotation-y={Math.PI / 10}
                // bevelSize={0.02}
              >
                {config.home.subtitle}
              </SectionTitle>
            </Center>
        </group>
        {/* Skills */}
        <group position-z={SECTIONS_DISTANCE * 1}>
          <group position-x={-2}>

            <SectionTitle position-z={1.5} rotation-y={Math.PI / 6}>Skills</SectionTitle>
            <BookCase position-z={-2} />
            <CouchSmall
              scale={0.4}
              position-z={0}
              position-x={-0.2}
              rotation-y={Math.PI / 3}

            />
            <Lamp
              position-z={0.6}
              position-x={-0.4}
              position-y={-0.8}
              rotation-y={-Math.PI}

            />
          </group>
          <mesh position={[2,2,-4]}>
            <sphereGeometry args={[1, 32, 32]} />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color={"yellow"}
            />
          </mesh>
        </group>
        {/* Projects */}
        <group position-z={SECTIONS_DISTANCE * 2}>
          <group position-x={1}>
            <SectionTitle 
              position-x={-0.5}
              position-z={0}
              rotation-y={-Math.PI / 6}
              >
              Projects
            </SectionTitle>
            <group
              position-x={0.5}
              position-z={0}
              rotation-y={-Math.PI / 6}
              scale={0.8}
            >
              <Monitor
                scale={0.02}
                position-y={1}
                rotation-y={-Math.PI / 2}
                position-z={-1}
              />
              <RoundedBox scale-x={2} position-y={0.5} position-z={-1}>
                <meshStandardMaterial color={"white"}/>
              </RoundedBox>
            </group>
          </group>
        </group>
        {/* Contact */}
        <group position-z={SECTIONS_DISTANCE * 3}>
          <SectionTitle position-x={0.5}>Contact</SectionTitle>
        </group>
      </group>
    </>
  );
};
