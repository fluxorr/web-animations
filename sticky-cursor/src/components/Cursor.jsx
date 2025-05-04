import { animate, motion, transform, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

export const Cursor = ({ stickyElement, isHovered, setHovered }) => {
    const cursorRef = useRef()
    const cursorSize = isHovered ? 60 : 20;

    const x = useMotionValue(150);
    const y = useMotionValue(100);

    const springX = useSpring(x, { damping: 20, stiffness: 300, mass: 0.5 });
    const springY = useSpring(y, { damping: 20, stiffness: 300, mass: 0.5 });

    const scale = {
        x: useMotionValue(1),
        y: useMotionValue(1)
    }

    const rotate = (distance) => {
        const angle = Math.atan2(distance.y, distance.x)
        animate(cursorRef.current, { rotate: `${angle}rad` }, { duration: 0 })
    }


    useEffect(() => {

        const handleMouseMove = (e) => {

            const { clientX, clientY } = e;
            const { left, top, width, height } = stickyElement.current.getBoundingClientRect()

            const center = {
                x: left + width / 2, y: top + height / 2
            }

            const distance = { x: clientX - center.x, y: clientY - center.y }

            if (isHovered) {
                rotate(distance)
                x.set((center.x - cursorSize / 2) + distance.x * 0.1)
                y.set((center.y - cursorSize / 2) + distance.y * 0.1)

                const absDistance = Math.max(Math.abs(distance.x), Math.abs(distance.y))
                const newScaleX = transform(absDistance, [0, width / 2], [1, 1.3])
                const newScaleY = transform(absDistance, [0, height / 2], [1, 0.8])
                scale.x.set(newScaleX)
                scale.y.set(newScaleY)
            } else {
                x.set(clientX - cursorSize / 2);
                y.set(clientY - cursorSize / 2);
                scale.x.set(1)
                scale.y.set(1)
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

    const template = ({ rotate, scaleX, scaleY }) => {
        return `rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})`
    }


    return (
        <motion.div
            transformTemplate={template}
            ref={cursorRef}
            className="bg-black fixed rounded-full pointer-events-none z-10"
            style={{
                left: springX,
                top: springY,
                mixBlendMode: "difference",
                scaleX: scale.x,
                scaleY: scale.y
            }}
            animate={{
                width: `${cursorSize}px`,
                height: `${cursorSize}px`,
            }}
        />
    );
};

