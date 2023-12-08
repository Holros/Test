import { useEffect, useRef, memo } from 'react';
import style from "../css/modal.module.css";
function Modal({ data, show, setShow }) {
  const modalElement = useRef(null)
  const hideModal = () => {
    setShow(false)
  }  
  
  useEffect(()=>{
    if(show) {
      
    modalElement.current.style.display = "flex" 
     }
     else{
       
    modalElement.current.style.display = "none "
     }
  }, [show])
  return (
    <div  ref={modalElement} className={style.modal}>
      <div className={style.modalContent}>
        <h2 style={{textAlign:"center", margin:"10px"}}>Your details has been submitted  </h2>
        <p style={{marginBottom:"15px", alignSelf:"flex-start"}}>Here Is The Response</p>
        <div style={{alignSelf:"flex-start"}}>
          {data.error}
        </div>
        <br/>
        <button onClick={hideModal} style={{backgroundColor:"green",padding:"10px 20px",color:"white",border:"none",borderRadius:"8px", outline:"2px solid white", position:"absolute", bottom:"15px"}}>Close</button>
      </div>  
    </div>
  );
}
export default memo(Modal);
