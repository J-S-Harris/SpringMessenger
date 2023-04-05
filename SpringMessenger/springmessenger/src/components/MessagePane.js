import React from 'react';
import MessageDisplay from './MessageDisplay'

export default function MessagePane(props) {

    return (
        <div>
        <MessageDisplay currentUserUsername={props.currentUserUsername} testApiOutput={props.testApiOutput}/>
        <MessageDisplay currentUserUsername={props.currentUserUsername} testApiOutput={props.testApiOutput}/>
        <MessageDisplay currentUserUsername={props.currentUserUsername} testApiOutput={props.testApiOutput}/>
        <MessageDisplay currentUserUsername={props.currentUserUsername} testApiOutput={props.testApiOutput}/>


        </div>
    )

}