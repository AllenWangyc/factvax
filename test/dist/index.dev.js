"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var cors = require('cors'); // 引入 cors 包


var app = express();
var PORT = 5050;
var dataSource = [{
  id: 1,
  date: 'Dec 5',
  text: 'Multiple large-scale studies have shown no link between vaccines and autism.',
  source: 'X',
  result: 'true'
}, {
  id: 2,
  date: 'Dec 5',
  text: 'COVID-19 vaccines do not contain microchips. They are designed to protect against the virus by teaching your immune system to recognize it.',
  source: 'X',
  result: 'true'
}, {
  id: 3,
  date: 'Dec 5',
  text: 'COVID-19 vaccines contain microchips to track people.',
  source: 'Meta',
  result: 'false'
}]; // 使用 CORS 中间件

app.use(cors()); // 解析 JSON 请求体

app.use(bodyParser.json()); // 定义接口

app.post('/api/detect_text', function (req, res) {
  var text = req.body.text;
  console.log('invoke detect API');

  if (!text) {
    return res.status(400).json({
      success: false,
      message: 'No text provided in the request body.'
    });
  }

  var detectedText = "".concat(text);
  return res.status(200).json({
    success: true,
    data: {
      result: "correct",
      explaination: detectedText
    }
  });
});
app.post('/api/login', function (req, res) {
  var _req$body$data = req.body.data,
      email = _req$body$data.email,
      password = _req$body$data.password;
  console.log(req.body.data); // console.log(email, password)
  // In the case of email and password do not match

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password do not match'
    });
  }

  var username = 'Allen Wang';
  return res.status(200).json({
    success: true,
    data: {
      username: username,
      token: 'a5i1afmi321of'
    }
  });
});
app.post('/api/register', function (req, res) {
  var _req$body$data2 = req.body.data,
      username = _req$body$data2.username,
      email = _req$body$data2.email,
      password = _req$body$data2.password;
  console.log(req.body); // Example: Validate inputs and simulate database save

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input. All fields are required.'
    });
  } // Simulate successful registration


  return res.status(200).json({
    success: true,
    message: 'User registered successfully.'
  });
});
app.get('/auth/google', function (req, res) {
  var code = req.query.code; // 从查询参数中获取数据

  if (!code) {
    return res.status(400).json({
      success: false,
      message: 'Authorization code is required.'
    });
  }

  var username = 'Allen';
  return res.status(200).json({
    success: true,
    data: {
      username: username,
      code: code
    }
  });
});
app.get('/auth/github', function (req, res) {
  var token = req.query.token; // 从查询参数中获取数据

  if (!token) {
    return res.status(400).json({
      success: false,
      message: 'Token is required.'
    });
  }

  var username = 'Allen';
  return res.status(200).json({
    success: true,
    data: {
      username: username,
      token: token
    }
  });
});
app.get('/api/history/user_history', function (req, res) {
  console.log('/api/history/user_history invoked!');
  return res.status(200).json({
    success: true,
    data: {
      dataSource: dataSource
    }
  });
}); // 启动服务器

app.listen(PORT, function () {
  console.log("Server is running on http://localhost:".concat(PORT, "/api/"));
});