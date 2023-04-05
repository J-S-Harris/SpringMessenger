import React from "react";
import { useState } from "react";
import axios from "axios";
import OptionsPane from "./OptionsPane";
import MessagePane from "./MessagePane";

// Pass these in as state vars
let baseURL = 'http://localhost:8081'
let testApi = '/'
let signInRoot = '/signIn/'
let usernameLookupRoot = '/findByUsername/'
let sendMessageRoot = '/sendMessage/'

export default function ConfigurePane() {

    const [usernameText, setUsernameText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [currentUserUniqueKey, setCurrentUserUniqueKey] = useState("");
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const [returnedUserStringify, setReturnedUserStringify] = useState("");
    const [returnedUserJSON, setReturnedUserJSON] = useState("");
    
    const [currentUserPassword, setCurrentUserPassword] = useState("");
    const [currentUserAdminPrivileges, setCurrentUserAdminPrivileges] = useState("");
   
    const [currentUserReceivedMessages, setCurrentUserReceivedMessages] = useState("");
    const [currentUserSentMessages, setCurrentUserSentMessages] = useState("");
   
    const [recipientUsername, setRecipientUsername] = useState("");
    const [messageBody, setMessageBody] = useState("")
    const [messageTitle, setMessageTitle] = useState("")

    const [testApiOutput, setTestApiOutput] = useState("")


    // For tracking data entered in text boxes
    const updateUsernameText = event => {
        setUsernameText(event.target.value)
    }
    const updatePasswordText = event => {
        setPasswordText(event.target.value)
    }
    const updateRecipientUsername = event => {
        setRecipientUsername(event.target.value)
        console.log("RECIPIENT: "+recipientUsername)
    }
    const updateMessageTitle = event => {
        setMessageTitle(event.target.value)
        console.log(messageTitle)
    }
    const updateMessageBody = event => {
        setMessageBody(event.target.value)
        console.log(messageBody)
    }

    // Just POC for API calls
    function sampleApiCall() {
    axios.get(baseURL+testApi)
        .then ((response) => {
            setTestApiOutput(response.data)
        console.log(testApiOutput)
    })}

    function findUserByUsername(username) {

        let userNameLookupUrl = baseURL+usernameLookupRoot+username;

        axios.get(userNameLookupUrl)
            .then((response) => {
                setReturnedUserStringify(JSON.stringify(response.data))   
                setReturnedUserJSON(JSON.parse(returnedUserStringify));
                
                setCurrentUserUsername(returnedUserJSON.username)
                setCurrentUserPassword(returnedUserJSON.password)
                setCurrentUserUniqueKey(returnedUserJSON.uniqueKey)
                setCurrentUserAdminPrivileges(returnedUserJSON.adminPrivileges)
                setCurrentUserReceivedMessages(returnedUserJSON.receivedMessages)
                setCurrentUserSentMessages(returnedUserJSON.sentMessages)
                
            })
    }

    function sendMessage() {

        let sendMessageURL = baseURL+sendMessageRoot
            +currentUserUsername+'/'
            +recipientUsername+'/'
            +messageTitle+'/'
            +messageBody

        console.log("USERNAME: "+currentUserUsername+"<---")
        console.log("RECIPIENT: "+recipientUsername+" <---")
        console.log("MESSAGE URL: "+sendMessageURL)

        axios.get(sendMessageURL)
            .then((response) => {

                let messageSendResponse = response;
                let messageSendResponseData = JSON.parse(JSON.stringify(messageSendResponse)).data;
                
                if (messageSendResponseData === "Message sent!") {
                    alert(messageSendResponseData)
                } else {
                    alert("Message failed to send :(")
                }
                
                // TO DO: How make recipient, title, and body fields empty
                // after sending a message successfully?

        })
    }
    
    function signIn() {
        
        let signInURL = baseURL+signInRoot+usernameText+'/'+passwordText
        console.log(signInURL)      

        axios.get(signInURL)
        .then((response) => {
                
                console.log("RESPONSE.DATA: "+response.data)
                
                // TO DO: This is bad, rewrite
                // If the returned value is a number,
                // set username to display as signed-in user
                if (response.data >= 0 && response.data <= 1) {
                    setCurrentUserUniqueKey(response.data);
                    setCurrentUserUsername(usernameText);
                    findUserByUsername(currentUserUsername);                    
                    console.log("UNIQUE KEY: "+currentUserUniqueKey)
                } else {
                    setCurrentUserUniqueKey("")
                    setCurrentUserUsername("")
                }
            })
    }

        function signOut() {
            setCurrentUserUniqueKey("");
            setCurrentUserUsername("");
            setCurrentUserPassword("");
            setCurrentUserAdminPrivileges("");
            setCurrentUserReceivedMessages("");
            setCurrentUserSentMessages("");
        }

    return(
        <div className="configurePane">

            <div className="configurePaneBox">

                <div className="usernamePasswordBox">
                <img alt="IMG HERE"></img>
                <h1>{currentUserUsername}</h1>
                </div>
                
                <div className="inputBox">
                <input onChange={updateUsernameText} placeholder="Username" />
                <input onChange={updatePasswordText} placeholder="Password" />
                </div>

                <div className="buttonBox">
                <button onClick={signIn} >Sign in</button>
                <button>Sign up</button>
                <button onClick={signOut}>Sign out</button>
                </div>
    
                <div className="sendMessageBox">
                <input onChange={updateRecipientUsername} placeholder="Recipient" />
                <input onChange={updateMessageTitle} placeholder="Title" />
                <input onChange={updateMessageBody} placeholder="body" />
                <button onClick={sendMessage}>Send Message</button>
                </div>

                <div className="retrieveMessagesBox">
                {/* TO DO: What criteria can I add to filter messages
                    Or do I even want to filter them?*/}
                <input placeholder="Criteria: sender username"></input>
                
                {/* TO DO: onClick={method that returns all messages according to criteria} */}
                <button>Retrieve messages</button>
                </div>

        <button onClick={sampleApiCall}>TEST API</button>
            </div>

        


        <OptionsPane />

        <MessagePane currentUserUsername={currentUserUsername} testApiOutput={testApiOutput}/>


        </div>
    )

}