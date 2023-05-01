import { ModalBox } from './styled';

interface Props {
  ModalOpen: boolean;
  title: string;
  button1: JSX.Element;
  button2: JSX.Element;
  input: JSX.Element;
}
function ModalWithTwoInputs(props: Props): JSX.Element {
  return (
    <>
      <ModalBox style={{ display: props.ModalOpen ? 'flex' : 'none' }}>
        <div className="box ModalCreating" style={{ zIndex: 10 }}>
          <div className="content ModalCreating">
            <div className="text ModalCreating">
              <h2 className="ModalCreating">{props.title}</h2>
              {props.input}
            </div>
            <div className="buttons ModalCreating">
              {props.button1}
              {props.button2}
            </div>
          </div>
        </div>
      </ModalBox>
    </>
  );
}

export default ModalWithTwoInputs;
