import { Table, Card, Tag, Space, Popconfirm, Button, Input, DatePicker, Form, Select, ConfigProvider, Tooltip } from "antd"
import { DeleteOutlined, SearchOutlined, FilterOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import './history.styl'
import { useNavigate } from "react-router-dom"
import classNames from "classnames"
import { historyFetchAPI, deleteRecordAPI } from "@/apis"
import dayjs from "dayjs"

/**
 * API needed
 * 1. Fetch all records √
 * 2. Fetch records according to searching text
 * 3. Fetch records according to date, source, result
 * 4. Delete the specific record √
 */

// const resultComponent = {
//   'accurate': <Tag color="green">True</Tag>,
//   'misinformation': <Tag color="red">False</Tag>
// }

const resultComponent = (result) => {
  if (result === 'accurate') return (<Tag color="green">True</Tag>)
  else if (result === 'misinformation') return (<Tag color="red">False</Tag>)
  else return (<Tag color="gold">Unknown</Tag>)
}

// Notice the case-sensitive
const sources = [
  {
    label: 'X',
    value: 'x'
  },
  {
    label: 'Meta',
    value: 'meta'
  },
  {
    label: 'Reddit',
    value: 'reddit'
  }
]

const results = [
  {
    label: 'True',
    value: 'true'
  },
  {
    label: 'False',
    value: 'false'
  }
]

const History = () => {
  const { RangePicker } = DatePicker
  const navigate = useNavigate()
  const [recordList, setRecordList] = useState([])
  const [searchText, setSearchText] = useState('') // Using as a param that fetch filtered record list
  const [typingText, setTypingText] = useState('') // Using for sync with searching input value
  const [isFilterActive, setIsFilterActive] = useState(false)
  const [reqData, setReqData] = useState({
    dates: [],
    source: '',
    result: ''
  })


  // Handle with press Enter on the search box
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearchText(e.target.value)
      setTypingText('')
    }
  }

  // Toggle filter icon to show/hide filter section
  const handleToggleFilter = () => {
    setIsFilterActive(!isFilterActive)
  }

  // Handle with click filter button
  const handleFilterFinish = (formData) => {
    /**
     * Invoke getRecordList API and re-fetch the list, reset all states
     * @param {Array} formData.dayjs
     * A list consists of 2 dayjs elements, [0] is start date and [1] is end date
     */
    const startDate = formData.dates[0].format('MMM D, YYYY')
    const endDate = formData.dates[1].format('MMM D, YYYY')

    setReqData({
      ...reqData,
      dates: [startDate, endDate] || [],
      source: formData.source || '',
      result: formData.result || ''
    })

    handleToggleFilter()
  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      // render: process Date object to make it show in this format: Mon Date e.g. Dec 5
      render: date => dayjs(date).format("YYYY-MM-DD HH:mm")
    },
    {
      title: 'Text',
      dataIndex: 'text',
      key: 'text',
      // render: process the text to make it navigate to the specific detection result page
      render: (text, record) => {
        return (
          // <span  >{text}</span>
          <Tooltip title={text}>
            <div
              className="record-item-text"
              onClick={() => navigate(`/dashboard/result/${record._id}`)}
              style={{
                width: '800px',
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {text}
            </div>
          </Tooltip>
        )
      },
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source'
    },
    {
      title: 'Result',
      dataIndex: 'result',
      key: 'result',
      render: result => resultComponent(result.classification),
    },
    {
      title: 'Action',
      render: data => {
        return (
          <Space size='middle'>
            <Popconfirm
              title='Delete'
              description='Are you sure to delete this record?'
              okText='Yes'
              cancelText='No'
              onConfirm={() => onConfirm(data)}
            >
              <Button
                type="primary"
                size="small"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      },
    }
  ]

  useEffect(() => {
    async function getRecordList() {
      const res = await historyFetchAPI()
      setRecordList(res.history)
    }
    getRecordList()

  }, [reqData])

  const onConfirm = async (data) => {
    /**
     * Using for delete the specific record when click the delete button 
     */
    await deleteRecordAPI(data._id)
    setReqData({
      ...reqData
    })
  }

  return (
    <div className="P-history">
      <Card className="upper-card"
        title='History'
      >
        <div className="upper-content-container">
          <div className="upper-search-content">
            <div className="upper-search-wrapper">
              <Input className="upper-search"
                placeholder="Search"
                size="large"
                value={typingText}
                onChange={(e) => { setTypingText(e.target.value) }}
                prefix={<SearchOutlined />}
                onKeyUp={(e) => handleSearch(e)}
              />
            </div>
            <div className="filter-container">
              <div className="filter-wrapper">
                <FilterOutlined className={classNames('filter', { 'filter-active': isFilterActive })} size='large' onClick={handleToggleFilter} />
              </div>
            </div>
          </div>
          {isFilterActive && (
            <Form className="filter-form" onFinish={(data) => handleFilterFinish(data)}>
              <div className="filter-form-item-wrapper">
                <Form.Item className="filter-form-date" label='Date' name='dates' layout="vertical">
                  <RangePicker className="filter-form-datepicker" />
                </Form.Item>
                <Form.Item className="filter-form-source" label='Source' name='source' layout="vertical">
                  <Select
                    placeholder='Select the source'
                    options={sources}
                  />
                </Form.Item>
                <Form.Item className="filter-form-result" label='Result' name='result' layout="vertical">
                  <Select
                    placeholder='Select the result'
                    options={results}
                  />
                </Form.Item>
              </div>
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      defaultBg: '#e6f4ff',
                      defaultColor: '#4081ff',
                      defaultBorderColor: '#4081ff'
                    },
                  },
                }}
              >
                <Button className="filter-form-btn"
                  size="middle"
                  htmlType="submit"
                >
                  Filter
                </Button>
              </ConfigProvider>
            </Form>
          )}
        </div>
      </Card>
      <Card className="record-list-container"
        title={`${recordList.length} records are found:`}
      >
        <Table rowKey={record => record._id} className="record-list-table" columns={columns} dataSource={recordList} />
      </Card>
    </div>

  )
}

export default History