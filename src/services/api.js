import { stringify } from 'qs';
import request from '@/utils/request';

export async function upload(data) {
  return request('/api/oss/uploading', {
    method: 'POST',
    body: data,
  });
}
