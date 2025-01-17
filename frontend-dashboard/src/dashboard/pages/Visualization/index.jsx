import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Filler,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2'
import WordCloud from 'react-wordcloud'
import {
  userMisinfoRatioFetchByIDAPI,
  userPlatformMisinfoRatioFetchByIDAPI,
  userVaccineMisinfoRatioFetchByIDAPI,
  userVaccineCheckNumFetchByIDAPI,
  userVaccineMisinfoNumFetchByIDAPI,
  userVaccineDataSourceFetchByIDAPI,
  userMisinfoRatioInDaysFetchByIDAPI,
} from '@/apis';
import './visualization.styl';

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Visualization = () => {
  const [misinfoRate, setMisinfoRate] = useState(null);
  const [platformData, setPlatformData] = useState([]);
  const [vaxTimes, setVaxTimes] = useState([]);
  const [checkNum, setCheckNum] = useState(0);
  const [misinfoNum, setMisinfoNum] = useState(0);
  const [dataSource, setDataSource] = useState('N/A');
  const [misinfoRateInDays, setMisinfoRateInDays] = useState([]);
  const [error, setError] = useState(null);

  const keywords = [
    { text: 'Vaccine safety', value: 90 },
    { text: 'Vaccine side effects', value: 80 },
    { text: 'Vaccine effectiveness', value: 75 },
    { text: 'Anti-vaccine movement', value: 70 },
    { text: 'Vaccine myths', value: 65 },
    { text: 'Vaccine conspiracy', value: 60 },
    { text: 'Vaccine hesitancy', value: 55 },
    { text: 'COVID-19 vaccine microchip', value: 50 },
    { text: 'Autism and vaccines', value: 45 },
    { text: 'Natural immunity vs. vaccines', value: 40 },
    { text: 'Vaccine infertility rumors', value: 35 },
    { text: 'Vaccine shedding', value: 30 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch overall stats
        const checkNumResponse = await userVaccineCheckNumFetchByIDAPI();
        setCheckNum(checkNumResponse);

        const misinfoNumResponse = await userVaccineMisinfoNumFetchByIDAPI();
        setMisinfoNum(misinfoNumResponse);

        const dataSourceResponse = await userVaccineDataSourceFetchByIDAPI();
        if (dataSourceResponse && dataSourceResponse.source) {
          setDataSource(dataSourceResponse.source);
        }

        // Fetch other data
        const misinfoResponse = await userMisinfoRatioFetchByIDAPI();
        setMisinfoRate(misinfoResponse.misinformation_rate || 0);

        const platformResponse = await userPlatformMisinfoRatioFetchByIDAPI();
        setPlatformData(platformResponse || []);

        const vaxResponse = await userVaccineMisinfoRatioFetchByIDAPI();
        setVaxTimes(vaxResponse || []);

        const misinfoRateInDaysResponse = await userMisinfoRatioInDaysFetchByIDAPI();
        setMisinfoRateInDays(misinfoRateInDaysResponse || []);
      } catch (err) {
        setError('Failed to load data.');
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const wordCloudOptions = {
    rotations: 2,
    rotationAngles: [-90, 0],
    fontSizes: [10, 60],
    padding: 1,
    enableTooltip: true,
  };

  return (
    <div className="visualization-dashboard">
      {/* Information in line*/}
      <div className="top-stats-row">
        <StatCard title="Total check times" value={checkNum.toLocaleString()} />
        <StatCard title="Misinformation times" value={misinfoNum.toLocaleString()} />
        <StatCard title="Main Data Source" value={dataSource} />
        <StatCard title="Misinformation Rate (%)" value={misinfoRate?.toFixed(2)} />
      </div>

      {/* graph grids */}
      <div className="content-grid">
        <BarChart data={vaxTimes} />
        <PlatformTable data={platformData} />
        <WordCloudSection keywords={keywords} options={wordCloudOptions} />
        <LineChart data={misinfoRateInDays} />
      </div>

    </div>
  );

};

// Stat Card Component
const StatCard = ({ title, value }) => (
  <div className="stat-card" style={{ width: '100%' }}>
    <h4>{title}</h4>
    <p>{value}</p>
  </div>
);

// Info Card Component
const InfoCard = ({ title, value }) => (
  <div className="info-card">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

// Table Component
const PlatformTable = ({ data }) => (
  <div className="table-container">
    <h3>Social Platforms</h3>
    <table className="platform-table">
      <thead>
        <tr>
          <th>Source</th>
          <th>Times</th>
          <th>Misinfo</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.source}</td>
            <td>{item.total_times}</td>
            <td>{parseFloat(item.misinfo_rate).toFixed(1)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Bar Chart Component
const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item._id || 'Unknown'),
    datasets: [
      {
        label: 'Vaccine Detection Times',
        data: data.map((item) => item.times),
        backgroundColor: '#808080',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Vaccine Detection Times',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Vaccines',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Times',
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={chartData} options={options} />
    </div>
  );
};

// Word Cloud Component
const WordCloudSection = ({ keywords, options }) => (
  <div className="wordcloud-section">
    <h3>Dynamic Vaccine Misinformation Keywords</h3>
    <WordCloud words={keywords} options={options} />
  </div>
);

// Line Chart Component
const LineChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: 'Misinformation Rate (%)',
        data: data.map((item) => item.misinfoRate * 100),
        borderColor: '#808080',
        backgroundColor: 'rgba(61, 64, 65, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Misinformation Trend',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Misinformation Rate (%)',
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Visualization;
