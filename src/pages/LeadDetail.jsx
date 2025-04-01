import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchComments } from "../features/commentSlice";
import AddComment from "../components/AddComment";
import EditLeadModal from "../components/EditLeadModal";
import Sidebar from "../components/Sidebar";

const LeadDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { leads, status, error } = useSelector((state) => state.lead);
  const { comments } = useSelector((state) => state.comment);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [dispatch, id]);
  // console.log(comments);
  const lead = leads?.find((l) => l._id === id);

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Error loading lead details</p>;
  if (!lead) return <p>Lead not found</p>;

  return (
    <>
      {" "}
      <h3 className="text-center py-3 shadow">Lead Management: {lead.name}</h3>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-3 text-center py-3 rounded ">
            <Sidebar />
          </div>

          {/* Lead Details */}
          <div className="col-md-9">
            <div className="card shadow-lg rounded p-3 mb-4">
              <h5>Lead Details</h5>
              <p>
                <strong>Sales Agent:</strong> {lead.salesAgent?.name || "N/A"}
              </p>
              <p>
                <strong>Source:</strong> {lead.source}
              </p>
              <p>
                <strong>Status:</strong> {lead.status}
              </p>
              <p>
                <strong>Priority:</strong> {lead.priority}
              </p>
              <p>
                <strong>Time to Close:</strong> {lead.timeToClose} Days
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                Edit Lead Details
              </button>
            </div>

            {/* Comments Section */}
            <div className="card shadow-sm p-3">
              <h5>Comments</h5>
              {comments?.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="border p-2 mb-2">
                    <p>
                      <strong>Author:</strong>{" "}
                      {comment.author?.name || "Unknown"} -{" "}
                      {new Date(comment.createdAt).toLocaleString()}{" "}
                      {/* Format date */}
                    </p>
                    <p>
                      <strong>Comment:</strong> {comment.commentText}
                    </p>
                  </div>
                ))
              ) : (
                <p>No comments yet</p>
              )}

              {/* Add Comment */}
              <AddComment leadId={id} />
            </div>
          </div>
        </div>
      </div>
      <EditLeadModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        lead={lead}
      />
    </>
  );
};

export default LeadDetail;
