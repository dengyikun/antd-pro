import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryNotices() {
  return request('/api/notices');
}
