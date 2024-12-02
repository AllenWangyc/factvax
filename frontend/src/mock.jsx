import Mock from 'mockjs'
import { mockFetch } from 'mockjs-fetch'
mockFetch(Mock)

// mock login
Mock.mock(/login/, {
  code: 200,
  msg: 'OK',
  data: {
    name: 'Allen',
    accessToken: 'fqh0i-LyINZ-RvK5d-Akj3a-uBYRl'
  }
})

Mock.mock(/detectText/, {
  code: 200,
  msg: 'OK',
  data: {
    result: 'Credible',
    explaination: 'This vaccine information is credible.'
  }
})