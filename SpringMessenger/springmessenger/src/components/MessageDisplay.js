import React from 'react';

export default function MessageDisplay(props) {

    console.log(props.currentUserUsername)
    console.log(props.testApiOutput)
    console.log(props.currentUserReceivedMessages)
    return (
        <div className="messageOutputBox">
            <h2>Name: {props.currentUserUsername}</h2>


            {/* Have to iterate through these
            in MessagePANE, and in pass these into a
            variable quantity of MessageDISPLAY: */}
            <h3>Received: {props.currentUserReceivedMessages}</h3>
            <h3>Sent: {props.currentUserSentMessages}</h3>
        </div>
    )

}