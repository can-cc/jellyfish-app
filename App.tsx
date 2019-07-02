import React, { Component } from 'react';
import { View, StatusBar, Image, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';

import createStore from './src/store/store';
import NavigationService from './src/service/single/navigation.service';

import { PersistGate } from 'redux-persist/integration/react';
import { MenuProvider } from 'react-native-popup-menu';
import { loadAllAsset } from './src/helper/asset';
import { AppContainer } from './src/navigation/app-container';
import { PersistorContext } from './src/component/context/PersistorContext';

const { store, persistor } = createStore();

export default class Main extends Component {
  state = { isReady: false };
  persistorUnsubscribe: any;

  guaranteePersist = () => {
    return new Promise((resolve, reject) => {
      this.persistorUnsubscribe = persistor.subscribe(() => {
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
          this.persistorUnsubscribe && this.persistorUnsubscribe();
          resolve();
        } else {
          reject();
        }
      });
    });
  };

  loadResourcesAsync = (): Promise<void> => {
    return Promise.all([this.guaranteePersist(), loadAllAsset()]).then();
  };

  handlePersistorState() {}

  componentWillUnmount() {
    this.persistorUnsubscribe && this.persistorUnsubscribe();
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onFinish={() => {
            this.setState({ isReady: true });
          }}
          onError={error => {
            if (!error) {
              return;
            }
            console.warn(error);
          }}
        />
      );
    }

    return (
      <MenuProvider>
        <PersistorContext.Provider value={persistor}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <View style={{ flex: 1 }}>
              <StatusBar barStyle="dark-content" />
              <AppContainer
                ref={navigatorRef => {
                  NavigationService.setTopLevelNavigator(navigatorRef);
                }}
              />
            </View>
          </PersistGate>
        </Provider>
        </PersistorContext.Provider>
        
      </MenuProvider>
    );
  }
}
