import { MainTab } from "./main-tab";
import { createSwitchNavigator } from "react-navigation";
import { SignInScreenContainer } from "../screen/SignIn.screen";
import { InitLoadingScreenContainer } from "../screen/InitLoading.screen";

export const AppSwitchNavigator = createSwitchNavigator(
  {
    InitLoading: InitLoadingScreenContainer,
    Main: MainTab,
    SignIn: SignInScreenContainer
  },
  {
    initialRouteName: 'InitLoading'
  }
);
