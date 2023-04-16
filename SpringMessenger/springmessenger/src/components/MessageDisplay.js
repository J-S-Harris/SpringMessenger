import React from 'react';

export default function MessageDisplay(props) {

    let outputArray = []

    console.log(props.currentUserUsername)
    console.log(props.testApiOutput)

    console.log("LENGTH: " + props.rawResponse.length)

    for (let i = 0; i < props.rawResponse.length; i++) {

        outputArray.push(
            <div>
                <div className="senderReceiverBox">
                <div clasName="flexHorizontal">
                    <div className="toBox">
                        <h2>To:</h2>
                        <h2>{props.rawResponse[i].recipientUsername} </h2>
                    </div>
                    <div className="fromBox">
                        <h2>From:</h2>
                        <h2>{props.rawResponse[i].senderUsername} </h2>
                    </div>
                </div>
                <div className="titleBodyBox">
                <h3 className="title">{props.rawResponse[i].title} </h3>
                <h3 className="body">{props.rawResponse[i].body} </h3>
                </div>
            </div>
            </div>
        )
    }

    return (
        <div className="messageOutputBox">
            {outputArray}
        </div>
    )

}