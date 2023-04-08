import React from 'react';
import MessageDisplay from './MessageDisplay'

export default function MessagePane(props) {

    return (
        <div>
            
           {(props.currentUserReceivedMessages !== '' || props.currentUserSentMessages !== '') &&
           <div>
                <MessageDisplay
                currentUserReceivedMessages={props.currentUserReceivedMessages}
                currentUserSentMessages={props.currentUserSentMessages.data.recipientUserName}
                currentUserUsername={props.currentUserUsername}
                testApiOutput={props.testApiOutput}
                />

                </div>
            }
    


        </div>
    )

}