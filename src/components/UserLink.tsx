import styled from "@emotion/styled";
import {RxArrowTopRight} from "react-icons/rx";

interface ComponentProps {
    text: string,
    img: string
}

export function UserLink({text, img}: ComponentProps) {
    return (
        <SocialsLinkContainer href={"google.com"}>
            <Background img={img}/>
            <DataContainer>
                <IconWrapper>
                    <img src={img} alt={text}/>
                </IconWrapper>
                <Text>
                    <p>{text}</p>
                    <LinkIcon><RxArrowTopRight/></LinkIcon>
                </Text>
            </DataContainer>
        </SocialsLinkContainer>
    )
}

const SocialsLinkContainer = styled.a`
  background: black;
  position: relative;
  height: 75px;
  width: 200px;

  border-radius: var(--border-radius);
  overflow: hidden;
`

const Background = styled.div<{ img: string }>`
  position: absolute;
  width: 100%;
  height: 100%;

  background-image: url(${props => props.img});
  background-position: center;
  transform: scale(120%);
  filter: blur(8px);
`

const DataContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

const IconWrapper = styled.div`
  font-size: 4rem;
  display: flex;

  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
`

const Text = styled.div`
  display: flex;
  
  & p {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-1);
  }
`

const LinkIcon = styled.div`
  font-size: 1rem;
  align-self: start;
`