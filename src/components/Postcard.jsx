import React, { useState } from 'react';
import './Postcard.css';
import user from "../assets/useric.png"

const Postcard = (props) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);

  const handleLikeClick = () => {
    setLikes(likes + 1);
  };

  const handleCommentClick = () => {
    const newComment = prompt('Enter your comment:');
    if (newComment) {
      setComments([...comments, newComment]);
    }
  };

  

  return (
    <div className='main'>
    <div className="postcard">
      <div className="user-profile">
        <img src={user}/>
        <div className='user-info'>
          <span>{props.Username}</span>
          <button>{props.TechStack}</button>
        </div>
      </div>
      <div className="postcard-message">
        <p>{props.content}</p>
      </div>
      {/* <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#django</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#java</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#ai</span> */}
      <hr />
      <div className="postcard-actions">
      <p>{props.feedback}</p>
        <div className='likes'>
        <button onClick={handleLikeClick}>Like ({likes})</button>
        </div>
        <div className='comment'>
        <button onClick={handleCommentClick} >Comment ({comments.length})</button>
        </div>
      </div>
      <hr />
      <div className="postcard-comments">
        <ul className='comments'>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Postcard;