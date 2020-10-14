
import React, {useReducer, useRef, useEffect, useState} from 'react'
import { useForm } from 'react-hook-form';
import generator from 'generate-password'
import Comment from './Comment.js'
import mergeRefs from "react-merge-refs";
import axios from 'axios'

const ACTIONS = {
ADD: 'ADD',
REMOVE: 'REMOVE',
EDIT: 'EDIT'
}

function reducer(comments, action) {
switch (action.type) {
case (ACTIONS.ADD):
return [...comments, newComment(action.payload.title, action.payload.content, action.payload.date)]
default:
    return comments
}
}

function newComment(title, content, date){
return {title, content, date}
}

// ---------------------------------------------------- Component

function Form({data}) {
const { register, handleSubmit } = useForm();
const [comment, dispatch] = useReducer(reducer, data);
const [error, setError] = useState(false)


useEffect(() => {
const throwError = () => {
if(error)  throw new Error('I crashed!');
}; throwError();
}, [error])

const contentInput = useRef();
const form = useRef();

const onSubmit = async ({ title, content }) => {
let date = new Date().toDateString() + ", " + new Date().toLocaleString().substr(12, 11)
await axios.post('/post', {
title, content, date
})
dispatch({type:ACTIONS.ADD, payload: {title, content, date}});
form.current.reset();
}

  const handleFocus = (event) => {
    if (event.key === 'Enter') {
    contentInput.current.focus();
    }
  }

    return (
        <div>
<h2 className="commentsTitle">Comments:</h2> 
{comment.map(element => {
return <Comment 
key={generator.generate({
    length: 10,
    numbers: true
})}
comment={element}
/>
})}

<br/>
<hr style={{marginBottom:"100px"}}/>

<h2 style={{color:"rgb(50, 50, 50)"}}>
<i className="fa fa-comment"></i> New Comment
</h2> 

   <form className="postComment" ref={form} onSubmit={handleSubmit(onSubmit)}>
      <textarea placeholder="title..." rows="1" maxLength="100" required className="inputTitle" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault()}} onKeyUp={handleFocus} name="title" ref={register} />
      <textarea placeholder="content..." rows="10" className="inputContent" name="content" ref={mergeRefs([register, contentInput])} />
      <input className="submitButton" type="submit" />
    </form>
    <br/>
    <button onClick={() => {setError(true)}}>Error</button>
        </div>
    )
}

export default Form
