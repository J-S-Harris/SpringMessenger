import React from "react";
import { useState } from "react";
import axios from "axios";
import OptionsPane from "./OptionsPane";
import MessagePane from "./MessagePane";
import examplelogo from "../images/examplelogo.jpg";
import Header from "./Header"

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
        console.log("RECIPIENT: " + recipientUsername)
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
        axios.get(baseURL + testApi)
            .then((response) => {
                setTestApiOutput(response.data)
                console.log(testApiOutput)
            })
    }

    function findUserByUsername(username) {

        let userNameLookupUrl = baseURL + usernameLookupRoot + username;

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

    function DELETEtestMessageData() {
        setCurrentUserReceivedMessages("TEST");
    }

    function automaticRefreshMessages() {
        // Implement this
        // Refresh stored sent/received messages every 5 seconds.
    }

    function sendMessage() {

        let sendMessageURL = baseURL + sendMessageRoot
            + currentUserUsername + '/'
            + recipientUsername + '/'
            + messageTitle + '/'
            + messageBody

        console.log("USERNAME: " + currentUserUsername + "<---")
        console.log("RECIPIENT: " + recipientUsername + " <---")
        console.log("MESSAGE URL: " + sendMessageURL)

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

    function signUp() {
        alert("Not implemented yet")
    }

    function signIn() {

        let signInURL = baseURL + signInRoot + usernameText + '/' + passwordText
        console.log(signInURL)

        axios.get(signInURL)
            .then((response) => {

                console.log("RESPONSE.DATA: " + response.data)

                // TO DO: This is bad, rewrite
                // If the returned value is a number,
                // set username to display as signed-in user
                if (response.data >= 0 && response.data <= 1) {
                    setCurrentUserUniqueKey(response.data);
                    setCurrentUserUsername(usernameText);
                    findUserByUsername(currentUserUsername);
                    console.log("UNIQUE KEY: " + currentUserUniqueKey)
                } else {
                    alert("No user found matching those details")
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

    return (



        <div className="configurePane">

            <Header username={currentUserUsername} signOut={signOut} />

            {currentUserUsername == '' &&
                <div className="configurePaneBox">

                    <div className="usernamePasswordBox">
                        <img alt="Logo" src={examplelogo}></img>



                        <div className="inputBox">
                            <input onChange={updateUsernameText} placeholder="Username" />
                            <input onChange={updatePasswordText} placeholder="Password" />
                        </div>

                        <div className="buttonBox">
                            <button onClick={signIn} >Sign in</button>
                            <button onClick={signUp}>Sign up</button>

                        </div>

                    </div>

                </div>
            }

            {currentUserUsername !== "" &&
                <div>

                    <div>

                        <div className="sendMessageBox">
                            <div className="flexHorizontal">
                                <input onChange={updateRecipientUsername} placeholder="Recipient" />
                                <input onChange={updateMessageTitle} placeholder="Title" />
                            </div>
                            <input onChange={updateMessageBody} placeholder="body" />
                            <button onClick={sendMessage}>Send Message</button>
                        </div>

                        <div className="retrieveMessagesBox">
                            <div className="flexHorizontal">
                                {/* TO DO: onClick={method: returns all RECEIVED messages. Clears SENT messages} */}
                                <input placeholder="Sender"></input>
                                <button onClick={DELETEtestMessageData}>Retrieve received messages</button>
                            </div>
                            
                            <hr />

                            <div className="flexHorizontal">
                                {/* TO DO: onClick={method: returns all RECEIVED messages. Clears SENT messages} */}
                                <input placeholder="Recipient"></input>
                                <button onClick={DELETEtestMessageData}>Retrieve sent messages</button>
                            </div>
                        </div>


                    </div>




                    <OptionsPane />

                    <MessagePane received={currentUserReceivedMessages}
                        sent={currentUserSentMessages} testApiOutput={testApiOutput} />

                </div>
            }

        </div>
    )

}