import React from "react";
import { comments } from "../../data/comments";

export default function Comment({ comment }) {
  return <h1>{comment.text}</h1>;
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { commentId: "1" } },
      { params: { commentId: "2" } },
      { params: { commentId: "3" } },
    ],
    fallback: false,
  };
}


export async function getStaticProps({ params: {commentId} }) {
    console.log(commentId);
    const comment = comments.find(({ id }) => id === parseInt(commentId));
    console.log(comment);
    return {
      props: {
        comment,
      },
    };
  }