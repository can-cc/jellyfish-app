import { createStackNavigator } from "react-navigation";
import { ProfileScreenContainer } from "../screen/Profile.screen";
import { AboutScreenContainer } from "../screen/About.screen";
import { AccountScreenContainer } from "../screen/Account.screen";

export const ProfileStack = createStackNavigator({
  Profile: ProfileScreenContainer,
  About: AboutScreenContainer,
  Account: AccountScreenContainer
});
