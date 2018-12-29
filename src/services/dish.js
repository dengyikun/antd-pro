import request from '@/utils/request';

export async function queryDish({currentPage, pageSize}) {
  return request(`/api/dishManage/queryByPage/${currentPage}/${pageSize}`);
}

export async function removeDish(data) {
  return request('/api/dishManage/addOrUpdate', {
    method: 'POST',
    body: data,
  });
}

export async function addDish(data) {
  return request('/api/dishManage/addOrUpdate', {
    method: 'POST',
    body: data,
  });
}

export async function updateDish(data) {
  return request('/api/dishManage/addOrUpdate', {
    method: 'POST',
    body: data,
  });
}

export async function queryDishById({id}) {
  return request(`/api/dishManage/dishes/${id}`);
}
