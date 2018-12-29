import request from '@/utils/request';

export async function queryOrder(data) {
  return request(`/api/order/getOrder`, {
    body: data,
  });
}

export async function removeOrder(data) {
  return request('/api/order/addOrUpdate', {
    method: 'POST',
    body: data,
  });
}

export async function addOrder(data) {
  return request('/api/order/addOrUpdate', {
    method: 'POST',
    body: data,
  });
}

export async function updateOrder(data) {
  return request('/api/order/addOrUpdate', {
    method: 'POST',
    body: data,
  });
}

export async function queryOrderById({id}) {
  return request(`/api/order/dishes/${id}`);
}
