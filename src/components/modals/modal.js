import React from "react";
import ReactDOM from "react-dom/client";

const modal_root = ReactDOM.createRoot(document.getElementById('modal'));

function removeModal(){
    const modal = document.querySelector('#modal-content')
    modal.animate([{transform:'scale(1)'}, {transform: 'scale(0)'}], {duration: 300});
    setTimeout(() => {  modal_root.render(<></>); }, 280);
    
}

const Modal = (children, bg=true) =>{
    modal_root.render(
        <>
            <div 
                className="fixed h-screen w-screen z-[1000] bg-gray-800 opacity-70" 
                onClick={removeModal}
            ></div>
            
            <div 
                id="modal-content"
                className="z-[1001] w-[90vw] lg:w-3/5 xl:w-3/5 fixed h-min inset-0 m-auto items-center max-h-[80vh] overflow-y-scroll"
            >
                <div className="">

                    <button 
                        className="absolute left-0 z-[1001] bg-blue-200 shadow-lg px-2 rounded"
                        onClick={removeModal}
                    >
                        close
                    </button>
                    {children}
                </div>
            </div>
        </>
    );
}


export default Modal;