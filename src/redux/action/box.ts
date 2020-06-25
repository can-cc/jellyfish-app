
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

export function selectBoxId(boxId: string) {
  return {
    type: 'SELECT_BOX_ID',
    payload: boxId
  }
}