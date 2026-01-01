import { useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import { motion } from "framer-motion";

export const Interface = () => {
    const scrollData = useScroll();
    const [hasScrolled, SetHasScrolled] = useState(false)
    useFrame(() => {
        SetHasScrolled(scrollData.offset > 0)
    })

    return (
        <div className="interface">
            <div className="sections">
                <section className="section section--bottom">
                    <motion.div
                        className="scroll-down"
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: hasScrolled ? 0 : 1,
                        }}
                    >
                        <motion.div
                            className="scroll-down__wheel"
                            initial={{
                                translateY: 0,
                            }}
                            animate={{
                                translateY: 4,
                            }}
                            transition={{
                                duration: 0.4,
                                repeatDelay: 0.5,
                                repeatType: "reverse",
                                repeat: Infinity,
                            }}
                        ></motion.div>
                    </motion.div>
                </section>
                <section className="section section--right">SKILLS</section>
                <section className="section section--left">PROJECTS</section>
                <section className="section section--left">CONTACT</section>
            </div>
        </div>
    )
}