import {PackDetails} from "@/types/TexturePack";
import {GetServerSidePropsContext} from "next";
import styled from "@emotion/styled";
import ImageCarousel from "@/components/ImageCarousel";
import {ResourceFileDescription} from "@/types/ResourceFileDescription";
import {listFolderFiles, readFile} from "@/utils";
import {UserLink} from "@/components/UserLink";
import {MdDownload} from "react-icons/md";

interface PageProps {
    pack: PackDetails,
    screenshots: string[],
    versionAvailability: VersionAvailability
}

interface VersionAvailability {
    "java-1.8": boolean
    "java-1.18": boolean
    "bedrock": boolean
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const packFolderName = context.query.name

    const packDetails = await readFile(`${packFolderName}/pack.json`)
        .then(string => JSON.parse(string))
        .then(json => ({...json, folderName: packFolderName} as PackDetails))

    const packScreenshots = await fetch(`https://packs-resources.myra.bot/${packDetails.folderName}/images/screenshots/`)
        .then(res => res.json())
        .then(json => json as ResourceFileDescription[])
        .then(files => files.map(file => {
            return `https://packs-resources.myra.bot/${packDetails.folderName}/images/screenshots/${file.name}`
        }))
        .then(screenshots => {
            const thumbnail = `https://packs-resources.myra.bot/${packDetails.folderName}/images/thumbnail.jpg`
            return [thumbnail, ...screenshots]
        })

    const downloadFolders = await listFolderFiles(`${packFolderName}/downloads`)
    const versionAvailability: VersionAvailability = {
        "java-1.8": false,
        "java-1.18": false,
        "bedrock": false
    } as VersionAvailability
    for (const versionFolderName of downloadFolders) { // Folder matches version name
        versionAvailability[versionFolderName as keyof VersionAvailability] = true
    }

    return {
        props: {
            pack: packDetails,
            screenshots: packScreenshots,
            versionAvailability: versionAvailability
        },
    };
}

export default function Page({pack, screenshots, versionAvailability}: PageProps) {
    const downloadUrl = `/api/download?pack=${pack.folderName}`

    return (
        <Wrapper>
            <Container>
                <h2>{pack.name}</h2>

                <ImageCarouselWrapper>
                    <ImageCarousel images={screenshots}/>
                </ImageCarouselWrapper>

                <Section>
                    <SectionHeaderContainer>
                        <h3>Downloads</h3>
                        <DownloadCount><MdDownload/> {pack.downloads}</DownloadCount>
                    </SectionHeaderContainer>
                    <SectionContentContainer>
                        {versionAvailability["java-1.8"] &&
                            <DownloadButton href={`${downloadUrl}&version=java-1.8`}>Java 1.8</DownloadButton>}
                        {versionAvailability["java-1.18"] &&
                            <DownloadButton href={`${downloadUrl}&version=java-1.18`}>Java 1.18+</DownloadButton>}
                        {versionAvailability["bedrock"] &&
                            <DownloadButton href={`${downloadUrl}&version=bedrock`}>Bedrock</DownloadButton>}
                    </SectionContentContainer>
                </Section>

                {pack.authors !== undefined && pack.authors.length != 0 && (
                    <Section>
                        <h3>Collaboration with</h3>
                        <SectionContentContainer>
                            {pack.authors.map((author, i) => (
                                <UserLink key={i} text={author.name} img={author.avatar}/>
                            ))}
                        </SectionContentContainer>
                    </Section>
                )}

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
  max-width: 100%;
  padding: 1rem;
  
  display: flex;
  flex-direction: column;
  gap: 1rem;
`


const ImageCarouselWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
`

const SectionHeaderContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: .5rem;
`

const SectionContentContainer = styled.div`
  display: flex;
  gap: .2rem;
`


const DownloadCount = styled.p`
  font-size: .8rem;

  display: flex;
  align-items: center;
  gap: 0.2rem;

  background-color: var(--primary-2);
  color: var(--secondary-2);
  border-radius: var(--border-radius);
  padding: .25em .5em;
`

const DownloadButton = styled.a`
  padding: 0.8rem 1rem;

  font-size: 1rem;
  color: var(--primary-1);
  background-color: var(--secondary-1);

  border: none;
  border-radius: var(--border-radius);
`