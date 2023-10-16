import styled from 'styled-components';
import { lightGreen } from '../../config/collors/colors';
export const Container = styled.section`
  width: 100%;
  max-width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: auto;
  transition: all 500ms;
  align-items: center;
  justify-content: center;
`;
export const IMG = styled.img`
  width: 70%;
  max-width: 210px;
  margin: auto;
`;

export const Main = styled.main`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const P = styled.p`
  color: ${lightGreen};
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
`;
