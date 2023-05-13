import styled from "@emotion/styled";
import {BiSortAlt2} from "react-icons/bi";
import {SortType} from "@/pages";
interface Props {
    handleSortBy: (sortType: SortType) => void
}

export default function SearchFiltering({handleSortBy}: Props) {
    return (
        <FilterContainer>
            <SearchInput type="text" placeholder="search"/>
            <SortByButton>
                <SortIconWrapper>
                    <BiSortAlt2/>
                </SortIconWrapper>
                <p>Sort By</p>

                <SortingOptionsContainer>
                    <FilterOption onClick={() => handleSortBy("name")}>Name</FilterOption>
                    <FilterOption onClick={() => handleSortBy("date")}>Date</FilterOption>
                    <FilterOption onClick={() => handleSortBy("downloads")}>Downloads</FilterOption>
                </SortingOptionsContainer>
            </SortByButton>
        </FilterContainer>
    )
}

const FilterContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
`

const SearchInput = styled.input`
  color: var(--secondary-2);
  background-color: var(--primary-2);

  padding: .5rem;
  border: none;
  border-radius: var(--border-radius);
`

const SortByButton = styled.button`
  position: relative;
  background: none;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;

  &:focus-within div {
    display: flex;
  }
`

const SortIconWrapper = styled.div`
  color: var(--secondary-1);
  font-size: 1.5rem;

  background-color: var(--primary-2);
  padding: .5rem;
  border-radius: var(--border-radius);

  display: flex;
`

const SortingOptionsContainer = styled.div`
  position: absolute;
  background-color: var(--primary-2);
  top: 4rem;

  display: none;
  flex-direction: column;
  align-items: start;
  gap: .5rem;

  border-radius: var(--border-radius);
`

const FilterOption = styled.p`
  width: 100%;
  padding: .75rem 1rem;
  text-align: start;
  border-radius: var(--border-radius);

  &:hover {
    background-color: var(--primary-3);
    cursor: pointer;
  }
`