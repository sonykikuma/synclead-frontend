import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import { fetchLeads } from "../features/leadSlice";
import { fetchSalesAgents } from "../features/salesAgentSlice";

const LeadStatusView = () => {
  const { leads } = useSelector((state) => state.lead);
  const { agents } = useSelector((state) => state.agents);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeads());
    dispatch(fetchSalesAgents());
  }, [dispatch]);

  const [filterAgent, setFilterAgent] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Group leads by status
  const groupedLeads = leads.reduce((acc, lead) => {
    acc[lead.status] = acc[lead.status] || [];
    acc[lead.status].push(lead);
    return acc;
  }, {});

  // Filtered & Sorted Leads
  const filteredLeads = Object.entries(groupedLeads).map(
    ([status, leadList]) => ({
      status,
      leads: leadList
        .filter(
          (lead) =>
            (!filterAgent || lead.salesAgent?.name === filterAgent) &&
            (!filterPriority || lead.priority === filterPriority)
        )
        .sort((a, b) =>
          sortBy === "Time to Close" ? a.timeToClose - b.timeToClose : 0
        ),
    })
  );

  return (
    <>
      <h1 className="text-center py-3 shadow"> LeadSync by Status</h1>
      <div className="container my-5">
        <div className="row gap-3">
          <div className="col-md-3 text-center py-3 rounded ">
            <Sidebar />
          </div>

          <div className="col-md-8">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>Lead List by Status</h3>
            </div>

            <div className="my-5 row">
              <div className="col-md-4">
                <select onChange={(e) => setFilterAgent(e.target.value)}>
                  <option value="">Filter by Sales Agent</option>
                  {agents.map((agent) => (
                    <option key={agent._id} value={agent.name}>
                      {agent.name}
                    </option>
                  ))}
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

            {/* Lead List Display */}
            <div className="shadow-lg rounded p-3">
              {filteredLeads.map(({ status, leads }) => (
                <div key={status} className="mb-4">
                  <h4>Status: {status}</h4>
                  <ul className="list-group">
                    {leads.length > 0 ? (
                      leads.map((lead) => (
                        <li key={lead._id} className="list-group-item">
                          {lead.name} - [Sales Agent: {lead.salesAgent?.name}]
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

export default LeadStatusView;
