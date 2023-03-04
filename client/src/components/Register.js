import {useState} from 'react'
import { useTranslation } from 'react-i18next';

function Register() {
    const [userData, setUserData] = useState({})
    const {t} = useTranslation();

    const submit = (e) => {
        e.preventDefault()
        console.log("Getting here")

        fetch("/users/register", {
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
            console.log(data.username) // we get a json object called username, which includes a message (success or fail)
            document.getElementById("RegisterMessage").innerHTML = data.username; // show the message
        })
        //window.location.href = "/login";

    }

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <h2>{t("Register")}</h2>
            <form onSubmit={submit} onChange={handleChange}>
                <input type="text" name="username" placeholder='Username'/>
                <input type="password" name="password" placeholder='Password'/>
                <input type="submit" />
            </form>

            <p id="RegisterMessage"/>

        </div>
    )
}

export default Register