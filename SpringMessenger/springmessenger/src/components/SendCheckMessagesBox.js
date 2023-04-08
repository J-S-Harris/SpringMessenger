import React from "react";

export default function SendCheckMessagesBox(props) {

    return (
        <div className="SendCheckMessagesBox">

            <button onClick={props.setSendMessageToTrue}>Send message</button>

            <button onClick={props.setCheckMessageBoxVisibleToTrue}>Check messages</button>
            
        </div>
    )

}