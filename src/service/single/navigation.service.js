// @flow
export class NavigationService {
  navigatorRef;

  setTopLevelNavigator(navigatorRef) {
    this.navigatorRef = navigatorRef;
  }
}

export default new NavigationService();
