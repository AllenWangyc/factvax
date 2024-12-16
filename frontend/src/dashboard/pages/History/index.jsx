import { Table, Card, Tag, Space, Popconfirm, Button, Input, DatePicker, Form, Select, ConfigProvider } from "antd"
import { DeleteOutlined, SearchOutlined, FilterOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import './history.styl'
import { useNavigate } from "react-router-dom"

const resultComponent = {
  'true': <Tag color="green">True</Tag>,
  'false': <Tag color="red">False</Tag>
}

const onConfirm = (config) => {
  /**
   * Using for delete the specific record when click the delete button 
   */
}

const dataSource = [
  {
    id: 1,
    date: 'Dec 5',
    text: 'Multiple large-scale studies have shown no link between vaccines and autism.',
    source: 'X',
    result: 'true'
  },
  {
    id: 2,
    date: 'Dec 5',
    text: 'COVID-19 vaccines do not contain microchips. They are designed to protect against the virus by teaching your immune system to recognize it.',
    source: 'X',
    result: 'true'
  },
  {
    id: 3,
    date: 'Dec 5',
    text: 'COVID-19 vaccines contain microchips to track people.',
    source: 'Meta',
    result: 'false'
  }
]

const sources = [
  {
    label: 'X',
    value: 'x'
  },
  {
    label: 'Meta',
    value: 'meta'
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
  const [recordList, setRecordList] = useState([])
  const [searchText, setSearchText] = useState('') // Using as a param that fetch filtered record list
  const [typingText, setTypingText] = useState('') // Using for sync with searching input value

  const [source, setSource] = useState('') // Filter condition
  const [result, setResult] = useState('') // Filter condition
  const [startDate, setStartDate] = useState(null) // Filter condition
  const [endDate, setEndDate] = useState(null) // Filter condition
  const [isFilterActive, setIsFilterActive] = useState(false)
  const navigate = useNavigate()

  // Handle with press Enter on the search box
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearchText(e.target.value)
      console.log('handleSearch worked!')
      setTypingText('')
    }
  }

  // Toggle filter icon to show/hide filter section
  const handleToggleFilter = () => {
    setIsFilterActive(!isFilterActive)
  }

  // Handle with click filter button
  const handleFilter = () => {
    /**
     * Invoke getRecordList API and re-fetch the list, reset all states
     */
    setSource('')
    setResult('')
    handleToggleFilter()
  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      // render: process Date object to make it show in this format: Mon Date e.g. Dec 5
    },
    {
      title: 'Text',
      dataIndex: 'text',
      key: 'text',
      // render: process the text to make it navigate to the specific detection result page
      render: (text) => {
        return (
          <span className="record-item-text" onClick={() => { navigate('/dashboard') }}>{text}</span>
        )
      }
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
      render: result => resultComponent[result]
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
      }
    }
  ]

  // Hard coding
  useEffect(() => {
    function getRecordList() {
      setRecordList(dataSource)
    }
    getRecordList()
  })

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
              <FilterOutlined className="filter" size='large' onClick={handleToggleFilter} />
            </div>
          </div>
          {isFilterActive && (
            <Form className="filter-form" onFinish={handleFilter}>
              <div className="filter-form-item-wrapper">
                <Form.Item className="filter-form-date" label='Date' name='date' layout="vertical">
                  <RangePicker />
                </Form.Item>
                <Form.Item className="filter-form-source" label='Source' name='source' layout="vertical">
                  <Select
                    placeholder='Select the source'
                    options={sources}
                    onChange={(value) => setSource(value)}
                  />
                </Form.Item>
                <Form.Item className="filter-form-result" label='Result' name='result' layout="vertical">
                  <Select
                    placeholder='Select the result'
                    options={results}
                    onChange={(value) => setResult(value)}
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
        <Table rowKey='id' className="record-list-table" columns={columns} dataSource={recordList} />
      </Card>
    </div>

  )
}

export default History