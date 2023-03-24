import styled from 'styled-components';
import { primaryGreen } from '../../config/collors/colors';

export const MainComponent = styled.div`
  background-color: ${primaryGreen};
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 310px;
  z-index: 1;
  color: white;
  padding: 10px 20px;
  transition: all ease-in 0.3s;
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 20px;
  .ConfigHeader {
    display: flex;
    flex-direction: row;
    text-align: center;
    justify-content: space-between;
    border-bottom: 1px solid #fff;
    width: 100%;
    height: 50px;
  }
  .config {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;
