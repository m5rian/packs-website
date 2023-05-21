import styled from "@emotion/styled";
import {PackDetails} from "@/types/TexturePack";
import {MdDownload} from "react-icons/md";
import {BsFillCalendarDateFill} from "react-icons/bs";

type TexturePackCardProps = {
    pack: PackDetails
}

export function TexturePackCard({pack}: TexturePackCardProps) {
    return (
        <PackContainer href={`/${pack.folderName}`}>
            <ThumbnailImage loading={"lazy"} src={`https://packs-resources.myra.bot/${pack.folderName}/images/thumbnail.jpg`}/>
            <PackInfoContainer>
                <Info>
                    <MdDownload/>{pack.downloads}
                </Info>
                <Info>
                    <BsFillCalendarDateFill/>{new Date(pack.releaseDate * 1000).toLocaleDateString(undefined)}
                </Info>
            </PackInfoContainer>
        </PackContainer>
    )
}

const PackContainer = styled.a`

`

const ThumbnailImage = styled.img`
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: var(--border-radius);
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);

  transition: box-shadow .2s;
`

const PackInfoContainer = styled.div`
  display: flex;
  gap: 1rem;
`

const Info = styled.p`
  font-size: .8rem;
  color: var(--secondary-3);
  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .2rem;
`