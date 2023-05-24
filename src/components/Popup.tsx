import React from "react";
import {GrFormClose} from "react-icons/gr";
import styled from "@emotion/styled";

interface ComponentProps {
    children: React.ReactNode,
    setShow: (show: boolean) => void
}

export default function Popup({children, setShow}: ComponentProps) {
    return (
        <Container>
            <div></div>
            <h4>{children}</h4>
            <IconWrapper onClick={() => setShow(false)}>
                <GrFormClose/>
            </IconWrapper>
        </Container>
    )
}

const Container = styled.div`
  position: sticky;
  top: 0;
  
  width: 100%;
  padding: 1.5rem;
  border: var(--border);
  background-color: var(--primary-1);

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`