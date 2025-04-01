import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const Reports = () => {
  const [pipelineLeads, setPipelineLeads] = useState(0);
  const [closedLeads, setClosedLeads] = useState([]);
  const [leadsByAgent, setLeadsByAgent] = useState({});
  const [leadStatusDistribution, setLeadStatusDistribution] = useState({});

  useEffect(() => {
    // Fetch total leads in pipeline
    axios
      .get("https://lead-sync-backend.vercel.app/reports/pipeline")
      .then((res) => setPipelineLeads(res.data.totalLeadsInPipeline))
      .catch((err) => console.error("Error fetching pipeline leads", err));

    // Fetch leads closed last week
    axios
      .get("https://lead-sync-backend.vercel.app/reports/last-week")
      .then((res) => {
        setClosedLeads(res.data);

        // Count leads closed by each agent
        const agentCounts = {};
        res.data.forEach((lead) => {
          agentCounts[lead.salesAgent.name] =
            (agentCounts[lead.salesAgent.name] || 0) + 1;
        });
        setLeadsByAgent(agentCounts);
      })
      .catch((err) => console.error("Error fetching closed leads", err));

    // Fetch Lead Status Distribution
    axios
      .get("https://lead-sync-backend.vercel.app/reports/status-distribution")
      .then((res) => {
        const statusData = {};
        res.data.forEach((status) => {
          statusData[status._id] = status.count;
        });
        setLeadStatusDistribution(statusData);
      })
      .catch((err) =>
        console.error("Error fetching lead status distribution", err)
      );
  }, []);

  // Pie Chart: Total Leads in Pipeline vs. Closed Leads
  const totalLeadsData = {
    labels: ["Closed Leads", "Pipeline Leads"],
    datasets: [
      {
        data: [closedLeads.length, pipelineLeads],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  // Bar Chart: Leads Closed by Sales Agent
  const barChartData = {
    labels: Object.keys(leadsByAgent),
    datasets: [
      {
        label: "Leads Closed",
        data: Object.values(leadsByAgent),
        backgroundColor: "#4CAF50",
      },
    ],
  };

  // Pie Chart: Lead Status Distribution
  const statusChartData = {
    labels: Object.keys(leadStatusDistribution),
    datasets: [
      {
        data: Object.values(leadStatusDistribution),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#8E44AD",
        ],
      },
    ],
  };

  return (
    <>
      <h1 className="text-center py-3 shadow"> LeadSync CRM Reports</h1>
      <div className="container my-5">
        <div className="row gap-3">
          <div className="col-md-3 text-center py-3 rounded ">
            <Sidebar />
          </div>

          <div className="col-md-6">
            <div className="d-flex flex-column justify-content-between align-items-center mb-3">
              <h3>Report Overview </h3>
              {/* Total Leads Closed vs Pipeline Leads */}
              <div className="card p-3 mb-4 shadow">
                <h5 className="text-center">
                  Total Leads Closed & In Pipeline
                </h5>
                <Pie data={totalLeadsData} />
              </div>

              {/* Leads Closed by Sales Agent */}
              <div className="card p-3 mb-4 shadow">
                <h5 className="text-center">Leads Closed by Sales Agent</h5>
                <Bar data={barChartData} />
              </div>

              {/* Lead Status Distribution */}
              <div className="card p-3 mb-4 shadow">
                <h5 className="text-center">Lead Status Distribution</h5>
                <Pie data={statusChartData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
