import { combineEpics } from 'redux-observable';
import R from 'ramda';

const epicGroups = [require('./auth.epic')];
const epics = R.flatten(R.map(R.values, epicGroups));
console.log(epics);

const rootEpic = combineEpics(...epics);

export default rootEpic;
