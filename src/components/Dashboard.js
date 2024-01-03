import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
//import { ArcElement, CategoryScale, Chart, LinearScale } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import React, { useCallback, useMemo, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';



const Dashboard = () => {
  const [missions, setMissions] = useState([]);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
Chart.register(...registerables)
  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/space-mission-data.json')
    .then((response) => response.json())
    .then((data) => setMissions(data));
  }, []);

  const columnDefs = [
    { headerName: 'Company', field: 'company' },
    { headerName: 'Date', field: 'date' },
    { headerName: 'Location', field: 'location' },
    { headerName: 'Mission', field: 'mission' },
    { headerName: 'Price', field: 'price' },
    { headerName: 'Rocket', field: 'rocket' },
    { headerName: 'Time', field: 'time' },
  ];
  const successfulMissionsCount = missions.filter((mission) => mission.successful).length;
  const unsuccessfulMissionsCount = missions.length - successfulMissionsCount;
  const pieChartData = {
    labels: ['Successful Mission', 'UnSuccessful Mission'],
    datasets: [
      {
        data: [successfulMissionsCount, unsuccessfulMissionsCount],
        backgroundColor: ['#4CAF50', '#FF5252'],
      },
    ],
  };
  const paginationPageSizeSelector = useMemo(() => {
    return [100, 200, 500, 1000];
  }, []);
  const paginationNumberFormatter = useCallback((params) => {
    return '[' + params.value.toLocaleString() + ']';
  }, []);
  const rocketNameData = missions.filter((mission) => mission.rocket);
  const priceData = missions.filter((mission) => mission.price);
  const barChartData = {
    labels: missions.map((mission) => mission.company),
    datasets: [
      {
        label: 'Mission Prices',
        data: missions.map((mission) => mission.price),
        backgroundColor: 'blue',
      },
    ],
  };
   console.log(rocketNameData, priceData)
  return (
    <div>
      <h2>Space Missions</h2>
        {/* AG-Grid Table */}
        <div style={containerStyle}>
      <div className="example-wrapper">
        <div
          style={gridStyle}
          className={
            "ag-theme-quartz"
          }
        >
        <AgGridReact
          rowData={missions}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={100}
          paginationPageSizeSelector={paginationPageSizeSelector}
          rowGroupPanelShow={'always'}
          pivotPanelShow={'always'}
          paginationNumberFormatter={paginationNumberFormatter}
          onGridReady={onGridReady}

        />
      </div>
    </div>
      </div>
      <h2>Pie Chart</h2>
      <div className='piechartDiv'>
      
      
      {/* Pie Chart */}
      <Pie
       data={pieChartData}
      />
      </div>
      <h2>Bar Chart</h2>
      <div className='barchartDiv'>
      <Bar
       data={barChartData}
      />

      </div>
    </div>
  );
};

export default Dashboard;