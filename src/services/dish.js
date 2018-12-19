import request from '@/utils/request';

export async function queryDish({currentPage, pageSize}) {
  return request(`/api/dishManage/queryByPage/${currentPage}/${pageSize}`);
}

export async function removeDish(params) {
  return request('/api/dishManage/addOrUpdate', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addDish(params) {
  return request('/api/dishManage/addOrUpdate', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateDish(params) {
  return request('/api/dishManage/addOrUpdate', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function queryDishById({id}) {
  return request(`/api/dishManage/dishes/${id}`);
}
