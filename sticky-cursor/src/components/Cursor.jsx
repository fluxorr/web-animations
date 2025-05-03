import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export const Cursor = ({ stickyElement, isHovered, setHovered }) => {
    const cursorSize = isHovered ? 80 : 20;

    const x = useMotionValue(150);
    const y = useMotionValue(100);

    const springX = useSpring(x, { damping: 20, stiffness: 300, mass: 0.5 });
    const springY = useSpring(y, { damping: 20, stiffness: 300, mass: 0.5 });

    useEffect(() => {



        const handleMouseMove = (e) => {

            const { clientX, clientY } = e;
            const { left, top, width, height } = stickyElement.current.getBoundingClientRect()

            const center = {
                x: left + width / 2, y: top + height / 2
            }

            const distance = { x: clientX - center.x, y: clientY - center.y }

            if (isHovered) {
                x.set((center.x - cursorSize / 2) + distance.x * 0.1)
                y.set((center.y - cursorSize / 2) + distance.y * 0.1)
            } else {
                x.set(clientX - cursorSize / 2);
                y.set(clientY - cursorSize / 2);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [cursorSize]);

    useEffect(() => {
        const element = stickyElement.current;
        if (!element) return;

        const handleMouseEnter = () => setHovered(true);
        const handleMouseLeave = () => setHovered(false);

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [stickyElement, setHovered]);

    return (
        <motion.div
            className="bg-black fixed rounded-full pointer-events-none z-10"
            style={{
                left: springX,
                top: springY,
                mixBlendMode: "difference", // This makes the black cursor turn white when over dark areas
            }}
            animate={{
                width: `${cursorSize}px`,
                height: `${cursorSize}px`,
            }}
        />
    );
};

