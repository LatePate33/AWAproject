import {Link} from 'react-router-dom'

// Make each CodeSnippet clickable link to the corresponding id
function PostsItems({data}) {
    return (
        <tr>
            <td>{data.id}</td><td><Link to={`/data/${data.id}`}>{data.name}</Link></td>
        </tr>
    )
}


export default PostsItems