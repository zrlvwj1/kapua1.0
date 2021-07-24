import axios from '@/libs/api.request'

export const authenticateUsers = userInfo => {
  return axios.request({
    url: 'authentication/user',
    method: 'post',
    data: userInfo
  })
}
