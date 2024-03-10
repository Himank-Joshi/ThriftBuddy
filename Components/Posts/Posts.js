import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import "./Post.css";
import { Firebase } from "../../firebase/config";
import BarLoading from "../Loading/BarLoading";
import PostCards from "../PostCards/PostCards";

import { AllPostContext } from "../../contextStore/AllPostContext";

function Posts() {
  const { setAllPost } = useContext(AllPostContext);
  let [allPosts, setAllPosts] = useState([]);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Firebase.firestore()
      .collection("products")
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        let allPostsData = snapshot.docs.map((product) => ({
          ...product.data(),
          id: product.id,
        }));
        setAllPosts(allPostsData);
        setAllPost(allPostsData);
        setLoading(false);
      });
  }, [setAllPost]);

  let postCards = allPosts.map((product, index) => (
    <div className="post-card" key={index}>
      <PostCards product={product} index={index} />
    </div>
  ));

  return (
    <div className="postParentDiv">
      <div className="heading">
        <span>All Posts</span>
        
      </div>
      <div className="post-cards-container">
        { postCards}
      </div>
    </div>
  );
}

export default Posts;
