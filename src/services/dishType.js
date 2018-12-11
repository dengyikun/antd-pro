import request from '@/utils/request';

export async function queryDishType({currentPage, pageSize}) {
  return request(`/api/dishType/queryByPage/${currentPage}/${pageSize}`);
}

export async function removeDishType(params) {
  return request('/api/dishType/addOrUpdate', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addDishType(data) {
  return request('/api/dishType/addOrUpdate', {
    method: 'POST',
    body: data,
  });
}

export async function updateDishType(data) {
  return request('/api/dishType/addOrUpdate', {
    method: 'POST',
    body: data,
  });
}
