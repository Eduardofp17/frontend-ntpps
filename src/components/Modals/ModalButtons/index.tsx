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
        <div className="box ModalWithTwoButtons" style={{ zIndex: 10 }}>
          <div className="content ModalWithTwoButtons">
            <div className="texts ModalWithTwoButtons">
              <h2 className="ModalWithTwoButtons">{props.title}</h2>
              <p className="ModalWithTwoButtons">{props.info}</p>
            </div>
            <div className="buttons ModalWithTwoButtons">
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
