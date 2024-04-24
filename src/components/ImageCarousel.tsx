import styled from "@emotion/styled";
import {HiChevronLeft, HiChevronRight} from "react-icons/hi";
import {useEffect, useState} from "react";
import {FaVolumeHigh, FaVolumeXmark} from "react-icons/fa6";

interface ComponentProps {
    images: string[]
}

export default function ImageCarousel({images}: ComponentProps) {
    let [counter, setCount] = useState(0)
    let [muted, setMuted] = useState(true)

    function toggleMute() {
        setMuted(!muted)
    }

    function decreaseCount() {
        if (counter == 0) return
        else {
            pauseMedia(counter) // pause previous video
            setCount(counter - 1)
        }
    }

    function increaseCounter() {
        if (counter == images.length - 1) return
        else {
            pauseMedia(counter) // pause previous video
            setCount(counter + 1) // Increase counter to show next video
        }
    }

    // Set mute state of current video to current mute state
    useEffect(() => {
        const activeMedia = images[counter]
        if (activeMedia.endsWith(".mp4")) {
            const video = document.querySelector(`#media-${counter}`) as HTMLVideoElement
            video.play().then(() => {
                video.muted = muted
            })
        }
    }, [counter, muted]);

    /**
     * Mute the video at the given index, ignoring the current mute state.
     * @param index The index of the video to mute.
     */
    function pauseMedia(index: number) {
        const activeMedia = images[index]
        if (activeMedia.endsWith(".mp4")) {
            const video = document.querySelector(`#media-${index}`) as HTMLVideoElement
            video.pause()
        }
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
                    {images.map((mediaUrl, index) =>
                        mediaUrl.endsWith(".webp") ? (
                            <Image
                                key={index}
                                loading={index == 0 ? "eager" : "lazy"}
                                src={mediaUrl}
                            />
                        ) : (
                            <CarouselItem key={index} className="relative min-w-full">
                                <button className="absolute z-10 right-2 bottom-2 bg-primary-2/75 hover:bg-primary-3/75 p-2 rounded-full text-2xl text-secondary-2 hover:text-secondary-1" onClick={toggleMute}>
                                    {muted ? <FaVolumeXmark/> : <FaVolumeHigh/>}
                                </button>
                                <video id={`media-${index}`} playsInline={true} autoPlay={index === 0} loop={true} muted={true}>
                                    <source src={mediaUrl} type="video/mp4"/>
                                </video>
                            </CarouselItem>
                        )
                    )}
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

const ImagesWrapper = styled.div`
  overflow-x: hidden;
`

const ImagesContainer = styled.div`
  display: flex;
  align-items: center;
`

const Image = styled.img`
  position: relative;
  min-width: 100%;
  border-radius: var(--border-radius);

  transition: 1s;

  &:first-of-type {
    margin-left: calc(var(--shift-amount) * -1);
  }
`

const CarouselItem = styled.div`
  transition: 1s;

  &:first-of-type {
    margin-left: calc(var(--shift-amount) * -1);
  }
`