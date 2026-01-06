import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "../config";

export const LoadingScreen = () => {
  const { progress, active } = useProgress();

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Background Elements */}
          <div className="loading-screen__blob" />
          <div className="loading-screen__grain" />

          <motion.div
            className="loading-screen__container"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="loading-screen__content"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="loading-screen__title">
                {config.loading.title.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.03 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>
              <motion.p
                className="loading-screen__subtitle"
                initial={{ opacity: 0, letterSpacing: "0.2em" }}
                animate={{ opacity: 1, letterSpacing: "0.5em" }}
                transition={{ duration: 1.2, delay: 0.8 }}
              >
                {config.loading.subtitle}
              </motion.p>
            </motion.div>

            <motion.div
              className="progress__wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div className="progress__container">
                <motion.div
                  className="progress__bar"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <motion.span
                className="progress__text"
                key={Math.floor(progress)}
              >
                {Math.round(progress)}%
              </motion.span>
            </motion.div>

            <div className="loading-screen__dots">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};