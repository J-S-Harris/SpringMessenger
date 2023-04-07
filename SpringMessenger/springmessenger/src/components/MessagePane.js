import React from 'react';
import MessageDisplay from './MessageDisplay'

export default function MessagePane(props) {

    return (
        <div>
           {(props.received !== '' || props.sent !== '') &&
                <MessageDisplay currentUserUsername={props.currentUserUsername} testApiOutput={props.testApiOutput}/>
            }
    


        </div>
    )

}