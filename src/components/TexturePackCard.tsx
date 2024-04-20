import styled from "@emotion/styled";
import {PackDetails} from "@/types/TexturePack";
import {MdDownload} from "react-icons/md";
import {BsFillCalendarDateFill} from "react-icons/bs";
import {useEffect, useState} from "react";

type TexturePackCardProps = {
    pack: PackDetails
}

export function TexturePackCard({pack}: TexturePackCardProps) {
    const [date, setDate] = useState("")

    useEffect(() =>  {
        setDate(new Date(pack.releaseDate * 1000).toLocaleDateString(undefined))
    }, [])

    return (
        <a href={`/${pack.folderName}`}>
            <img className="rounded shadow-lg shadow-primary-2 mb-1" loading={"lazy"} src={`https://packs-resources.marian.website/${pack.folderName}/images/thumbnail.webp`}/>
            <div className="flex gap-2">
                <div className="text-xs text-secondary-2 font-medium flex items-center gap-1"><MdDownload/>{pack.downloads}</div>
                <div className="text-xs text-secondary-2 font-medium flex items-center gap-1">
                    <BsFillCalendarDateFill/>{date}
                </div>
                {pack.data !== undefined && "resolution" in pack.data &&
                    <div className="text-xs text-secondary-2 font-medium flex items-center gap-1">{pack.data.resolution}x</div>
                }
            </div>
        </a>
    )
}