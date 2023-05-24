import styled from "@emotion/styled";
import {RxArrowTopRight} from "react-icons/rx";
import {Author} from "@/types/TexturePack";

interface ComponentProps {
    user: Author,
}

export function UserLink({user}: ComponentProps) {
    return (
        <SocialsLinkContainer target="_blank" href={"https://youtube.com/" + user.youtube}>
            <Background img={user.avatar}/>
            <DataContainer>
                <IconWrapper>
                    <img src={user.avatar} alt={user.name}/>
                </IconWrapper>
                <Text>
                    <p>{user.name}</p>
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
  text-decoration: none;
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