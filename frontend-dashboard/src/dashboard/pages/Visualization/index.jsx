import React, { useEffect, useState } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
  PieController,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  userMisinfoRatioFetchByIDAPI,
  globalMisinfoRatioFetchAPI,
  userPlatformMisinfoRatioFetchByIDAPI,
  globalPlatformMisinfoRatioFetchAPI,
  userVaccineMisinfoRatioFetchByIDAPI,
  globalVaccineMisinfoRatioFetchAPI,
  userVaccineCheckNumFetchByIDAPI,
  globalVaccineCheckNumFetchAPI,
  userVaccineMisinfoNumFetchByIDAPI,
  globalVaccineMisinfoNumFetchAPI,
  userVaccineDataSourceFetchByIDAPI,
  globalVaccineDataSourceFetchAPI,
  userMisinfoRatioInDaysFetchByIDAPI,
  globalMisinfoRatioInDaysFetchAPI,
} from '@/apis';
import './visualization.styl';

// 注册 ChartJS 组件
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
  ArcElement,
  PieController,
  ChartDataLabels
);

const Visualization = () => {
  const [scope, setScope] = useState('user'); // Scope state
  const [misinfoRate, setMisinfoRate] = useState(null);
  const [platformData, setPlatformData] = useState([]);
  const [vaxTimes, setVaxTimes] = useState([]);
  const [checkNum, setCheckNum] = useState(0);
  const [misinfoNum, setMisinfoNum] = useState(0);
  const [dataSource, setDataSource] = useState('N/A');
  const [misinfoRateInDays, setMisinfoRateInDays] = useState([]);
  const [error, setError] = useState(null);

  const localKeywords = [
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

  const globalKeywords = [
    { text: 'Global vaccine safety', value: 120 },
    { text: 'Global side effects', value: 110 },
    { text: 'Global effectiveness', value: 105 },
    { text: 'Global anti-vaccine', value: 95 },
    { text: 'Global myths', value: 90 },
    { text: 'Global conspiracy', value: 85 },
    { text: 'Global hesitancy', value: 80 },
    { text: 'Global microchip', value: 75 },
    { text: 'Global autism concerns', value: 70 },
    { text: 'Global natural immunity', value: 65 },
    { text: 'Global infertility rumors', value: 60 },
    { text: 'Global shedding concerns', value: 55 },
  ];

  const keywords = scope === 'user' ? localKeywords : globalKeywords;

  // 动态选择 API
  const selectAPI = (userAPI, globalAPI) => (scope === 'user' ? userAPI : globalAPI);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const checkNumResponse = await selectAPI(
          userVaccineCheckNumFetchByIDAPI,
          globalVaccineCheckNumFetchAPI
        )();
        setCheckNum(checkNumResponse || 0);

        const misinfoNumResponse = await selectAPI(
          userVaccineMisinfoNumFetchByIDAPI,
          globalVaccineMisinfoNumFetchAPI
        )();
        setMisinfoNum(misinfoNumResponse || 0);

        const dataSourceResponse = await selectAPI(
          userVaccineDataSourceFetchByIDAPI,
          globalVaccineDataSourceFetchAPI
        )();
        setDataSource(dataSourceResponse?.source || 'N/A');

        const misinfoResponse = await selectAPI(
          userMisinfoRatioFetchByIDAPI,
          globalMisinfoRatioFetchAPI
        )();
        setMisinfoRate(misinfoResponse?.misinformation_rate || 0);

        const platformResponse = await selectAPI(
          userPlatformMisinfoRatioFetchByIDAPI,
          globalPlatformMisinfoRatioFetchAPI
        )();
        setPlatformData(Array.isArray(platformResponse) ? platformResponse : []);

        const vaxResponse = await selectAPI(
          userVaccineMisinfoRatioFetchByIDAPI,
          globalVaccineMisinfoRatioFetchAPI
        )();
        setVaxTimes(Array.isArray(vaxResponse) ? vaxResponse : []);

        const misinfoRateInDaysResponse = await selectAPI(
          userMisinfoRatioInDaysFetchByIDAPI,
          globalMisinfoRatioInDaysFetchAPI
        )();
        setMisinfoRateInDays(Array.isArray(misinfoRateInDaysResponse) ? misinfoRateInDaysResponse : []);
      } catch (err) {
        setError('Failed to load data.');
        console.error(err);
      }
    };

    fetchData();
  }, [scope]);

  const toggleButtonStyle = (isActive) => ({
    padding: '10px 20px',
    margin: '0 5px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    backgroundColor: isActive ? '#71a2ff' : '#ffffff',
    color: isActive ? '#ffffff' : '#333',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  });

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="visualization-dashboard">
      {/* Scope Toggle */}
      <div className="scope-toggle" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          style={toggleButtonStyle(scope === 'user')}
          onClick={() => setScope('user')}
        >
          Local
        </button>
        <button
          style={toggleButtonStyle(scope === 'global')}
          onClick={() => setScope('global')}
        >
          Global
        </button>
      </div>

      {/* 顶部统计信息 */}
      <div className="top-stats-row">
        <StatCard title="Total check times" value={checkNum.toLocaleString()} />
        <StatCard title="Misinformation times" value={misinfoNum.toLocaleString()} />
        <StatCard title="Main Data Source" value={dataSource} />
        <StatCard title="Misinformation Rate (%)" value={misinfoRate?.toFixed(2)} />
      </div>

      {/* 图表区域 */}
      <div className="content-grid">
        {/* 1. 折线图 (Line) */}
        <LineChart data={misinfoRateInDays} />

        {/* 2. 饼图 (Pie) */}
        <PieChart keywords={keywords} />

        {/* 3. 柱状图 (Bar) */}
        <BarChart data={vaxTimes} />

        {/* 4. 表格 (Table) */}
        <PlatformTable data={platformData} />
      </div>
    </div>
  );
};

// ============ 统计卡片组件 ============
const StatCard = ({ title, value }) => (
  <div className="stat-card" style={{ width: '100%' }}>
    <h4>{title}</h4>
    <p>{value}</p>
  </div>
);

// ============ 表格组件 ============
const PlatformTable = ({ data = [] }) => {
  return (
    <div className="chart-container" style={{ padding: 40 }}>
      <h3>Source Social Platforms</h3>
      <table className="platform-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Source</th>
            <th>Times</th>
            <th>Misinfo</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.source || 'Unknown'}</td>
                <td>{item.total_times || 0}</td>
                <td>{parseFloat(item.misinfo_rate || 0).toFixed(1)}%</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const getRandomColor = () => {
  // 生成随机 16 进制颜色
  // 注：toString(16)有时可能生成不足 6 位的字符串，可用 padStart(6,'0') 补足
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

const BarChart = ({ data = [] }) => {
  // 先准备与 data 数量相等的颜色数组
  const barColors = data.map(() => getRandomColor());

  const chartData = {
    labels: data.map((item) => item._id || 'Unknown'),
    datasets: [
      {
        label: 'Vaccine Detection Times',
        data: data.map((item) => item.times || 0),
        // 使用颜色数组
        backgroundColor: barColors,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 让图表填充容器
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Vaccine Detection Times',
      },
      datalabels: {
        color: '#FFF', // 标签文字颜色
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
      <div style={{ width: '100%', height: '400px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

// ============ 饼图组件 ============
const PieChart = ({ keywords = [] }) => {
  const sortedKeywords = [...keywords].sort((a, b) => b.value - a.value);
  const topKeywords = sortedKeywords.slice(0, 8);
  const otherValue = sortedKeywords.slice(8).reduce((sum, item) => sum + item.value, 0);

  const chartData = {
    labels: [...topKeywords.map((item) => item.text), 'Other'],
    datasets: [
      {
        data: [...topKeywords.map((item) => item.value), otherValue],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#C9CBCF',
          '#E7E9ED',
          '#808080',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 同样让饼图填充容器
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Detection Keyword Distribution',
      },
      datalabels: {
        display: true,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 4,
        color: '#000',
        font: {
          size: 12,
          weight: 'bold',
        },
        padding: 4,
        formatter: (value) => value,
      },
    },
  };

  return (
    <div
      className="chart-container"
      style={{
        /* 只保留你想要的 width, flex 布局，
          去掉 border/background: none 等 */
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      {/* 左侧 Pie 图 */}
      <div style={{ flex: '0 0 50%', minHeight: '400px' }}>
        <Pie data={chartData} options={options} />
      </div>

      {/* 右侧自定义图例 */}
      <div className="chartjs-legend" style={{ flex: '0 0 45%', paddingLeft: '20px' }}>
        {chartData.labels.map((label, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: chartData.datasets[0].backgroundColor[index],
                marginRight: '10px',
              }}
            ></div>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============ 折线图组件 ============
const LineChart = ({ data = [] }) => {
  const recentData = data.length > 10 ? data.slice(-10) : data;

  const chartData = {
    labels: recentData.map((item) => item.date || 'Unknown'),
    datasets: [
      {
        label: 'Misinformation Rate (%)',
        data: recentData.map((item) => (item.misinfoRate || 0) * 100),
        borderColor: '#71a2ff',
        backgroundColor: 'rgba(61, 64, 65, 0.2)',
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#71a2ff',
        pointBorderWidth: 2,
        pointRadius: 4,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 让折线图填充容器
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Misinformation Trend',
      },
      datalabels: {
        display: true,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 4,
        color: '#000000',
        font: {
          size: 12,
          weight: 'bold',
        },
        padding: 6,
        align: 'top',
        anchor: 'end',
        formatter: (value) => `${value.toFixed(1)}%`,
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
        max: 100,
        title: {
          display: true,
          text: 'Misinformation Rate (%)',
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <div style={{ maxWidth: '100%', height: '400px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );

};

export default Visualization;


// export default function Visualization() {
//   return (
//     <div>Hi visualization</div>
//   )
// }