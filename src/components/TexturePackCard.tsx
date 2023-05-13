import styled from "@emotion/styled";
import {PackDetails} from "@/types/TexturePack";
import {MdDownload} from "react-icons/md";

type TexturePackCardProps = {
    pack: PackDetails
}

export function TexturePackCard({pack}: TexturePackCardProps) {
    return (
        <PackContainer>
            <ThumbnailImage src={`https://packs-resources.myra.bot/${pack.folderName}/thumbnail.jpg`}/>
            <PackInfoContainer>
                <Downloads><MdDownload/> {pack.downloads}</Downloads>
            </PackInfoContainer>
        </PackContainer>
    )
}

const PackContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
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
`

const Downloads = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--secondary-3);
`