import { MainTab } from './main-tab';
import { SignInScreenContainer } from '../screen/LogIn.screen';
// import { InitLoadingScreenContainer } from '../screen/InitLoading.screen';
import { createStackNavigator } from '@react-navigation/stack';
import { TodoStack } from './todo-stack';
import { useSelector } from 'react-redux';
import { AppRootState } from '../reducer/reducer';
import React from 'react';

// export const AppSwitchNavigator = createSwitchNavigator(
//   {
//     InitLoading: InitLoadingScreenContainer,
//     Main: MainTab,
//     SignIn: SignInScreenContainer
//   },
//   {
//     initialRouteName: 'InitLoading'
//   }
// );

const Stack = createStackNavigator();

// TODO move login logic here https://reactnavigation.org/docs/upgrading-from-4.x
export function AppSwitchNavigator() {
  const authToken = useSelector((state: AppRootState) => state.auth.token);
  return (
    <Stack.Navigator>
      {authToken ? (
        <>
          <Stack.Screen name="Todo" component={TodoStack} />
        </>
      ) : (
        <Stack.Screen name="Login" component={SignInScreenContainer} />
      )}
    </Stack.Navigator>
  );
}
