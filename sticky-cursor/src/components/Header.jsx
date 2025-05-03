// import { MenuIcon } from "lucide-react";
// import { forwardRef } from "react";

// const Header = forwardRef((props, ref) => {
//     return (
//         <div className="flex mix-blend-difference  justify-end  p-16 ">

//             <MenuIcon size={36} ref={ref} />

//         </div>
//     );
// });

// export default Header;

import { MenuIcon } from "lucide-react";
import { forwardRef, useState } from "react";

const Header = forwardRef((props, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="flex mix-blend-difference justify-end p-16">
            <div
                ref={ref}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="p-2 rounded"
            >
                <MenuIcon
                    size={36}
                    stroke={isHovered ? "#ffffff" : "#000000"} // white on hover
                />
            </div>
        </div>
    );
});

export default Header;
