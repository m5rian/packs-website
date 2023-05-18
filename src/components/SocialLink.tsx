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

    return (<Wrapper target={"_blank"} href={url} onClick={click}>
        {children}
    </Wrapper>)
}

SocialLink.defaultProps = {
    url: "",
    callback: () => {
    }
}

const Wrapper = styled.a`
  width: 2.5rem;
  height: 2.5rem;
  
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.5rem;
  background-color: var(--primary-2);
  color: var(--secondary-2);
  border-radius: 50%;
`