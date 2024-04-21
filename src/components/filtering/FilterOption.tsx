import React from "react";
import styled from "@emotion/styled";
import {css} from "@emotion/react";

interface ComponentProps {
    onClick: () => void,
    enabled: boolean
    children: React.ReactNode
}

export default function FilterOption({onClick, enabled, children}: ComponentProps) {
    return <button
        onClick={onClick}
        className={`w-full px-4 py-2 ${enabled ? "bg-primary-2 text-secondary-2" : "bg-primary-1 text-secondary-3"} hover:bg-primary-2 flex justify-between text-sm text-start`}
    >{children}</button>
}

FilterOption.defaultProps = {
    enabled: false
}