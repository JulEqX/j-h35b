import { useRef } from "react";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
} from "motion/react";
import { letterContent } from "../data";
import styles from "./Letter.module.css";

interface LetterProps {
    onClose?: () => void;
}

const ROTATION_RANGE = 35;
const HALF_ROTATION_RANGE = 35 / 2;

export default function Letter({ onClose }: LetterProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`translate(-50%, -50%) rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <>
            <motion.div
                className="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                onClick={onClose}
            />
            <motion.div
                ref={ref}
                initial={{ opacity: 0, top: "-100%", left: "50%" }}
                animate={{
                    opacity: 1,
                    top: "50%",
                    left: "50%",
                    transition: {
                        delay: 0.5,
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                    }
                }}
                exit={{
                    opacity: 0,
                    top: "-100vh",
                    left: "50%",
                    transition: {
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                    }
                }}
                className="overlay"
                onClick={(e) => e.stopPropagation()}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transformStyle: "preserve-3d",
                    transform,
                }}
            >
                <div className={styles["letter"]}>
                    <h2 className={styles["letter-title"]}>{letterContent.title}</h2>
                    <p className={styles["letter-subtitle"]}>
                        {letterContent.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className={styles["letter-body"]}>{letterContent.content}</p>
                </div>
            </motion.div>
        </>
    );
}
