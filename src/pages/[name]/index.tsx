import {PackDetails} from "@/types/TexturePack";
import {GetServerSidePropsContext} from "next";
import styled from "@emotion/styled";
import ImageCarousel from "@/components/ImageCarousel";
import {ResourceFileDescription} from "@/types/ResourceFileDescription";

interface PageProps {
    pack: PackDetails,
    screenshots: string[]
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const folderName = context.query.name
    const packDetails = await fetch(`https://packs-resources.myra.bot/${folderName}/pack.json`)
        .then(res => res.json())
        .then(json => ({...json, folderName: folderName} as PackDetails));
    const packScreenshots = await fetch(`https://packs-resources.myra.bot/${packDetails.folderName}/screenshots`)
        .then(res => res.json())
        .then(json => json as ResourceFileDescription[])
        .then(files => files.map(file => {
            return `https://packs-resources.myra.bot/${packDetails.folderName}/screenshots/${file.name}`
        }))
    return {
        props: {
            pack: packDetails,
            screenshots: packScreenshots
        },
    };
}

export default function Page({pack, screenshots}: PageProps) {
    return (
        <Wrapper>
            <Container>
                <div>
                    <h2>{pack.name}</h2>
                    <p>{pack.downloads} Downloads - 16x</p>
                </div>

                <ImageCarousel width="750px" images={screenshots}/>

                <DownloadContainer>
                    <h3>Downloads</h3>
                    <ButtonsContainer>
                        <DownloadButton>Java 1.8</DownloadButton>
                        <DownloadButton>Java 1.18+</DownloadButton>
                        <DownloadButton>Bedrock</DownloadButton>
                    </ButtonsContainer>
                </DownloadContainer>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const DownloadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: .2rem;
`

const DownloadButton = styled.button`
  padding: 0.8rem 1rem;

  font-size: 1rem;
  border: none;
  border-radius: var(--border-radius);
`