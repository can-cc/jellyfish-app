import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, PixelRatio, FlatList } from 'react-native';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { PersistorContext } from '../component/context/PersistorContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppListItem } from '../component/ListItem';
import { ProfileInfo } from '../component/profile/ProfileInfo';
import { getUserInfoRequest } from '../action/user';
import { UserInfo } from '../typing/user';

const Item = View;

const dp2px = (dp: any) => PixelRatio.getPixelSizeForLayoutSize(dp);
const px2dp = (px: any) => PixelRatio.roundToNearestPixel(px);

class SettingScreen extends Component<
  {
    actions: ActionCreatorsMapObject;
    userId: string;
    userInfo: UserInfo;
  },
  any
> {

  static navigationOptions = {
    title: 'Setting'
  };

  componentWillMount() {
    this.props.actions.getUserInfo({
      userId: this.props.userId
    });
  }

  logout = (persistor: any) => {
    // Modal.alert('登出', '确定登出吗？', [
    //   { text: '取消' },
    //   {
    //     text: '确定',
    //     onPress: () => {
    //       persistor.purge();
    //       this.props.logout();
    //       this.props.navigation.navigate('SignIn');
    //     }
    //   }
    // ]);
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
          }}
        >
         
          <AppListItem>
            <Ionicons style={{ marginRight: 16, color: '#999' }} name="ios-exit" size={25} />
            <Text>Logout</Text>
          </AppListItem>
        </View>
      </View>
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
      actions: bindActionCreators(
        {
          getUserInfo: getUserInfoRequest
        },
        dispatch
      ),
      logout: () => {
        dispatch({ type: 'RESET' });
      }
    };
  }
)(SettingScreen);
