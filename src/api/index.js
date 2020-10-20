import axios from 'axios';
import qs from 'qs';

let base = 'api';
export const ajaxPrefix = '/api';

/** 商品列表 **/
export const products = (params) => {
  return axios.get(`${base}/smoke_product/list_by_imei`, { params: params }).then(res => res.data);
};

export const changeIsBlock = params => {
  return axios.post(`${base}/agent_user/set_is_block`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => res.data)
};

/** 支付 **/
export const wxPay = params => {
  return axios.post(`${base}/mp_pay/create`, qs.stringify(params), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => res.data)
};

/** 初始信息 **/
export const baseInfo = params => {
  return axios.get(`${base}/config_info/mbi`, { params: params }).then(res => res.data);
}

/** 跳转外链 **/
export const outLink = params => {
  return axios.get(`${base}/advert_out_link/get`, { params: params }).then(res => res.data);
}

/** 附近设备 **/
export const near = (params) => {
  return axios.get(`${base}/smoke_equip/location_list`, { params: params }).then(res => res.data);
};

// 获取微信SDK配置信息
export const wx_sdk = (params) => {
  return axios.get(`${base}/wxapi/getSignature`, { params: params }).then(res => res.data);
};