import {TagInfo} from "@/types/TexturePack";
import styled from "@emotion/styled";

interface ComponentProps {
    tag: TagInfo
}

export default function Tag({tag}: ComponentProps) {
    return (
        <Wrapper className={"py-1 px-4 rounded"} colour={tag.colour}>
            {tag.title}
        </Wrapper>
    )
}

const Wrapper = styled.p<{ colour: string | null }>`
  background-color: ${props => props.colour || "var(--primary-2)"};
`