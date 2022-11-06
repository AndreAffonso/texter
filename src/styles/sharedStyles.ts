import styled from "styled-components";
import { colors } from "./colors";

export const Container = styled.div`
  background-color: ${colors.blue500};
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavigateButton = styled.a`
  background: ${colors.pink500};
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  width: 180px;
  text-align: center;
  clip-path: polygon(92% 0, 100% 25%, 100% 100%, 8% 100%, 0% 75%, 0 0);
`;

export const ShareButton = styled.button`
  all: unset;
  background: ${colors.pink500};
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  text-align: center;
  clip-path: polygon(92% 0, 100% 25%, 100% 100%, 8% 100%, 0% 75%, 0 0);
  position: absolute;
  left: 24px;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  bottom: 0px;
  z-index: 99;
`;

export const FixedButtonContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: flex-end;
  bottom: 0px;
  z-index: 99;
  width: 100%;
  padding: 24px 48px;
  min-height: 40px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px 24px 24px;
  width: 100%;
  height: 100%;
`;
