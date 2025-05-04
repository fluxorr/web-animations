import { MenuIcon } from "lucide-react";
import { forwardRef } from "react";
import Magnetic from "./Magnetic";

export const Header = forwardRef((props, ref) => {
    const { isHovered } = props;

    return (
        <div className="flex justify-end z-50 transition-all ">
            <Magnetic>
                <div className="relative z-30">
                    <div ref={ref} className=" p-12" >
                        < MenuIcon
                            size={36}
                            className={isHovered ? "text-white" : ""}
                        // ref={ref}
                        />
                    </div>

                </div>
            </Magnetic>
        </div>
    );
});



