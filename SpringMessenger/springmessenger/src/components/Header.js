import React from "react";

export default function Header(props) {

    return (

        <div className="header">

            {props.username !== '' &&
                <div className="flexHorizontal">
                    <h2>Signed in user: {props.username}</h2>

                    <div className="topRightButtons">
                        <button onClick={props.signOut}>Sign out</button>
                        <button onClick={props.sampleApiCall}>Check connection</button>

                        {/* Implement these: */}
                        <button onClick={props.retrieveListOfAllUsers}>All users</button>
                        {/* <button onClick={props.checkUserExists}>Search</button> */}
                    </div>

                </div>

            }
            {props.allUsersList !== "" &&
                <div className="allUsersBox">
                    <button onClick={props.closeAllUsersList}>Close</button>
                    <h3>{props.allUsersList}</h3>
                </div>
            }

        </div>
    )

}