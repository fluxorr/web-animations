import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

const Cursor = ({ stickyElement }) => {
    const [hovered, setHovered] = useState(false);

    const cursorSize = hovered ? 60 : 20;

    const x = useMotionValue(150);
    const y = useMotionValue(100);

    const springX = useSpring(x, { damping: 20, stiffness: 300, mass: 0.69 });
    const springY = useSpring(y, { damping: 20, stiffness: 300, mass: 0.69 });

    useEffect(() => {
        const element = stickyElement.current;
        if (!element) return;

        const handleMouseMove = (e) => {
            x.set(e.clientX - cursorSize / 2);
            y.set(e.clientY - cursorSize / 2);
        };

        const handleMouseEnter = () => setHovered(true);
        const handleMouseLeave = () => setHovered(false);

        window.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [stickyElement, cursorSize]);

    return (
        <motion.div
            className="bg-black fixed rounded-full pointer-events-none z-50"
            style={{
                left: springX,
                top: springY,
            }}
            animate={{
                width: `${cursorSize}px`,
                height: `${cursorSize}px`,
            }}
        />
    );
};

export default Cursor;
