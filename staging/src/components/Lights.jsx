import { Float, Lightformer } from "@react-three/drei"

export const Lights = () => {
    return (
        <>
            <Float>
                <Lightformer
                    form={"ring"}
                    intensity={20}
                    position={[-3, 3, -2]}
                    scale={[3,3,1]}
                    target={[0,0,0]}
                />
            </Float>
            <Lightformer
                form={"ring"}
                intensity={0.8}
                position={[0, 5, -2]}
                scale={[10, 10 , 1]}
                target={[0, 0, 0]}
            />

            {/* LEFT */}
            <Lightformer
                form={"ring"}
                intensity={20}
                position={[-5, 2, 0]}
                scale={[10, 1 , 1]}
                target={[0, 0, 0]}
            />

            <Float speed={5} floatIntensity={2} rotationIntensity={2}>
                <Lightformer
                    form={"ring"}
                    color={"red"}
                    intensity={1}
                    position={[-15, 4, -18]}
                    scale={10}
                    target={[0, 0, 0]}
                />
            </Float>

            <Lightformer
                color={"green"}
                intensity={4}
                position={[5, 1, 3]}
                scale={[10, 1, 1]}
                target={[0, 0, 0]}
            />
            <Lightformer
                color={"purple"}
                intensity={3}
                position={[2, 0, 0]}
                scale={[0.1, 5, 1]}
                target={[0, 0, 0]}
            />
            <Lightformer
                form={"ring"}
                intensity={2.5}
                position={[5, 3, 2]}
                scale={5}
                target={[0, 0, 0]}
            />

            <Lightformer
                intensity={2}
                position={[0, 0.5, 5]}
                scale={[4, 0.5, 1]}
            />

        </>
    )
}