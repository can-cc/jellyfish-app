
export function queryBoxList() {
  return {
    type: 'QUERY_BOX_LIST',
    payload: {
      request: {
        url: `/boxes`
      }
    }
  }
}