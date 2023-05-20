import {PackDetails} from "@/types/TexturePack";
import {GetServerSidePropsContext} from "next";
import styled from "@emotion/styled";
import ImageCarousel from "@/components/ImageCarousel";
import {ResourceFileDescription} from "@/types/ResourceFileDescription";
import {listFolderFiles, readFile} from "@/utils";
import {UserLink} from "@/components/UserLink";
import {MdDownload} from "react-icons/md";
import {BiLink} from "react-icons/bi";
import {FaYoutube} from "react-icons/fa"
import React, {useState} from "react";
import Tag from "@/components/Tag"
import Toast from "@/components/Toast";
import SocialLink from "@/components/SocialLink";

interface PageProps {
    packBundle: PackDetails,
    pack: PackDetails,
    screenshots: string[],
    versionAvailability: VersionAvailability,
    variants: PackDetails[]
}

interface VersionAvailability {
    "java-1.8": boolean
    "java-1.18": boolean
    "bedrock": boolean
}

async function getScreenshots(imageFolderUrl: string, screenshotsFolderUrl: string) {
    return await fetch(screenshotsFolderUrl)
        .then(res => res.json())
        .then(json => json as ResourceFileDescription[])
        .then(files => files.map(file => {
            return `${screenshotsFolderUrl}${file.name}`
        }))
        .then(screenshots => {
            const thumbnail = `${imageFolderUrl}thumbnail.jpg`
            return [thumbnail, ...screenshots]
        })
}

async function getVersionAvailability(downloadFolderPath: string) {
    const downloadFolders = await listFolderFiles(downloadFolderPath)
    const versionAvailability: VersionAvailability = {
        "java-1.8": false,
        "java-1.18": false,
        "bedrock": false
    } as VersionAvailability
    for (const versionFolderName of downloadFolders) { // Folder matches version name
        versionAvailability[versionFolderName as keyof VersionAvailability] = true
    }
    return versionAvailability
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const packFolderName = context.query.name

    let rootPackDetails = await readFile(`${packFolderName}/pack.json`)
        .then(string => JSON.parse(string))
        .then(json => ({...json, folderName: packFolderName} as PackDetails))
    const isPackBundle = rootPackDetails.type === 1

    if (isPackBundle) {
        let packVariant = context.query.variant
        if (packVariant === undefined) return {
            redirect: {
                destination: `${packFolderName}/?variant=default`,
                permanent: false,
            }
        }

        let packDetails = await readFile(`${packFolderName}/packs/${packVariant}/pack.json`)
            .then(string => JSON.parse(string))
            .then(json => ({...json, folderName: packFolderName} as PackDetails))

        const imageFolderUrl = `https://packs-resources.myra.bot/${rootPackDetails.folderName}/images/`
        const screenshotFolderUrl = `https://packs-resources.myra.bot/${rootPackDetails.folderName}/packs/${packVariant}/screenshots/`
        const screenshots = await getScreenshots(imageFolderUrl, screenshotFolderUrl)

        let downloadFolderPath = `${rootPackDetails.folderName}/packs/${packVariant}/downloads/`
        const versionAvailability = await getVersionAvailability(downloadFolderPath)

        const variants: PackDetails[] = []
        const variantNames = await listFolderFiles(`${packFolderName}/packs`)
        for (let variantName of variantNames) {
            const variantDetails = await readFile(`${packFolderName}/packs/${variantName}/pack.json`)
                .then(res => JSON.parse(res))
                .then(res => res as PackDetails)
            variantDetails.data.variantName = variantName
            variants.push(variantDetails)
        }

        return {
            props: {
                packBundle: rootPackDetails,
                pack: packDetails,
                screenshots: screenshots,
                versionAvailability: versionAvailability,
                variants: variants,
            },
        };
    }

    const imageFolderUrl = `https://packs-resources.myra.bot/${rootPackDetails.folderName}/images/`
    const screenshotFolderUrl = `https://packs-resources.myra.bot/${rootPackDetails.folderName}/images/screenshots/`
    const screenshots = await getScreenshots(imageFolderUrl, screenshotFolderUrl)

    const downloadFolderPath = `${packFolderName}/downloads`
    const versionAvailability = getVersionAvailability(downloadFolderPath)

    return {
        props: {
            packBundle: null,
            pack: rootPackDetails,
            screenshots: screenshots,
            versionAvailability: versionAvailability,
            variants: [],
        },
    };
}

export default function Page({packBundle, pack, screenshots, versionAvailability, variants}: PageProps) {
    const [showCopyPopup, setShowCopyPopup] = useState(false)

    function share() {
        if (navigator.share) {
            navigator.share({
                title: pack.name,
                url: window.location.host + "/" + pack.folderName
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(location.href).then(_ => {
                setShowCopyPopup(true)
                setTimeout(() => {
                    setShowCopyPopup(false)
                }, 2500)
            });
        }
    }

    let downloadUrl = `/api/download?pack=${pack.folderName}`
    return (
        <>
            <Toast condition={showCopyPopup} content={"Successfully copied link!"}/>

            <Wrapper>
                <Container>
                    <h2>{packBundle?.name || pack.name}</h2>
                    <TagContainer>
                        {(packBundle?.tags || pack.tags)?.map((tag, i) => <Tag tag={tag} key={i}/>)}
                    </TagContainer>

                    <SectionContentContainer>
                        <SocialLink callback={share}>
                            <BiLink/>
                        </SocialLink>
                        <SocialLink url={"https://www.youtube.com/watch?v=" + pack.videoId}>
                            <FaYoutube/>
                        </SocialLink>
                    </SectionContentContainer>

                    <ImageCarouselWrapper>
                        <ImageCarousel images={screenshots}/>
                    </ImageCarouselWrapper>

                    {variants.length !== 0 && <Section>
                        <h3>Variants</h3>
                        <SectionContentContainer>
                            {variants.map((variant, i) => <VariantButton
                                href={`?variant=${variant.data.variantName}`}
                                key={i}
                                colour={variant.data.colour}
                            />)}
                        </SectionContentContainer>
                    </Section>}

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

                    {(packBundle?.authors || pack.authors) !== undefined && (packBundle?.authors || pack.authors).length != 0 && (
                        <Section>
                            <h3>Collaboration with</h3>
                            <SectionContentContainer>
                                {(packBundle?.authors || pack.authors).map((author, i) => (
                                    <UserLink key={i} text={author.name} img={author.avatar}/>
                                ))}
                            </SectionContentContainer>
                        </Section>
                    )}

                </Container>
            </Wrapper>
        </>
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

const VariantButton = styled.a<{ colour: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: var(--border);
  background-color: ${props => props.colour};
`

const TagContainer = styled.div`
  display: flex;
  gap: 1rem;
`
