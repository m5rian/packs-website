import {TagInfo} from "@/types/TexturePack";
import styled from "@emotion/styled";

interface ComponentProps {
    tag: TagInfo
}

export default function Tag({tag}: ComponentProps) {
    return (
        <Wrapper colour={tag.colour}>
            {tag.title}
        </Wrapper>
    )
}

const Wrapper = styled.p<{ colour: string | null }>`
  background-color: ${props => props.colour || "var(--primary-2)"};
  padding: .4rem .8rem;
  border-radius: var(--border-radius);
`