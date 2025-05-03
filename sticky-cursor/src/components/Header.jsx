import { MenuIcon } from "lucide-react";
import { forwardRef } from "react";

export const Header = forwardRef((props, ref) => {
    const { isHovered } = props;

    return (
        <div className="flex justify-end z-50 transition-all ">
            <div className="relative z-30">
                <div ref={ref} className="border-2 border-neutral-200 p-8" >
                    < MenuIcon
                        size={36}
                        className={isHovered ? "text-white" : ""}
                    // ref={ref}
                    />
                </div>

            </div>
        </div>
    );
});



