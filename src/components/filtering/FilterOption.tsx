import React from "react";
import styled from "@emotion/styled";
import {css} from "@emotion/react";

interface ComponentProps {
    onClick: () => void,
    enabled: boolean
    children: React.ReactNode
}

export default function FilterOption({onClick, enabled, children}: ComponentProps) {
    return <Wrapper enabled={enabled} onClick={onClick}>{children}</Wrapper>
}

const Wrapper = styled.p<{ enabled: boolean }>`
  width: 100%;
  padding: .75rem 1rem;

  display: flex;

  text-align: start;
  border-radius: var(--border-radius);

  &:hover {
    background-color: var(--primary-2);
  }

  ${prop => prop.enabled && css`
    background-color: var(--primary-3) !important;
  `}
}
`

FilterOption.defaultProps = {
    enabled: false
}