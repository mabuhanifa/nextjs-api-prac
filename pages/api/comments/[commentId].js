import { comments } from "../../../data/comments";

export default function handler(req, res) {
  const { commentId } = req.query;
  const comment = comments.find(({ id }) => id === parseInt(commentId));
  res.status(200).json(comment);
}
