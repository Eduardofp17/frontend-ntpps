import React from 'react';
import { ModalBox } from './styled';

interface Props {
  ModalOpen: boolean;
  title: string;
  info?: string;
  id?: number;
  button1: JSX.Element;
  button2: JSX.Element;
}
function ModalWithTwoButtons(props: Props): JSX.Element {
  return (
    <React.Fragment>
      <ModalBox style={{ display: props.ModalOpen ? 'flex' : 'none' }}>
        <div className="box">
          <div className="content">
            <div className="texts">
              <h2>{props.title}</h2>
              <p>{props.info}</p>
            </div>
            <div className="buttons">
              {props.button1}
              {props.button2}
            </div>
          </div>
        </div>
      </ModalBox>
    </React.Fragment>
  );
}

export default ModalWithTwoButtons;
