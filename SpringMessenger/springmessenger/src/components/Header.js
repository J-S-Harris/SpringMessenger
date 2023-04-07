import React from "react";

export default function Header(props) {

    return (
        <div className="header">

            {props.username !== '' &&
                <div className="flexHorizontal">
                    <h2>Signed in user: {props.username}</h2>
                    <button onClick={props.signOut}>Sign out</button>
                </div>
            }


        </div>
    )

}