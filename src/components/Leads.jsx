import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../features/leadSlice";
import { Link } from "react-router-dom";
import AddLead from "./AddLead";

const Leads = () => {
  const { leads, status, error } = useSelector((state) => state.lead);
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  //   console.log(leads, status, error);

  const leadStatusCounts = useMemo(() => {
    return leads?.reduce(
      (acc, lead) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1;
        return acc;
      },
      { New: 0, Contacted: 0, Qualified: 0, "Proposal Sent": 0, Closed: 0 }
    );
  }, [leads]);

  const filteredLeads =
    statusFilter === "all"
      ? leads
      : leads?.filter((lead) => lead.status === statusFilter);

  const handleFilterChange = (newFilter) => {
    setStatusFilter(newFilter);
  };

  return (
    <>
      <div className="container ml-2 mt-4">
        {/* <h3>leads</h3> */}
        {status === "loading" && <p>Loading....</p>}
        {error && <p>An error occured while fetching leads</p>}
        <div className="row my-3">
          {filteredLeads && filteredLeads.length > 0
            ? filteredLeads.map((lead) => (
                <Link
                  key={lead._id}
                  to={`/leads/${lead._id}`}
                  style={{ textDecoration: "none" }}
                  className="col-md-6 shadow"
                >
                  <div className=" mb-2 px-3 py-3">
                    <p>
                      <strong>{lead.name}</strong> - {lead?.source}
                    </p>
                    <p>Assigned to: {lead?.salesAgent?.name || "N/A"}</p>
                    <p>
                      Status:{" "}
                      <span className="badge bg-primary">{lead.status}</span>
                    </p>
                  </div>
                </Link>
              ))
            : " No Leads found"}
        </div>

        <div className=" my-3">
          <h5>Lead Status</h5>
          <div className="row">
            {Object.entries(leadStatusCounts).map(([status, count]) => (
              <div key={status} className="col-md-2 mb-3">
                <div
                  className="card text-center shadow p-3"
                  style={{ height: "100px" }}
                >
                  <div className="d-flex flex-column align-items-center">
                    <h6 className="mb-2">{status}</h6>

                    <div
                      className="shadow rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        // fontSize: "16px",
                        // fontWeight: "bold",
                      }}
                    >
                      {count}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h5 className="mt-4">Quick Filters</h5>
          <div>
            <button
              className="btn btn-outline-primary btn-sm me-2"
              onClick={() => handleFilterChange("New")}
            >
              New
            </button>
            <button
              className="btn btn-outline-primary btn-sm me-2"
              onClick={() => handleFilterChange("Contacted")}
            >
              Contacted
            </button>
            <button
              className="btn btn-outline-primary btn-sm me-2"
              onClick={() => handleFilterChange("Qualified")}
            >
              Qualified
            </button>
            <button
              className="btn btn-outline-primary btn-sm "
              onClick={() => handleFilterChange("all")}
            >
              All
            </button>
          </div>
        </div>

        <Link
          to="/"
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + New Lead
        </Link>
      </div>
      <AddLead show={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

export default Leads;
