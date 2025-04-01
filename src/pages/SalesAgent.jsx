import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalesAgents } from "../features/salesAgentSlice";
import AddAgent from "../components/AddAgent";

const SalesAgent = () => {
  const { agents } = useSelector((state) => state.agents);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSalesAgents());
  }, [dispatch]);
  return (
    <>
      <h1 className="text-center py-3 shadow"> Sales Agent Management</h1>
      <div className="container my-5">
        <div className="row gap-3">
          <div className="col-md-3 text-center py-3 rounded ">
            <Sidebar />
          </div>

          <div className="col-md-6">
            <div className="d-flex flex-column justify-content-between align-items-center mb-3">
              <h3>Sales Agent List </h3>
              <div className="my-4">
                {agents.map((agent, index) => (
                  <div
                    key={index}
                    className=" d-flex justify-content-between shadow-lg card p-3 mb-3"
                  >
                    <span className="">
                      {agent.name} - {agent.email}
                    </span>
                  </div>
                ))}
              </div>
              <div className="my-4">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowModal(true)}
                >
                  Add New Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddAgent show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default SalesAgent;
