import styled from "@emotion/styled";
import {HiChevronLeft, HiChevronRight} from "react-icons/hi";
import {useState} from "react";

interface ComponentProps {
    images: string[]
}

export default function ImageCarousel({images}: ComponentProps) {
    let [counter, setCount] = useState(0)

    function decreaseCount() {
        if (counter == 0) return
        else setCount(counter - 1)
    }

    function increaseCounter() {
        if (counter == images.length - 1) return
        else setCount(counter + 1)
    }

    return (
        <Container counter={counter}>
            {counter === 0 ? (
                <button className="flex bg-primary-2 rounded text-3xl text-secondary-4" onClick={decreaseCount}>
                    <HiChevronLeft/>
                </button>
            ) : (
                <button className="flex bg-primary-2 rounded text-3xl text-secondary-1" onClick={decreaseCount}>
                    <HiChevronLeft/>
                </button>
            )}
            <ImagesWrapper>
                <ImagesContainer>
                    {images.map((imageUrl, index) => <Image
                        key={index}
                        loading={index == 0 ? "eager" : "lazy"}
                        src={imageUrl}
                    />)}
                </ImagesContainer>
            </ImagesWrapper>
            {counter === images.length - 1 ? (
                <button className="flex bg-primary-2 rounded text-3xl text-secondary-4" onClick={increaseCounter}>
                    <HiChevronRight/>
                </button>
            ) : (
                <button className="flex bg-primary-2 rounded text-3xl text-secondary-1" onClick={increaseCounter}>
                    <HiChevronRight/>
                </button>
            )}
        </Container>
    )
}

const Container = styled.div<{ counter: number }>`
  display: flex;
  align-items: center;
  gap: .5rem;

  --shift-amount: ${props => props.counter * 100}%
`

const NavigationButton = styled.div`
  font-size: 2rem;
  color: var(--secondary-2);

  display: flex;

  //background-color: var(--primary-2);
  //border-radius: var(--border-radius);
`

const DisabledNavigationButton = styled(NavigationButton)`
  color: var(--secondary-4);
`

const ImagesWrapper = styled.div`
  overflow-x: hidden;
`

const ImagesContainer = styled.div`
  display: flex;
  align-items: center;
`

const Image = styled.img`
  min-width: 100%;
  border-radius: var(--border-radius);

  transition: 1s;

  &:first-of-type {
    margin-left: calc(var(--shift-amount) * -1);
  }
`