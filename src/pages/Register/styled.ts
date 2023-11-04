import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: auto;
  transition: all 500ms;
  justify-content: center;
  align-items: center;
  .ButtonGroup:not(:last-of-type) {
    border-color: #fff;
  }
`;
export const IMG = styled.img`
  width: 80px;
  margin: auto;
`;

export const Main = styled.main`
  width: 100%;
  padding: 0px 20px;
  padding-bottom: 40px;
`;
