import styled from 'styled-components';

export const Main = styled.main`
  max-width: 700px;
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 0px;
  padding-bottom: 20px;
`;
export const CardapiosSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 10px 20px;
`;
export const CardapiosContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const CardapiosEvenComponent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 10px;
`;
export const CardapiosOddComponent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 10px;
`;
