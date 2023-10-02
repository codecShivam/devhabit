import React from "react";
import Postcard from "../../components/Postcard";
import postcardsData from "../../Data/details.json"

const Communitypage = () => {
    return (
        <div>
        {postcardsData.map((postcard) => (
        <Postcard
          Username={postcard.Username}
          TechStack={postcard.TechStack}
          content={postcard.content}
          feedback={postcard.feedback}
        />
        ))}
        </div>
    );
    }

export default Communitypage;
