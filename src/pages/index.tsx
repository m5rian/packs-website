import styled from "@emotion/styled";
import {GetStaticPropsContext} from "next";
import {TexturePackCard} from "@/components/TexturePackCard";
import SearchFiltering from "@/components/SearchFiltering";
import {PackDetails} from "@/types/TexturePack";
import {useState} from "react";

interface PageProps {
    packs: PackDetails[]
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const packs = await fetch("https://packs-resources.myra.bot/")
        .then(res => res.json())
        .then(json => json as Record<string, any>[])
        .then(array => array.map(item => item.name))
    const packDetailsPromises = packs.map(name => {
        return fetch(`https://packs-resources.myra.bot/${name}/pack.json`)
            .then(res => res.json())
            .then(json => ({...json, folderName: name} as PackDetails));
    })
    const packDetails = await Promise.all(packDetailsPromises)

    return {
        props: {
            packs: packDetails
        },
    };
}

export type SortType = "name" | "date" | "downloads"

export default function Home(props: PageProps) {
    const {packs} = props;
    const [sortType, setSortType] = useState<SortType>("name")
    const [searchQuery, setSearchQuery] = useState("")

    function getSortedPacks(): PackDetails[] {
        let sortedPacks = packs.slice() // Copy original array
        switch (sortType) {
            case "name":
                sortedPacks.sort((a, b) => a.name.localeCompare(b.name))
                break
            case "date":
                sortedPacks.sort((a, b) => a.releaseDate - b.releaseDate)
                break
            case "downloads":
                sortedPacks.sort((a, b) => a.downloads - b.downloads)
                break
        }
        return sortedPacks.filter(pack => pack.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    return (
        <Container>
            <h1>Texture Packs</h1>
            <SearchFiltering handleSortBy={setSortType} updateSearchQuery={setSearchQuery} />
            <TexturePacksContainer>
                {getSortedPacks().map((pack, index) => (
                    <TexturePackCard pack={pack} key={index}/>
                ))}
            </TexturePacksContainer>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

const TexturePacksContainer = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
  gap: 2.5rem;
`