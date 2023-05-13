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
                    <p onClick={() => handleSortBy("name")}> Name</p>
                    <p onClick={() => handleSortBy("date")}>Date</p>
                    <p onClick={() => handleSortBy("downloads")}>Downloads</p>
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
  padding: 1rem;
  top: 4rem;

  display: none;
  flex-direction: column;
  align-items: start;
  gap: .5rem;

  border-radius: var(--border-radius);
`