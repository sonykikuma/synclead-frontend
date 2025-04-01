import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalesAgents } from "../features/salesAgentSlice";
import { addLeads } from "../features/leadSlice";

const AddLead = ({ show, handleClose }) => {
  const { agents } = useSelector((state) => state.agents);
  const dispatch = useDispatch();

  const [leadName, setLeadName] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [salesAgents, setSalesAgents] = useState([]);
  const [leadStatus, setLeadStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [timeToClose, setTimeToClose] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch(fetchSalesAgents());
  }, [dispatch]);

  const handleSubmit = () => {
    const selectedAgents = agents
      .filter((agent) => salesAgents.includes(agent.name)) // Find matching agent objects
      .map((agent) => agent._id); // Extracting their IDs

    const newLead = {
      name: leadName,
      source: leadSource,
      salesAgent: selectedAgents,
      status: leadStatus,
      priority,
      timeToClose,
      tags,
    };

    console.log("New Lead:", newLead);
    dispatch(addLeads(newLead)).then((res) => {
      if (res.payload) {
        alert("Lead added successfully!");
        handleClose();
      } else {
        alert("Failed to add lead");
      }
    });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Lead</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Lead Name</Form.Label>
            <Form.Control
              type="text"
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Lead Source</Form.Label>
            <Form.Select
              value={leadSource}
              onChange={(e) => setLeadSource(e.target.value)}
            >
              <option value="">Select Source</option>
              <option value="Referral">Referral</option>
              <option value="Cold Call">Cold Call</option>
              <option value="Website">Website</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Email">Email</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Sales Agent</Form.Label>
            <Form.Control
              as="select"
              multiple
              value={salesAgents}
              onChange={(e) =>
                setSalesAgents(
                  [...e.target.selectedOptions].map((o) => o.value)
                )
              }
            >
              <option value="">Select Sales Agent</option>
              {agents.length > 0 ? (
                agents.map((agent) => (
                  <option key={agent.id} value={agent.name}>
                    {agent.name}
                  </option>
                ))
              ) : (
                <option disabled>Loading agents...</option>
              )}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Lead Status</Form.Label>
            <Form.Select
              value={leadStatus}
              onChange={(e) => setLeadStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Priority</Form.Label>
            <Form.Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Time to Close (Days)</Form.Label>
            <Form.Control
              type="number"
              value={timeToClose}
              onChange={(e) => setTimeToClose(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Tags</Form.Label>
            <Form.Control
              as="select"
              multiple
              value={tags}
              onChange={(e) =>
                setTags([...e.target.selectedOptions].map((o) => o.value))
              }
            >
              <option value="Urgent">Urgent</option>
              <option value="Follow-up">Follow-up</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create Lead
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddLead;
