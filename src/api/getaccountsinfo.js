import axios from '@/libs/api.request'
export const getAccountList = (scopeId) => {
    return axios.request({
        url: `${scopeId}/accounts`,
        method: 'get'
    })
}
export const sendAccountForm = (scopeId, accountForm) => {
    return axios.request({
        url: `${scopeId}/accounts`,
        method: 'post',
        data: accountForm
    })
}