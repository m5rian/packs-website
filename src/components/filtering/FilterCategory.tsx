import {PackDetails} from "@/types/TexturePack";
import styled from "@emotion/styled";
import FilterOption from "@/components/filtering/FilterOption";
import {Filters} from "@/pages";

interface ComponentProps {
    packs: PackDetails[]
    prop: string,
    activeFilters: Record<string, any[]>,
    setFilters: (filters: Filters) => void
}

export default function FilterCategory({packs, prop, activeFilters, setFilters}: ComponentProps) {
    const options = packs.flatMap(pack => pack?.data?.[prop])
    const optionsSet = Array.from(new Set(options))

    function count(option: any) {
        return options.filter(it => it === option).length
    }

    function onClick(value: any) {
        const updatedFilters = {...activeFilters};
        // Filter is not initialized yet
        if (!(prop in updatedFilters)) updatedFilters[prop] = []

        // Value is already selected
        if (updatedFilters[prop].includes(value)) updatedFilters[prop] = updatedFilters[prop].filter(it => it !== value)
        // Value is not selected yet
        else updatedFilters[prop] = [...updatedFilters[prop], value]

        setFilters(updatedFilters)
        console.log(updatedFilters)
    }

    return <div>
        <h4 className="px-4 py-2 text-start text-secondary-1">{prop}</h4>
        <OptionsContainer>
            {optionsSet.map((option, i) => {
                return (
                    <FilterOption onClick={() => onClick(option)} key={i} enabled={activeFilters[prop]?.includes(option)}>
                        {option ?? "None"}
                        <span className="text-secondary-4">{count(option)}</span>
                    </FilterOption>
                );
            })}
        </OptionsContainer>
    </div>
}

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`