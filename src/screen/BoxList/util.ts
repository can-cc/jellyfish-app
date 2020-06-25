
export function isBasicBox(id: string) {
  return ['@ALL', '@MY_DAILY', '@IMPORTANT', '@TASK', '@SCHEDULE'].indexOf(id) >= 0
}

export function mapBasicBoxIdToName(id: string) {
  if (id === '@ALL') {
    return '全部'
  }
  if (id === '@MY_DAILY') {
    return '我的一天'
  }
  if (id === '@IMPORTANT') {
    return '重要'
  }
  if (id === '@TASK') {
    return '任务'
  }
  if (id === '@SCHEDULE') {
    return '已安排日程'
  }
  return null;
}

