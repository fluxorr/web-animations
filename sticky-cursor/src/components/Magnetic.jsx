import { useRef, useState } from 'react'
import { motion } from 'motion/react'

export default function Magnetic({ children }) {
    const ref = useRef(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect()
        const middleX = clientX - (left + width / 2)
        const middleY = clientY - (top + height / 2)

        setPosition({ x: middleX * 0.1, y: middleY * 0.1 })
    }

    const resetPos = () => {
        setPosition({ x: 0, y: 0 })
    }

    const { x, y } = position

    return (
        <motion.div
            style={{ position: "relative" }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={resetPos}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 500, damping: 5, mass: 0.5 }}
        >
            {children}
        </motion.div>
    )
}