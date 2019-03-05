import fetch from 'dva/fetch';

export async function queryCode({startTableNum, endTableNum}) {
  return fetch(`/wxapp/order_meal/qrcode/generateTablesQrCode?startTableNum=${startTableNum}&endTableNum=${endTableNum}`);
}
