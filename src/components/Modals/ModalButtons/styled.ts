import styled from 'styled-components';

export const ModalBox = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  .box {
    background-color: #fff;
    width: 340px;
    max-height: 40%;
    top: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;

    border-radius: 15px;
    box-shadow: 20px 20px 60px rgba(0, 0, 0, 0.25),
      -20px -20px 60px rgba(255, 255, 255, 0.16);
    padding: 0px;
    z-index: 3;
  }

  .box .content {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;
  }
  h2 {
    font-size: 19px;
  }
  p {
    font-size: 15px;
  }
  .texts {
    margin: auto;
    text-align: center;
    padding: 5px;
  }
  .buttons {
    width: 330px;
    margin: auto;
    display: flex;
    flex-direction: row;
    gap: 10px;
    button {
      width: 50%;
      padding: 5px;
      border: none;
    }
  }
`;
