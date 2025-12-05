import { Environment, useScroll } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useRef } from "react";
import { SectionTitle } from "./SectionTitle";
import { useFrame } from "@react-three/fiber";

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
          <SectionTitle position-x={0.5}>Home</SectionTitle>
        </group>
        {/* Skills */}
        <group position-z={SECTIONS_DISTANCE * 1}>
          <SectionTitle position-x={0.5}>Skills</SectionTitle>
        </group>
        {/* Projects */}
        <group position-z={SECTIONS_DISTANCE * 2}>
          <SectionTitle position-x={0.5}>Projects</SectionTitle>
        </group>
        {/* Contact */}
        <group position-z={SECTIONS_DISTANCE * 3}>
          <SectionTitle position-x={0.5}>Contact</SectionTitle>
        </group>
      </group>
    </>
  );
};
