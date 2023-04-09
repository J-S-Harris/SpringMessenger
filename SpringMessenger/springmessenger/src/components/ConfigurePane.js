import React from "react";
import { useState } from "react";
import axios from "axios";
import OptionsPane from "./OptionsPane";
import MessagePane from "./MessagePane";
import examplelogo from "../images/examplelogo.jpg";
import Header from "./Header"
import AllUsersOutput from "./AllUsersOutput";
import SendCheckMessagesBox from "./SendCheckMessagesBox";
import MessageDisplay from "./MessageDisplay";

// Pass these in as state vars
let baseURL = 'http://localhost:8081'
let testApi = '/'
let signInRoot = '/signIn/'
let usernameLookupRoot = '/findByUsername/'
let sendMessageRoot = '/sendMessage/'
let retrieveListRoot = "/returnAllUsers"
let retrieveAllMessagesReceivedRoot = "/checkMessagesReceived"
let retrieveAllMessagesSentRoot = "/checkMessagesSent"
// + {currentUserUsername}

let userOutputList;


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

    const [allUsersList, setAllUsersList] = useState("")

    const [checkSendMessageBox, setCheckSendMessageBox] = useState('false')
    const [sendMessageBoxVisible, setSendMessageBoxVisible] = useState("false")
    const [checkMessageBoxVisible, setCheckMessageBoxVisible] = useState("false")
    const [checkMessageOutputVisible, setCheckMessageOutputVisible] = useState("false")

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



    // VARIOUS FUNCTIONS:

    // Just POC for API calls
    function sampleApiCall() {
        axios.get(baseURL + testApi)
            .then((response) => {
                setTestApiOutput(response.data)
                console.log(testApiOutput)
            })
    }

    function closeAllUsersList() {
        setAllUsersList("")
    }

    function setSendMessageToTrue() {
        setSendMessageBoxVisible("true")
    }
    function setSendMessageToFalse() {
        setSendMessageBoxVisible("false")
    }

    function setCheckMessageBoxVisibleToTrue() {
        setCheckMessageBoxVisible("true")
    }
    function setCheckMessageBoxVisibleToFalse() {
        setCheckMessageBoxVisible("false")
        setCurrentUserReceivedMessages("")
        setCheckMessageOutputVisibleToFalse();
    }
    function setCheckMessageOutputVisibleToTrue() {
        setCheckMessageOutputVisible("true")
    }
    function setCheckMessageOutputVisibleToFalse() {
        setCheckMessageOutputVisible("false")
    }


    function setCurrentUserReceivedMessagesToFalse() {
        setCurrentUserReceivedMessages('')
        setCheckMessageOutputVisibleToFalse();
    }

    // API FUNCTIONS

    function retrieveListOfAllUsers() {
        let allUsers = baseURL + retrieveListRoot;
        axios.get(allUsers)
            .then((response) => {

                setAllUsersList("")
                userOutputList = ""
                let userResponse = response;

                for (let i = 0; i < userResponse.data.length; i++) {
                    // for (let i = 0; userResponse.length-1; i++) {
                    console.log(userResponse.data[i].username)
                    userOutputList += userResponse.data[i].username + " "
                }

                setAllUsersList(userOutputList)
                console.log(allUsersList)
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

    function retrieveAllReceivedMessages() {
        let messageURL = baseURL + retrieveAllMessagesReceivedRoot + '/' + currentUserUsername
        console.log("USERNAME received: " + currentUserUsername)
        axios.get(messageURL)
            .then((response) => {
                console.log(response)
            })
        setCheckMessageOutputVisibleToTrue();
    }

    function retrieveAllSentMessages() {

        let messageURL = baseURL + retrieveAllMessagesSentRoot + '/' + currentUserUsername
        console.log("USERNAME sent: " + currentUserUsername)
        axios.get(messageURL)
            .then((response) => {
                console.log(response)
            })

            setCheckMessageOutputVisibleToTrue();
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
                    setMessageBody("");
                    setSendMessageBoxVisible('false')

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

        setCheckMessageBoxVisibleToFalse();
        setSendMessageToFalse();

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
                    setCheckSendMessageBox('true');
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

        setCheckSendMessageBox('false')
        setCheckMessageBoxVisibleToFalse();
        setSendMessageToFalse();

        closeAllUsersList()
    }

    return (



        <div className="configurePane">

            <Header closeAllUsersList={closeAllUsersList} allUsersList={allUsersList} username={currentUserUsername} signOut={signOut} sampleApiCall={sampleApiCall} retrieveListOfAllUsers={retrieveListOfAllUsers} />

            {currentUserUsername !== '' && allUsersList !== '' &&
                <AllUsersOutput allUsersList={allUsersList} />
            }

            {/*  For Signing in: */}
            {currentUserUsername === '' &&
                <div className="configurePaneBox">

                    <div className="usernamePasswordBox">
                        <img alt="Logo" src={examplelogo}></img>

                        <div className="inputBox">
                            <input onChange={updateUsernameText} placeholder="Username" />
                            <input onChange={updatePasswordText} placeholder="Password" type="password" />
                        </div>

                        <div className="buttonBox">
                            <button onClick={signIn} >Sign in</button>
                            <button onClick={signUp}>Sign up</button>

                        </div>
                    </div>
                </div>
            }

            {/* Once signed in: */}

            {checkSendMessageBox === 'true' && sendMessageBoxVisible === "false" && checkMessageBoxVisible === "false" &&

                <SendCheckMessagesBox setCheckMessageBoxVisibleToTrue={setCheckMessageBoxVisibleToTrue}
                    setSendMessageToTrue={setSendMessageToTrue} />


            }



            {currentUserUsername !== "" &&
                <div>
                    <div>
                        {sendMessageBoxVisible === 'true' &&
                            <div>
                                <div className="sendMessageBox">
                                    <div className="flexHorizontal">
                                        <input onChange={updateRecipientUsername} placeholder="Recipient" />
                                        <input onChange={updateMessageTitle} placeholder="Title" />
                                    </div>
                                    <input onChange={updateMessageBody} placeholder="body" />
                                    <button onClick={sendMessage}>Send Message</button>
                                    <button onClick={setSendMessageToFalse}>Close</button>
                                </div>
                            </div>
                        }

                        {checkMessageBoxVisible === 'true' &&

                            <div className="retrieveMessagesBox">
                                <div className="flexHorizontal">
                                    {/* TO DO: onClick={method: display RECEIVED messages} */}
                                    <input placeholder="Sender"></input>
                                    <button onClick={retrieveAllReceivedMessages}>Retrieve received messages</button>
                                </div>



                                <div className="flexHorizontal">
                                    {/* TO DO: onClick={method: display SENT messages} */}
                                    <input placeholder="Recipient"></input>
                                    <button onClick={retrieveAllSentMessages}>Retrieve sent messages</button>
                                </div>
                                <button onClick={setCheckMessageBoxVisibleToFalse}>Close</button>
                                <button onClick={setCurrentUserReceivedMessagesToFalse}>Clear messages</button>
                            </div>
                        }

                    </div>




                    <OptionsPane />




                    {/* <MessagePane
                    currentUserReceivedMessages={currentUserReceivedMessages}
                    currentUserSentMessages={currentUserSentMessages}
                    testApiOutput={testApiOutput}
                    /> */}

                    {checkMessageOutputVisible == 'true' &&
                        <MessageDisplay currentUserUsername={currentUserUsername}
                            currentUserReceivedMessages={currentUserReceivedMessages}
                            currentUserSentMessages={currentUserSentMessages}
                        />
                    }


                </div>

            }

        </div >
    )

}