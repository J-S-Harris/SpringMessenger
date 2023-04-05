import React from 'react';

export default function MessageDisplay(props) {


    return (
        <div className="messageOutputBox">

            <h2>Name: {props.currentUserUsername}</h2>
            <h1>Test API output: {props.testApiOutput}</h1>
        </div>
    )

}