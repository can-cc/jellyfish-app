import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { Button } from 'antd-mobile';
import { StackNavigator } from 'react-navigation';
import { PersistGate } from 'redux-persist/integration/react';
import createStore from './src/store/store';

const { store, persistor } = createStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Changes you make will automatically reload.</Text>
            <Text>Shake your phone to open the developer menu.</Text>
            <Button type="warning" onClick={() => this.props.navigation.navigate('Details')}>
              antd-mobile2 button
            </Button>
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default StackNavigator(
  {
    Home: {
      screen: App
    },
    Details: {
      screen: DetailsScreen
    }
  },
  {
    initialRouteName: 'Home'
  }
);
