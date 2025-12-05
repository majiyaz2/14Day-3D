import { Environment } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useRef } from "react";
import { SectionTitle } from "./SectionTitle";

const SECTIONS_DISTANCE = 10

export const Experience = () => {
  const sceneContainer = useRef()
  return (
    <>
      <Environment preset="sunset" />
      <Avatar />

      <group ref={sceneContainer}>
        {/* Home */}
        <group position-y={SECTIONS_DISTANCE * 0}>
          <SectionTitle position-x={0.5}>Home</SectionTitle>
        </group>
        {/* Skills */}
        <group position-y={SECTIONS_DISTANCE * 1}>
          <SectionTitle position-x={0.5}>Skills</SectionTitle>
        </group>
        {/* Projects */}
        <group position-y={SECTIONS_DISTANCE * 2}>
          <SectionTitle position-x={0.5}>Projects</SectionTitle>
        </group>
        {/* Contact */}
        <group position-y={SECTIONS_DISTANCE * 3}>
          <SectionTitle position-x={0.5}>Contact</SectionTitle>
        </group>
      </group>
    </>
  );
};
