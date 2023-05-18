import {PackDetails, TagInfo} from "@/types/TexturePack";
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
    packName: string,
    pack: PackDetails,
    screenshots: string[],
    versionAvailability: VersionAvailability,
    variants: PackDetails[]
    tags: TagInfo[]
}

interface VersionAvailability {
    "java-1.8": boolean
    "java-1.18": boolean
    "bedrock": boolean
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const packFolderName = context.query.name

    let packDetails = await readFile(`${packFolderName}/pack.json`)
        .then(string => JSON.parse(string))
        .then(json => ({...json, folderName: packFolderName} as PackDetails))
    const packName = packDetails.name

    const isPackBundle = packDetails.type === 1
    let packVariant = context.query.variant

    if (isPackBundle && packVariant === undefined) {
        return {
            redirect: {
                destination: `${packFolderName}/?variant=default`,
                permanent: false,
            }
        }
    }

    if (isPackBundle) {
        packDetails = await readFile(`${packFolderName}/packs/${packVariant}/pack.json`)
            .then(string => JSON.parse(string))
            .then(json => ({...json, folderName: packFolderName} as PackDetails))
    }

    const screenshotsUrl = isPackBundle
        ? `https://packs-resources.myra.bot/${packDetails.folderName}/packs/${packVariant}/screenshots/`
        : `https://packs-resources.myra.bot/${packDetails.folderName}/images/screenshots/`
    console.log(screenshotsUrl)
    const screenshots = await fetch(screenshotsUrl)
        .then(res => res.json())
        .then(json => json as ResourceFileDescription[])
        .then(files => files.map(file => {
            return `https://packs-resources.myra.bot/${packDetails.folderName}/images/screenshots/${file.name}`
        }))
        .then(screenshots => {
            const thumbnail = `https://packs-resources.myra.bot/${packDetails.folderName}/images/thumbnail.jpg`
            return [thumbnail, ...screenshots]
        })

    let downloadFolderUrl = isPackBundle
        ? `${packDetails.folderName}/packs/${packVariant}/downloads/`
        : `${packFolderName}/downloads`
    const downloadFolders = await listFolderFiles(downloadFolderUrl)
    const versionAvailability: VersionAvailability = {
        "java-1.8": false,
        "java-1.18": false,
        "bedrock": false
    } as VersionAvailability
    for (const versionFolderName of downloadFolders) { // Folder matches version name
        versionAvailability[versionFolderName as keyof VersionAvailability] = true
    }

    let variants: PackDetails[] = []
    if (isPackBundle) {
        const variantNames = await listFolderFiles(`${packFolderName}/packs`)
        for (let variantName of variantNames) {
            const variantDetails = await readFile(`${packFolderName}/packs/${variantName}/pack.json`)
                .then(res => JSON.parse(res))
                .then(res => res as PackDetails)
            variantDetails.data.variantName = variantName
            variants.push(variantDetails)
        }
    }

    const tags: TagInfo[] = []
    if (isPackBundle) tags.push({
        title: packDetails.name,
        colour: packDetails.data.colour
    })

    return {
        props: {
            packName: packName,
            pack: packDetails,
            screenshots: screenshots,
            versionAvailability: versionAvailability,
            variants: variants,
            tags: tags
        },
    };
}

export default function Page({packName, pack, screenshots, versionAvailability, variants, tags}: PageProps) {
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
                    <h2>{packName}</h2>
                    <TagContainer>
                        {tags.map((tag, i) => <Tag tag={tag} key={i}/>)}
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
