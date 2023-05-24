import styled from "@emotion/styled";
import React from "react";
import {TexturePackPageProps} from "@/pages/[name]";

interface ComponentProps {
    props: TexturePackPageProps
    version: string
    showThanks: () => void,
    children: React.ReactNode
}

export default function DownloadButton({props, version, showThanks, children}: ComponentProps) {
    let downloadUrl = props.packBundle
        ? `/api/download?pack=${props.packBundle.folderName}&variant=${props.pack.folderName}`
        : `/api/download?pack=${props.pack.folderName}`

    return (<Container
        href={`${downloadUrl}&version=${version}`}
        onClick={showThanks}>
        {children}
    </Container>)
}

const Container = styled.a`
  padding: 0.8rem 1rem;

  font-size: 1rem;
  color: var(--primary-1);
  background-color: var(--secondary-1);

  border: none;
  border-radius: var(--border-radius);
  text-decoration: none;
`