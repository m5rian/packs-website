import React from "react";
import styled from "@emotion/styled";
import {keyframes} from "@emotion/react";

interface ComponentProps {
    condition: boolean,
    content: string
}

export default function Toast({condition, content}: ComponentProps) {
    return (<>
        {condition
            ? <PopupContainerActive>
                <p>{content}</p>
            </PopupContainerActive>
            : <PopupContainer>
                <p>{content}</p>
            </PopupContainer>
        }
    </>)
}

const PopupContainer = styled.div`
  position: fixed;
  right: 0;
  padding: 1.5rem;
  border: var(--border);
  border-radius: var(--border-radius);
  background-color: var(--primary-2);
  transform: translateY(-100%);
`

const animation = keyframes`
  0% {
    transform: translateY(-100%);
  }
  25% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
`

const PopupContainerActive = styled(PopupContainer)`
  animation: ${animation} 2.5s ease;
`