import styled from "@emotion/styled";
import {BiSortAlt2} from "react-icons/bi";
import {Filters, SortType} from "@/pages";
import {HiFilter} from "react-icons/hi";
import {PackDetails} from "@/types/TexturePack";
import FilterCategory from "@/components/filtering/FilterCategory";
import React from "react";
import FilterOption from "@/components/filtering/FilterOption";

interface Props {
    packs: PackDetails[]
    handleSortBy: (sortType: SortType) => void,
    updateSearchQuery: (query: string) => void,
    activeFilters: Record<string, any[]>,
    setFilters: (filters: Filters) => void
}

export default function Filtering({packs, handleSortBy, updateSearchQuery, activeFilters, setFilters}: Props) {
    return (
        <FilterContainer>
            <SearchInput onChange={event => updateSearchQuery(event.target.value)} type="text" placeholder="search"/>

            <FilteringContainer>
                <Button>
                    <IconWrapper>
                        <HiFilter/>
                    </IconWrapper>
                    <p>Filter</p>

                    <OptionsContainer>
                        <FilterCategory packs={packs} prop={"resolution"} activeFilters={activeFilters}
                                        setFilters={setFilters}/>
                        <FilterCategory packs={packs} prop={"version"} activeFilters={activeFilters}
                                        setFilters={setFilters}/>
                    </OptionsContainer>
                </Button>
                <Button>
                    <IconWrapper>
                        <BiSortAlt2/>
                    </IconWrapper>
                    <p>Sort By</p>

                    <OptionsContainer>
                        <FilterOption onClick={() => handleSortBy("name")}>Name</FilterOption>
                        <FilterOption onClick={() => handleSortBy("date-newest")}>Newest</FilterOption>
                        <FilterOption onClick={() => handleSortBy("date-oldest")}>Oldest</FilterOption>
                        <FilterOption onClick={() => handleSortBy("downloads")}>Popular</FilterOption>
                    </OptionsContainer>
                </Button>
            </FilteringContainer>
        </FilterContainer>
    )
}

const Button = styled.button`
  position: relative;
  background: none;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;

  &:focus-within > div {
    display: flex;
    flex-direction: column;
  }
`

const OptionsContainer = styled.div`
  position: absolute;
  background-color: var(--primary-1);
  top: 4rem;

  display: none;
  flex-direction: column;
  align-items: start;
  gap: .5rem;

  border-radius: var(--border-radius);
  border: var(--border);
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

const SearchInput = styled.input`
  width: inherit;
  max-width: 250px;
  height: 40px;

  color: var(--secondary-2);
  background-color: var(--primary-2);

  padding: .5rem;
  border: none;
  border-radius: var(--border-radius);
`

const IconWrapper = styled.div`
  color: var(--secondary-1);
  font-size: 1.5rem;

  background-color: var(--primary-2);
  padding: .5rem;
  border-radius: var(--border-radius);

  display: flex;
`