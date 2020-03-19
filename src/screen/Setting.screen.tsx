import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, PixelRatio, FlatList, Alert } from 'react-native';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { PersistorContext } from '../component/context/PersistorContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppListItem } from '../component/ListItem';
import { ProfileInfo } from '../component/profile/ProfileInfo';
import { getUserInfoRequest } from '../redux/action/user';
import { UserInfo } from '../typing/user';
import { ListButton } from '../component/ListButton';
import { NavigationContainerProps } from 'react-navigation';
import { AppText } from '../component/AppText';

const Item = View;

const dp2px = (dp: any) => PixelRatio.getPixelSizeForLayoutSize(dp);
const px2dp = (px: any) => PixelRatio.roundToNearestPixel(px);

class SettingScreen extends Component<NavigationContainerProps &
  {
    logout: () =>void;
    userId: string;
    userInfo: UserInfo;
  },
  any
> {
  static navigationOptions = {
    title: 'Setting'
  };

 

  logout = (persistor: any) => {
    Alert.alert(
      'Logout',
      'Are you sure to logout?',
      [
        {
          text: 'OK',
          onPress: () => {
            persistor.purge();
            this.props.logout();
            this.props.navigation!.navigate('SignIn');
          }
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }
      ],
      {
        cancelable: false
      }
    );
  };

  render() {
    return (
      <PersistorContext.Consumer>
        {(persistor: any) => (
          <View style={styles.container}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '100%'
              }}
            >
              <ListButton
                onPress={() => {
                  this.logout(persistor);
                }}
              >
                <AppText style={{fontWeight: '700'}}>Logout</AppText>
              </ListButton>
            </View>
          </View>
        )}
      </PersistorContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 24
  }
});

export const SettingScreenContainer = connect(
  (state: any) => {
    return {
      userInfo: state.auth.userInfo,
      userId: state.auth.userId
    };
  },
  dispatch => {
    return {
      logout: () => {
        dispatch({ type: 'RESET' });
      }
    };
  }
)(SettingScreen);
