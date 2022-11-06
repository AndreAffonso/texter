import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { useStore } from "../src/store";
import { colors } from "../src/styles/colors";
import { motion } from "framer-motion";

import {
  FixedButtonContainer,
  Container,
  ContentContainer,
  NavigateButton,
  ShareButton,
} from "../src/styles/sharedStyles";

const Text = styled.p`
  color: ${colors.blue200};
  font-size: 80vh;
  margin-bottom: 16px;
  font-weight: 500;
  text-shadow: 2px 2px 2px ${colors.blue400};
  white-space: nowrap;
  padding-right: 200px;
`;

const TextContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  overflow-x: auto;
  flex: 1;
  max-width: 100%;
  padding: 0 40vw;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const SpeedText = styled.span`
  font-size: 32px;
  color: ${colors.pink500};
`;

const SpeedContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 32px;

  span {
    margin: 0 8px;
    min-width: 40px;
    text-align: center;
  }

  button {
    all: unset;
    background: ${colors.pink500};
    font-size: 24px;
    line-height: 1;
    width: 20px;
    height: 20px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    clip-path: polygon(92% 0, 100% 25%, 100% 100%, 8% 100%, 0% 75%, 0 0);
  }
`;

const Preview: NextPage = () => {
  const [showButton, setShowButton] = useState(false);
  const [showShareButton, setShowShareButton] = useState(false);
  const [isInital, setIsInital] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const params = router.query;

  const toggleShowButton = () => setShowButton((prev) => !prev);

  const { text, speed, incrementSpeed, decrementSpeed, setText } = useStore(
    (state) => ({
      text: state.text,
      speed: state.speed,
      incrementSpeed: state.incrementSpeed,
      decrementSpeed: state.decrementSpeed,
      setText: state.setText,
    })
  );

  useEffect(() => {
    if (params.text) {
      try {
        const text = atob(params.text as string);
        setText(text);
      } catch (err) {
        setText("Erro ao compartilhar");
      }
    }

  }, [params, setText, text, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        const prevScroll = containerRef.current.scrollLeft;
        containerRef.current.scrollLeft = prevScroll + speed;

        if (prevScroll === containerRef.current.scrollLeft) {
          containerRef.current.scrollLeft = 0;
        }

        if (containerRef.current.scrollLeft > 50 && isInital) {
          setIsInital(false);
        }

        if (containerRef.current.scrollLeft < 50 && !isInital) {
          setIsInital(true);
        }
      }
    }, 10);

    return () => clearInterval(interval);
  }, [speed, isInital]);

  const variants = {
    initial: { opacity: 0 },
    default: { opacity: 1 },
  };

  const onShare = () => {
    if (showShareButton) {
      const textBase64 = btoa(text);
      navigator.share({
        url: `https://texter.live/preview?text=${textBase64}`,
      });
    }
  };

  useEffect(() => {
    setShowShareButton(!!(navigator && navigator?.share));

    try {
      screen.orientation.lock("landscape");
    } catch (err) {
      console.log("screen.orientation.lock() is not available on this device.");
    }

    return () => screen.orientation?.unlock();
  }, []);

  return (
    <Container>
      <ContentContainer>
        <TextContainer
          ref={containerRef}
          onMouseDown={toggleShowButton}
          animate={isInital ? "initial" : "default"}
          variants={variants}
        >
          <Text>{text}</Text>
        </TextContainer>
        {(showButton || !text) && (
          <FixedButtonContainer>
            {showShareButton && (
              <ShareButton onClick={onShare}>share_</ShareButton>
            )}

            <SpeedContainer>
              <button onClick={decrementSpeed}>-</button>
              <SpeedText>{speed}</SpeedText>
              <button onClick={incrementSpeed}>+</button>
            </SpeedContainer>
            <Link href="/">
              <NavigateButton>go_back_</NavigateButton>
            </Link>
          </FixedButtonContainer>
        )}
      </ContentContainer>
    </Container>
  );
};

export default Preview;
