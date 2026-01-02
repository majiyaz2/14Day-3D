import { Center, ContactShadows, Environment, Float, MeshDistortMaterial, RoundedBox, useScroll } from "@react-three/drei";
import { motion } from "framer-motion-3d"

import { Avatar } from "./Avatar";
import { useEffect, useRef, useState } from "react";
import { SectionTitle } from "./SectionTitle";
import { useFrame } from "@react-three/fiber";
import { Star } from "./Star";
import { MacBookPro } from "./MacBookPro";
import { PalmTree } from "./PalmTree";
import { BookCase } from "./BookCase";
import { CouchSmall } from "./CouchSmall";
import { Lamp } from "./Lamp"
import { Monitor } from "./Monitor"
import { Balloon } from "./Balloon";
import { Mailbox } from "./Mailbox";
import { ParkBench } from "./ParkBench";
import { Pigeon } from "./Pigeon";
import * as THREE from "three"
import { config } from "../config";
import { atom, useSetAtom } from "jotai";

export const sectionAtom = atom(config.sections[0]);

const SECTIONS_DISTANCE = 10

export const Experience = () => {
  const sceneContainer = useRef()
  const scrollData = useScroll()
  // Use useSetAtom to avoid re-renders when atom value changes
  const setSection = useSetAtom(sectionAtom);
  // Local state for animation that doesn't cause issues
  const [currentSection, setCurrentSection] = useState(config.sections[0]);
  const sectionRef = useRef(currentSection);

  useFrame(() => {
    sceneContainer.current.position.z = -scrollData.offset * SECTIONS_DISTANCE * (scrollData.pages - 1)
    const newSection = config.sections[Math.round(scrollData.offset * (scrollData.pages - 1))];
    if (newSection !== sectionRef.current) {
      sectionRef.current = newSection;
      setCurrentSection(newSection);
      setSection(newSection); 
    }
  })

  useEffect(() => {
    const handleHashChange = () => {
      const sectionIndex = config.sections.indexOf(window.location.hash.replace("#", ""))
      if (sectionIndex !== -1) {
        scrollData.el.scrollTo(
          0,
          (sectionIndex / (config.sections.length - 1)) * (scrollData.el.scrollHeight - scrollData.el.clientHeight)
        )
      }
    }
    window.addEventListener("hashchange", handleHashChange)
    handleHashChange()
    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  return (
    <>
      <Environment preset="apartment"/>
      
      <Avatar />

      <ContactShadows opacity={0.5} scale={[30, 30]} color="#9c8e66" />
      <mesh position-y={-0.001} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#f5f3ee" />
      </mesh>

      <motion.group ref={sceneContainer} animate={currentSection}>
        {/* Home */}
        <motion.group
          position-y={-5}
          variants={{
            home: {
              y: 0
            }
          }}
        >
          <Star position-z={0} position-y={2.2} scale={0.3} />
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
          <Float floatIntensity={0.3}>
            <Center disableY disableZ>
              <SectionTitle
                size={0.8}
                position-y={1.9}
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
              position-y={0.4}
              bevelEnabled
              rotation-y={Math.PI / 10}
            // bevelSize={0.02}
            >
              {config.home.subtitle}
            </SectionTitle>
          </Center>
        </motion.group>
        {/* Skills */}
        <motion.group
          position-y={-5}
          variants={{
            skills: {
              y: 0
            }
          }}
          position-z={SECTIONS_DISTANCE * 1}>
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
          <mesh position={[2, 2, -4]}>
            <sphereGeometry args={[1, 32, 32]} />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color={"yellow"}
            />
          </mesh>
        </motion.group>
        {/* Projects */}
        <motion.group
          position-y={-5}
          variants={{
            projects: {
              y: 0
            }
          }}
          position-z={SECTIONS_DISTANCE * 2}>
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
              <MonitorScreen
                rotation-x={-0.18}
                position-z={-0.895}
                position-y={1.74}
              />
              <RoundedBox scale-x={2} position-y={0.5} position-z={-1}>
                <meshStandardMaterial color={"white"} />
              </RoundedBox>
            </group>
          </group>
        </motion.group>
        {/* Contact */}
        <motion.group
          position-y={-5}
          variants={{
            contact: {
              y: 0
            }
          }}
          position-z={SECTIONS_DISTANCE * 3}>
          <SectionTitle position-x={-2} position-z={0.6}>
            Contact
          </SectionTitle>
          <group position-x={-2}>
            <ParkBench
              scale={0.5}
              position-x={-0.5}
              position-z={-2.5}
              rotation-y={-Math.PI / 4}
            />
            <group position-y={2.2} position-z={0.5}>
              <Float floatIntensity={2} rotationIntensity={1.5}>
                <Balloon scale={1.5} position-x={-0.5} color="#71a2d9" />
              </Float>
              <Float floatIntensity={1.5} rotationIntensity={2} position-z={0.5}>
                <Balloon scale={1.3} color="#d97183" />
              </Float>
              <Float speed={2} rotationIntensity={2}>
                <Balloon scale={1.6} position-x={0.4} color="yellow" />
              </Float>
            </group>
          </group>
          <Mailbox
            scale={0.25}
            position={[1, 0.25, 0.5]}
            rotation-y={1.25 * Math.PI}
          />
          <Float floatIntensity={1.5} speed={3}>
            <Pigeon
              scale={0.3}
              position-x={2}
              position-y={1.5}
              position-z={-0.5}
            />
          </Float>
        </motion.group>
      </motion.group>


    </>
  );
};
