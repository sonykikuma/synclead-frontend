import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import { fetchLeads } from "../features/leadSlice";
import { Button, Form } from "react-bootstrap";
import { fetchSalesAgents } from "../features/salesAgentSlice";
import { Link } from "react-router-dom";
import AddLead from "../components/AddLead";

const LeadList = () => {
  const dispatch = useDispatch();
  const { leads, status } = useSelector((state) => state.lead);
  const { agents } = useSelector((state) => state.agents);

  const [filteredLeads, setFilteredLeads] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [salesAgentFilter, setSalesAgentFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchLeads());
    dispatch(fetchSalesAgents());
  }, [dispatch]);

  //console.log(agents);

  useEffect(() => {
    let updatedLeads = [...leads];

    if (statusFilter) {
      updatedLeads = updatedLeads.filter(
        (lead) => lead.status === statusFilter
      );
    }

    if (salesAgentFilter) {
      updatedLeads = updatedLeads.filter(
        (lead) => lead.salesAgent?.name === salesAgentFilter
      );
    }

    if (sortBy === "Priority") {
      updatedLeads.sort(
        (a, b) =>
          ["Low", "Medium", "High"].indexOf(a.priority) -
          ["Low", "Medium", "High"].indexOf(b.priority)
      );
    }
    if (sortBy === "Time to Close") {
      updatedLeads.sort((a, b) => a.timeToClose - b.timeToClose);
    }

    setFilteredLeads(updatedLeads);
  }, [leads, statusFilter, salesAgentFilter, sortBy]);

  return (
    <>
      <h1 className="text-center py-3 shadow"> LeadSync List</h1>
      <div className="container my-5">
        <div className="row gap-3">
          <div className="col-md-3 text-center py-3 rounded ">
            <Sidebar />
          </div>

          <div className="col-md-6">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>Lead Overview</h3>
            </div>

            {/* Filters */}
            <div className="d-flex gap-3 mb-3">
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Filter by Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Closed">Closed</option>
              </Form.Select>

              <Form.Select
                value={salesAgentFilter}
                onChange={(e) => setSalesAgentFilter(e.target.value)}
              >
                <option value="">Filter by Sales Agent</option>
                {agents.map((agent) => (
                  <option key={agent._id} value={agent.name}>
                    {agent.name}
                  </option>
                ))}
              </Form.Select>

              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Sort by</option>
                <option value="Priority">Priority</option>
                <option value="Time to Close">Time to Close</option>
              </Form.Select>
            </div>

            {/* Lead List */}
            <div className="list-group">
              {status === "loading" ? (
                <p>Loading...</p>
              ) : filteredLeads.length === 0 ? (
                <p>No leads found.</p>
              ) : (
                filteredLeads.map((lead) => (
                  <div
                    key={lead._id}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <span>
                      {lead.name} - {lead.status} - {lead.salesAgent?.name}
                    </span>
                    <span
                      className={`badge bg-${
                        lead.priority === "High"
                          ? "danger"
                          : lead.priority === "Medium"
                          ? "warning"
                          : "success"
                      }`}
                    >
                      {lead.priority}
                    </span>
                  </div>
                ))
              )}
              <Link className="my-4">
                <Button variant="primary" onClick={(e) => setShowModal(true)}>
                  Add New Lead
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <AddLead show={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

export default LeadList;
