import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, PixelRatio, FlatList } from 'react-native';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { PersistorContext } from '../component/context/PersistorContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppListItem } from '../component/ListItem';
import { ProfileInfo } from '../component/profile/ProfileInfo';
import { getUserInfoRequest } from '../redux/action/user';
import { UserInfo } from '../typing/user';
import { NavigationContainerProps } from '@react-navigation/native';

const Item = View;

const dp2px = (dp: any) => PixelRatio.getPixelSizeForLayoutSize(dp);
const px2dp = (px: any) => PixelRatio.roundToNearestPixel(px);

class ProfileScreen extends Component<
  NavigationContainerProps & {
    actions: ActionCreatorsMapObject;
    userId: string;
    userInfo: UserInfo;
  },
  any
> {
  static navigationOptions = {
    title: 'Profile'
  };

  componentWillMount() {
    this.props.actions.getUserInfo({
      userId: this.props.userId
    });
  }

  onSettingPress = () => {
    // this.props.navigation!.navigate('Setting');
  };

  render() {
    return (
      <View style={styles.container}>
        <ProfileInfo userInfo={this.props.userInfo} />

        <View
          style={{
            height: 16,
            width: '100%',
            backgroundColor: '#f8f8f8'
          }}
        ></View>

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
            paddingTop: 18
          }}
        >
          <AppListItem>
            <Ionicons style={{ marginRight: 16, color: '#999' }} name="ios-contact" size={25} />
            <Text>Account</Text>
          </AppListItem>

          <AppListItem>
            <Ionicons style={{ marginRight: 16, color: '#999' }} name="ios-information-circle" size={25} />
            <Text>About</Text>
          </AppListItem>

          <AppListItem onPress={this.onSettingPress}>
            <Ionicons style={{ marginRight: 16, color: '#999' }} name="ios-exit" size={25} />
            <Text>Setting</Text>
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
    alignItems: 'center'
  }
});

export const ProfileScreenContainer = connect(
  (state: any) => {
    return {
      userInfo: state.auth.userInfo || {},
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
)(ProfileScreen);
