import { Environment, Gltf, OrbitControls } from "@react-three/drei";

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <Gltf
        position={[0, 0, 0]}
        src="models/iphone17promax.glb"
        // "Apple iPhone 15 Pro Max Black" (https://skfb.ly/oLpPT) by polyman is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
      />
      <group rotation-y={Math.PI}>
        <Environment preset="city" blur />
      </group>
    </>
  );
};
