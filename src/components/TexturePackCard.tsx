import styled from "@emotion/styled";
import {PackDetails} from "@/types/TexturePack";

type TexturePackCardProps = {
    pack: PackDetails
}

const PackContainer = styled.div<TexturePackCardProps>`
    
`

const ThumbnailImage = styled.img`
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: var(--border-radius);
`

const PackInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export function TexturePackCard({pack}: TexturePackCardProps) {
    return (
        <PackContainer pack={pack}>
            <ThumbnailImage src={`https://packs-resources.myra.bot/${pack.folderName}/thumbnail.jpg`}/>
            <PackInfoContainer>
                <p>{pack.name}</p>
                <p>{pack.downloads}</p>
            </PackInfoContainer>
        </PackContainer>
    )
}