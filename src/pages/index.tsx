import styled from "@emotion/styled";
import {TexturePackCard} from "@/components/TexturePackCard";
import Filtering from "@/components/filtering/Filtering";
import {PackDetails} from "@/types/TexturePack";
import React, {useState} from "react";
import {listFolderFiles, readFile} from "@/utils";
import Head from "next/head";

interface PageProps {
    packs: PackDetails[]
}

export interface Filters {
    [key: string]: any;
}

export async function getStaticProps() {
    const packs = await listFolderFiles("/")
    const packDetailsPromises = packs.map(name => {
        return readFile(`${name}/pack.json`)
            .then(res => JSON.parse(res))
            .then(json => ({...json, folderName: name} as PackDetails));
    })
    const packDetails = await Promise.all(packDetailsPromises)

    return {
        props: {
            packs: packDetails
        },
    };
}

export type SortType = "name" | "date-newest" | "date-oldest" | "downloads"

export default function Home(props: PageProps) {
    const {packs} = props;
    const [sortType, setSortType] = useState<SortType>("date-newest")
    const [searchQuery, setSearchQuery] = useState("")
    const [filters, setFilters] = useState<Filters>({})

    function getSortedPacks(): PackDetails[] {
        let sortedPacks = packs.slice() // Copy original array
        switch (sortType) {
            case "name":
                sortedPacks.sort((a, b) => a.name.localeCompare(b.name))
                break
            case "date-newest":
                sortedPacks.sort((a, b) => b.releaseDate - a.releaseDate)
                break
            case "date-oldest":
                sortedPacks.sort((a, b) => a.releaseDate - b.releaseDate)
                break
            case "downloads":
                sortedPacks.sort((a, b) => b.downloads - a.downloads)
                break
        }
        return sortedPacks.filter(pack => pack.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    function filterPacks(packs: PackDetails[]) {
        let filterProperties = Object.keys(filters)
        for (const filterProperty of filterProperties) {
            const enabledFilters = (filters as any)[filterProperty] as any[]
            if (enabledFilters.length === 0) filterProperties = filterProperties.filter(property => {
                return property !== filterProperty
            })
        }
        // No filters applied
        if (filterProperties.length === 0) return packs

        return packs.filter(pack => {
            const metadata = pack.data
            return filterProperties.every(filterProperty => {
                const filterValues = filters[filterProperty];
                const packValues = metadata?.[filterProperty]

                if (packValues === undefined && filterValues.includes(undefined)) return true
                else return packValues?.some(value => filterValues.includes(value))
            })
        })
    }

    return (
        <>
            <Head>
                <title>Texture Packs by marian</title>
                <meta property="og:title" content="Texture Packs by marian"/>
                <meta name="description" content="PvP aimed Minecraft texture packs"/>
            </Head>

            <Container>
                <h1>Texture Packs</h1>
                <p>Download pvp aimed texture packs for Minecraft for free!</p>
                <Filtering packs={packs}
                           handleSortBy={setSortType}
                           updateSearchQuery={setSearchQuery}
                           activeFilters={filters}
                           setFilters={setFilters}/>
                <TexturePacksContainer>
                    {filterPacks(getSortedPacks()).map((pack, index) => (
                        <TexturePackCard pack={pack} key={index}/>
                    ))}
                </TexturePacksContainer>
            </Container>
        </>
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