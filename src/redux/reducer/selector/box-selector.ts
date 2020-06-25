import { AppRootState } from "../reducer";
import R from 'ramda'
import { IBox } from "../../../typing/box";

export function selectBoxes(state: AppRootState): IBox[] {
  return R.values(state.todo.entities.box)
}

export function selectCurrentBox(state: AppRootState) {
  return state.todo.entities.box[state.todo.boxId]
}