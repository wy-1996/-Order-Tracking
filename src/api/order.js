import axios from 'axios';
import qs from 'qs';

let base = 'api';
export const ajaxPrefix = '/api';

/** 订单列表 **/
export const orders = (params) => {
  return axios.get(`${base}/smoke_order/lists`, {params: params}).then(res => res.data);
};


/** 订单详情 **/
export const detail = (params) => {
    return axios.get(`${base}/smoke_order/detail`, {params: params}).then(res => res.data);
  };

