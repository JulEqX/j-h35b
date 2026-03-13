import { motion } from "motion/react";
import { useState } from "react";
import cakeSvg from "../assets/cake.svg";
import styles from './Envelope.module.css';

interface EnvelopeProps {
    onOpen?: () => void;
    isOpen?: boolean;
}

const envelopeFlapVariants = {
    close: { rotateX: 0, transition: { delay: 0.5, duration: 0.25 } },
    hover: { rotateX: -180, transition: { duration: 0.25 } },
    open: { rotateX: -180 },
}

const envelopeLetterVariants = {
    close: {
        y: 0,
        transition: {
            duration: 0.5,
        },
        transitionEnd: {
            zIndex: 0
        }
    },
    hover: {
        y: -100,
        transition: {
            delay: 0.25,
            duration: 0.5,
        },
        zIndex: 2,
    },
    open: {
        y: "-100vh",
        transition: {
            duration: 0.5,
        },
        zIndex: 2,
    },
}

const envelopeSealVariants = {
    close: {
        scale: 1,
        x: "-50%",
        y: "-50%",
    },
    hover: {
        scale: [1, 1.25, 1, 1.25, 1],
        x: "-50%",
        y: "-50%",
        transition: {
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 1,
        }
    },
    open: {
        scale: 1,
        x: "-50%",
        y: "-50%",
    },
}

export default function Envelope({ onOpen, isOpen }: EnvelopeProps) {
    const [isOpened, setIsOpened] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const opened = isOpen !== undefined ? isOpen : isOpened;

    const handleOnClick = () => {
        if (!opened) {
            setIsOpened(true);
            setIsHovering(false);
            onOpen?.();
        }
    };

    return (
        <>
            <motion.div
                className={styles["envelope-container"]}
                initial="close"
                animate={opened ? "open" : (isHovering ? "hover" : "close")}
                onHoverStart={() => !opened && setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
                onClick={handleOnClick}
                style={{ cursor: "pointer" }}
            >
                <motion.div
                    className={styles["envelope-seal"]}
                    variants={envelopeSealVariants}
                >
                    <motion.img src={cakeSvg} alt="cake" />
                </motion.div>
                <motion.div
                    className={styles["envelope-flap"]}
                    variants={envelopeFlapVariants}
                />
                <motion.div
                    className={styles["envelope-letter"]}
                    variants={envelopeLetterVariants}

                />
                <motion.div className={styles["envelope-pocket"]} />
            </motion.div >
        </>
    );
}
