import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import { store, persistor } from './src/redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { MenuProvider } from 'react-native-popup-menu';
import { loadAllAsset } from './src/helper/asset';
import { AppNavigation } from './src/navigation/AppNavigation';
import { PersistorContext } from './src/component/context/PersistorContext';
import * as Localization from 'expo-localization';
import moment from 'moment';
import 'moment/locale/zh-cn'

import './src/i18n/i18n';

moment.locale(Localization.locale);



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
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <MenuProvider>
          <PersistorContext.Provider value={persistor}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <AppNavigation />
              </PersistGate>
            </Provider>
          </PersistorContext.Provider>
        </MenuProvider>
      </View>
    );
  }
}
