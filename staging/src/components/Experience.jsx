import { OrbitControls } from "@react-three/drei";
import { TeslaModel3 } from "./TeslaModel3";
import { Stage } from "@react-three/drei";

export const Experience = () => {
  return (
    <>
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.72}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0}
        maxDistance={15}
        minDistance={6}
      />
      <ambientLight intensity={0.4} />
      <Stage intensity={0.01} preset={"upfront"} environment={"studio"}>
        <TeslaModel3 scale={0.012} position-z={0.6} />
      </Stage>
    </>
  );
};
