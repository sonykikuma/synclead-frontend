import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";
import { fetchLeads } from "../features/leadSlice";

const baseUrl = "https://lead-sync-backend.vercel.app";

const EditLeadModal = ({ show, handleClose, lead }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: lead.name,
    source: lead.source,
    status: lead.status,
    priority: lead.priority,
    timeToClose: lead.timeToClose,
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseUrl}/leads/${lead._id}`, formData);
      dispatch(fetchLeads());
      handleClose();
    } catch (err) {
      console.error("Error updating lead:", err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Lead</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Source</Form.Label>
            <Form.Control
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Time to Close (Days)</Form.Label>
            <Form.Control
              type="number"
              name="timeToClose"
              value={formData.timeToClose}
              onChange={handleChange}
              min="1"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditLeadModal;
