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

    return (
        <a
            className="px-4 py-2 bg-secondary-1 rounded font-medium text-primary-1"
            href={`${downloadUrl}&version=${version}`}
            onClick={showThanks}>
            {children}
        </a>)
}