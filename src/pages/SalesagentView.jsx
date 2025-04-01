import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import { fetchLeads } from "../features/leadSlice";
import { fetchSalesAgents } from "../features/salesAgentSlice";

const SalesagentView = () => {
  const { leads } = useSelector((state) => state.lead);
  const { agents } = useSelector((state) => state.agents);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeads());
    dispatch(fetchSalesAgents());
  }, [dispatch]);

  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Group leads by sales agent
  const groupedLeads = leads.reduce((acc, lead) => {
    const agentName = lead.salesAgent?.name || "Unassigned";
    acc[agentName] = acc[agentName] || [];
    acc[agentName].push(lead);
    return acc;
  }, {});

  // Filter & Sort Leads
  const filteredLeads = Object.entries(groupedLeads).map(
    ([agentName, leadList]) => ({
      agentName,
      leads: leadList
        .filter(
          (lead) =>
            (!filterStatus || lead.status === filterStatus) &&
            (!filterPriority || lead.priority === filterPriority)
        )
        .sort((a, b) =>
          sortBy === "Time to Close" ? a.timeToClose - b.timeToClose : 0
        ),
    })
  );

  return (
    <>
      <h1 className="text-center py-3 shadow"> LeadSync by SalesAgent</h1>
      <div className="container my-5">
        <div className="row gap-3">
          <div className="col-md-3 text-center py-3 rounded ">
            <Sidebar />
          </div>

          <div className="col-md-8">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>Lead List by Agents</h3>
            </div>
            <div className="my-5 row">
              <div className="col-md-4">
                <select onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="">Filter by Status</option>
                  <option value="New">New</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="col-md-4">
                <select onChange={(e) => setFilterPriority(e.target.value)}>
                  <option value="">Filter by Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="col-md-4">
                <select onChange={(e) => setSortBy(e.target.value)}>
                  <option value="">Sort By</option>
                  <option value="Time to Close">Time to Close</option>
                </select>
              </div>
            </div>

            {/* Render Leads Grouped by Sales Agent */}
            <div className="shadow-lg rounded p-3">
              {filteredLeads.map(({ agentName, leads }) => (
                <div key={agentName} className="mb-4">
                  <h4>Sales Agent: {agentName}</h4>
                  <ul className="list-group">
                    {leads.length > 0 ? (
                      leads.map((lead) => (
                        <li key={lead._id} className="list-group-item">
                          {lead.name} - [Status: {lead.status}]
                        </li>
                      ))
                    ) : (
                      <li className="list-group-item text-muted">
                        No leads found
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesagentView;
