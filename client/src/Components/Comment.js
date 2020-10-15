import React, {useState} from 'react'

function Comment({comment}) {
const [content, setContent] = useState(null)


    return (

<details className="commentBody">
<summary>
<strong>
{comment.title}
<div style={{fontSize:"12px", color:"grey", fontWeight:"normal"}}>{comment.date}</div>
</strong>
</summary>
<div>
{comment.content.split("&&").map(function(item, index) {
        return (
            <span key={index}>
                {item}
                <br/>
            </span>)})}
</div>   
</details>
    )
}

export default Comment
