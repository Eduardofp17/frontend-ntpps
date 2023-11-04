import styled from 'styled-components';

export const Main = styled.main`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  margin: auto;
`;

export const MainText = styled.h1`
  font-size: 1.4rem;
`;

export const TopicTitle = styled.h2`
  font-size: 1.32rem;
  margin: 0;
`;

export const SubTopicTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

export const Topic = styled.section`
  width: 100%;
  text-align: justify;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SubTopic = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Text = styled.p`
  font-size: 0.956rem;
  text-align: justify;
  margin: 0;
`;
