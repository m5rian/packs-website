import styled from "@emotion/styled";
import {BiSortAlt2} from "react-icons/bi";
import {Filters, SortType} from "@/pages";
import {HiFilter} from "react-icons/hi";
import {PackDetails} from "@/types/TexturePack";
import FilterCategory from "@/components/filtering/FilterCategory";
import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import FilterOption from "@/components/filtering/FilterOption";
import FilterDropdown from "@/components/filtering/FilterDropdown";

interface Props {
    packs: PackDetails[]
    handleSortBy: (sortType: SortType) => void,
    updateSearchQuery: (query: string) => void,
    activeFilters: Record<string, any[]>,
    setFilters: (filters: Filters) => void
}

export default function Filtering({packs, handleSortBy, updateSearchQuery, activeFilters, setFilters}: Props) {
    const [showFilter, setShowFilter] = useState(false)
    const [showSorting, setShowSorting] = useState(false)

    return (
        <FilterContainer>
            <input
                onChange={event => updateSearchQuery(event.target.value)}
                type="text"
                placeholder="search"
                className="w-full max-w-56 py-2 px-4 bg-primary-2 rounded text-secondary-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
            />

            <FilteringContainer>
                <FilterDropdown label="Filter" icon={<HiFilter/>} show={showFilter} onClick={() => setShowFilter(!showFilter)}>
                    <FilterCategory packs={packs} prop={"resolution"} activeFilters={activeFilters} setFilters={setFilters}/>
                    <FilterCategory packs={packs} prop={"version"} activeFilters={activeFilters} setFilters={setFilters}/>
                </FilterDropdown>
                <FilterDropdown label="Sort by" icon={<BiSortAlt2/>} show={showSorting} onClick={() => setShowSorting(!showSorting)}>
                    <FilterOption onClick={() => handleSortBy("name")}>Name</FilterOption>
                    <FilterOption onClick={() => handleSortBy("date-newest")}>Newest</FilterOption>
                    <FilterOption onClick={() => handleSortBy("date-oldest")}>Oldest</FilterOption>
                    <FilterOption onClick={() => handleSortBy("downloads")}>Popular</FilterOption>
                </FilterDropdown>
            </FilteringContainer>
        </FilterContainer>
    )
}

const OptionsContainer = styled.div`
  position: absolute;
  background-color: var(--primary-1);
  top: 4rem;

  display: flex;
  flex-direction: column;
  align-items: start;
  gap: .5rem;

  border-radius: var(--border-radius);
  border: var(--border);
  z-index: 1;
`

const FilteringContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

const FilterContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`