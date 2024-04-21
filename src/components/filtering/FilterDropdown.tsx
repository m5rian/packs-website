import {HiFilter} from "react-icons/hi";
import FilterCategory from "@/components/filtering/FilterCategory";
import React, {useEffect, useRef} from "react";

interface ComponentProps {
    label: string,
    icon: React.ReactElement,
    show: boolean,
    onClick: () => void,
    children: React.ReactNode
}

export default function FilterDropdown({label, icon, show, onClick, children}: ComponentProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (show && ref.current && !ref.current.contains(event.target)) onClick();
        }

        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, [show, ref]);

    return <>
        <div className="relative" ref={ref} >
            <button className="group flex items-center gap-1" onClick={() => onClick()}>
                <div className="bg-primary-2 p-2 rounded group-hover:bg-primary-3 transition-colors text-xl">
                    {icon}
                </div>
                <p>{label}</p>
            </button>
            {show ?
                <div className="z-10 absolute top-12 bg-primary-1 rounded border border-primary-3 drop-shadow-xl">
                    {children}
                </div>
                : ""}
        </div>
    </>
}