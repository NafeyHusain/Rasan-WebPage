import React from "react";
import "./style.css";
const Card = (props) => {
    return (
        <div className="card" {...props}>
            <div className="cardHeader">
                {props.headerleft && <div>{props.headerleft}</div>}
                {props.headerright && <div>{props.headerright}</div>}
            </div>
            {props.children}
        </div>
    );
};

export default Card;
