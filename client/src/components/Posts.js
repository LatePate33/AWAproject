import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';


function Posts() {
    const { id } = useParams()
    const [data, setData] = useState("");
    const [comments, setComments] = useState([]);
    const [userData, setUserData] = useState({})
    const { t } = useTranslation();

    // Populate the {id} - {data.name} that shows the CodeSnippet
    useEffect(() => {
        fetch("/api/data/" + id)
            .then(response => response.json())
            .then(json => setData(json))

    }, [id])

    // Populate the table that shows comments
    useEffect(() => {
        fetch("/api/comments/" + id)
            .then(response => response.json())
            .then(json => setComments(json))

    }, [id])

    const submit = (e) => {
        e.preventDefault()
        console.log("Getting here")
        console.log(id);
        console.log(userData);

        fetch("/api/createComment", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData),
            mode: "cors"
        })
            .then(response => response)
            .then(data => {
                console.log(data)
                console.log(data.statusText) /// get statusmessage (success, fail, forbidden) 
                document.getElementById("CommentMessage").innerHTML = data.statusText; // show statusmessage
            })

    }

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value, id: id })
    }

    return (
        <div>
            {id} - {data.name}
            <h1>{t("Comments")}</h1>

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <table>
                    <tbody>
                        {comments.map((d) => (
                            <tr key={d._id}>
                                <td >{d.name}</td>
                            </tr>
                            // Map comments to the table
                        ))}
                    </tbody>

                </table>
            </Box>


            <h2>{t("Comment")}</h2>
            <form onSubmit={submit} onChange={handleChange}>
                <input type="text" name="comment" />
                <input type="submit" />
            </form>

            <p id="CommentMessage" />
        </div>
    )
}

export default Posts