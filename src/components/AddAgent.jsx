import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSalesAgent } from "../features/salesAgentSlice";

const AddAgent = ({ show, onClose }) => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addSalesAgent(formData));
    setFormData({ name: "", email: "" }); // Reset form
    onClose(); // Close modal
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Sales Agent</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success">
                Add Agent
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAgent;
