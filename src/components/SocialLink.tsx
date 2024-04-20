import styled from "@emotion/styled";
import React from "react";

interface ComponentProps {
    url: string,
    callback: () => void,
    children: React.ReactNode
}

export default function SocialLink({url, callback, children}: ComponentProps) {

    function click(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        if (url.length === 0) {
            event.preventDefault()
            callback()
        }
    }

    return (
        <a className="w-10 aspect-square flex items-center justify-center text-2xl text-secondary-1 bg-primary-2 rounded-full" target={"_blank"} href={url} onClick={click}>
            {children}
        </a>
    )
}

SocialLink.defaultProps = {
    url: "",
    callback: () => {
    }
}