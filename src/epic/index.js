import { combineEpics } from 'redux-observable';
import R from 'ramda';

const epicGroups = [require('./auth.epic'), require('./todo.epic')];
const epics = R.flatten(R.map(R.values, epicGroups));

const rootEpic = combineEpics(...epics);

export default rootEpic;
