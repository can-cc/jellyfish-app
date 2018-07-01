// @flow
import { NavigationActions } from 'react-navigation';

export class NavigationService {
  navigatorRef;

  setTopLevelNavigator(navigatorRef) {
    this.navigatorRef = navigatorRef;
  }

  navigate(routeName, params) {
    this.navigatorRef.dispatch(
      NavigationActions.navigate({
        routeName,
        params
      })
    );
  }
}

export default new NavigationService();
