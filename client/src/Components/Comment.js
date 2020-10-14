import React from 'react'

function Comment({comment}) {
    return (

<details className="commentBody">
<summary>
<strong>
{comment.title}
<div style={{fontSize:"12px", color:"grey", fontWeight:"normal"}}>{comment.date}</div>
</strong>
</summary>
<div>
{comment.content}
</div>   
</details>
    )
}

export default Comment
