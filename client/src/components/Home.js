import PostsItems from './PostsItems'
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';

import { useEffect, useState } from 'react'

function Home() {
    const [userData, setUserData] = useState({});
    const [data, setData] = useState([])
    const { t } = useTranslation();

    // When home page gets loaded populate the table
    useEffect(() => {
        fetch("api/data")
            .then(response => response.json())
            .then(json => setData(json))

    }, [])

    const submit = (e) => {
        e.preventDefault()
        console.log("Getting here")

        fetch("/api/createPost", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData),
            mode: "cors"
        })
            .then(response => response)
            .then(data => {
                console.log(data.statusText) // get statusmessage (success, fail, forbidden)
                document.getElementById("PostMessage").innerHTML = data.statusText; // show statusmessage
            })

    }

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    // Should have probably used textarea,picture... rather than text as the CodeSnippet can be quite large
    return (
        <div>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <table>
                    <thead><tr><td>Id</td><td>{t("Post")}</td></tr></thead>
                    <tbody>
                        {data.map((d) => ( // map each CodeSnippet to the table with the help of PostsItems
                            <PostsItems key={d.id} data={d} />
                        ))}
                    </tbody>

                </table>
            </Box>

            <h2>{t("Create post")}</h2>

            <form onSubmit={submit} onChange={handleChange}>
                <input type="text" name="post" />
                <input type="submit" />
            </form>

            <p id="PostMessage" />
        </div>

    )
};



export default Home