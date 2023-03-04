import {useState} from 'react'
import {Buffer} from 'buffer'
import { useTranslation } from 'react-i18next';

function Login({setJwt, jwt, setUser}) {
    const [userData, setUserData] = useState({})
    const {t} = useTranslation();

    const submit = (e) => { 
        e.preventDefault()
        console.log("Getting here")

        fetch("/users/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if(data.token) {
                    setJwt(data.token) // to set the welcome message in App.js
                    setUser(JSON.parse(Buffer.from(data.token.split(".")[1], "base64").toString())) // to set the welcome message in App.js
                    document.getElementById("LoginMessage").innerHTML = "Login successful" // if we get the token from the server, login was succesful
                } else {
                    document.getElementById("LoginMessage").innerHTML = "Login failed"
                }
            })

    }

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <h2>{t("Login")}</h2>
            <form onSubmit={submit} onChange={handleChange}>
                <input type="text" name="username" placeholder='Username'/>
                <input type="password" name="password" placeholder='Password'/>
                <input type="submit" />
            </form>

            <p id="LoginMessage"/>
        </div>
    )
}

export default Login