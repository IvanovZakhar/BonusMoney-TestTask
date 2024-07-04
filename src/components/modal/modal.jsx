 
import './modal.css'


const Modal = ({stateModal, setStateModal, textModal}) => {
     
    return(
        <div className="modal" style={{visibility: `${stateModal ? 'visible' : 'hidden'}`}}>
            <div className="main-block">
                 <p className='text__main-block'>{textModal}</p>
                 <button className='btn__main-block' onClick={() => {setStateModal(false)}}>Хорошо</button>
            </div>
            <button className="close-modal" onClick={() => {setStateModal(false)}}>
                X
            </button>
        </div>
    )
}

export default Modal;