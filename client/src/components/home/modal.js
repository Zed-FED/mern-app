import React from "react";
import ReactDOM from "react-dom";

const Modal = ({children, ...otherProps}) => {
	return ReactDOM.createPortal(
		<>	
			<div className="modal" {...otherProps}>
		  	{children}
		  </div>
		</>,
		document.getElementById("modal")
		)
};

export default Modal;