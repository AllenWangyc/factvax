const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // 引入 cors 包

const app = express();
const PORT = 5050;

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

// 使用 CORS 中间件
app.use(cors());

// 解析 JSON 请求体
app.use(bodyParser.json());

// 定义接口
app.post('/api/detect_text', (req, res) => {
    const { text } = req.body;
    console.log('invoke detect API');
    

    if (!text) {
        return res.status(400).json({
            success: false,
            message: 'No text provided in the request body.',
        });
    }

    const detectedText = `${text}`;
    return res.status(200).json({
        success: true,
        data: {
            result: "correct",
            explaination: detectedText,
        }
    });
});

app.post('/api/login', (req, res) => {
    const {email, password} = req.body.data
    console.log(req.body.data)
    // console.log(email, password)

    // In the case of email and password do not match
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password do not match',
        });
    }
    
    const username = 'Allen Wang'
    return res.status(200).json({
        success: true,
        data: {
            username,
            token: 'a5i1afmi321of'
        }
    })
})

app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body.data;
    console.log(req.body)

    // Example: Validate inputs and simulate database save
    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Invalid input. All fields are required.',
        });
    }

    // Simulate successful registration
    return res.status(200).json({
        success: true,
        message: 'User registered successfully.',
    });
});

app.get('/auth/google', (req, res) => {
    const { code } = req.query; // 从查询参数中获取数据
    if (!code) {
        return res.status(400).json({
            success: false,
            message: 'Authorization code is required.',
        });
    }
    const username = 'Allen';
    return res.status(200).json({
        success: true,
        data: {
            username,
            code
        }
    });
});

app.get('/auth/github', (req, res) => {
    const { token } = req.query; // 从查询参数中获取数据
    if (!token) {
        return res.status(400).json({
            success: false,
            message: 'Token is required.',
        });
    }
    const username = 'Allen';
    return res.status(200).json({
        success: true,
        data: {
            username,
            token
        }
    });
});

app.get('/api/history/user_history', (req, res) => {
    console.log('/api/history/user_history invoked!');
    
    return res.status(200).json({
        success: true,
        data: {
            dataSource
        }
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api/`);
});
