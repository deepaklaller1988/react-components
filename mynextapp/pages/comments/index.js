//API Routes

import {useState, useEffect} from 'react';

const Comments = ()=>{
 const [cmnt, setCmnt] = useState([]);
 const [comment, setComment] = useState('')

 const fetchComments = async () => {
    const response = await fetch('/api/comments')
    const data = await response.json()
    setCmnt(data)
  }

  const submitComment = async () => {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data)
  }

  const deleteComment = async commentId => {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE'
    })
    const data = await response.json()
    console.log(data)
    fetchComments()
  }

 return(
     <div>
         <input
          type='text'
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <button onClick={submitComment}>Submit comment</button>
          <button onClick={fetchComments}>Load comments</button>
         {
             cmnt.map(item=>{
                 return (
                     <div key={item.id}> 
                         {item.id} {item.text}
                         <button onClick={() => deleteComment(item.id)}>Delete</button>
                     </div>
                 )
             })
         }
     </div>
 )
}

export default Comments