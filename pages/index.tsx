import type { NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";

import { useStore } from "../src/store";
import { colors } from "../src/styles/colors";
import {
  Container,
  ContentContainer,
  NavigateButton,
  FixedButtonContainer
} from "../src/styles/sharedStyles";

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const Input = styled.textarea`
  flex: 1;
  text-align: left;
  font-family: "Tomorrow", sans-serif;
  outline: 0;
  color: ${colors.blue400};
  margin-bottom: 32px;
  background: unset;
  border: unset;
  font-size: 32px;
  max-height: 50vh;
`;



const Home: NextPage = () => {
  const { text, setText } = useStore((state) => ({
    text: state.text,
    setText: state.setText,
  }));

  const showStartButton = text.length;

  return (
    <Container>
      <ContentContainer>
        <InputsContainer>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="type_here_"
            autoFocus
            maxLength={140}
          />
        </InputsContainer>
        <FixedButtonContainer>
          {showStartButton && (
            <Link href="/preview">
              <NavigateButton>start_ </NavigateButton>
            </Link>
          )}
        </FixedButtonContainer>
      </ContentContainer>
    </Container>
  );
};

export default Home;
