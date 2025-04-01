import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../features/commentSlice";

const AddComment = ({ leadId }) => {
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();

  const leads = useSelector((state) => state.lead.leads);

  const lead = leads?.find((l) => l._id === leadId);

  const author = lead?.salesAgent
    ? { _id: lead.salesAgent._id, name: lead.salesAgent.name }
    : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return alert("Comment cannot be empty!");

    dispatch(addComment({ leadId, commentText, author }));
    console.log({ author });
    setCommentText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
        className="form-control my-2"
        required
      />
      <button type="submit" className="btn btn-primary">
        Submit Comment
      </button>
    </form>
  );
};

export default AddComment;
