import React from 'react';
import MessageDisplay from './MessageDisplay'

export default function MessagePane(props) {

    return (
        <div>
            
    
           <div>
           <MessageDisplay
                    currentUserReceivedMessages={props.currentUserReceivedMessages}
                    currentUserSentMessages={props.currentUserSentMessages}
                    testApiOutput={props.testApiOutput}
                    />

                </div>
            
    


        </div>
    )

}