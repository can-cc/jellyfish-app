import { AppRootState } from "../reducer";
import R from 'ramda'
import { IBox } from "../../../typing/box";

export function selectBoxes(state: AppRootState): IBox[] {
  return R.values(state.todo.entities.box)
}