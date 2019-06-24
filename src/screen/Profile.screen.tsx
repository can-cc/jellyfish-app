import React, {Component} from 'react';
import { Image, StatusBar, StyleSheet, Text, View, Dimensions, PixelRatio } from 'react-native';
import { bindActionCreators } from 'redux';
import { makeActionRequestCollection } from '../action/actions';
import { connect } from 'react-redux';
import { PersistorContext } from '../component/context/PersistorContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_BASE } from '../env/env';

const Item = View;

const dp2px = (dp: any) => PixelRatio.getPixelSizeForLayoutSize(dp);
const px2dp = (px: any) => PixelRatio.roundToNearestPixel(px);

class ProfileScreen extends Component<any, any> {
  static defaultNavigationOptions = {
    title: '账户',
    headerBackTitle: null
  };

  componentWillMount() {
    this.props.actions.GET_USER_INFO_REQUEST({
      userId: this.props.userId
    });
  }

  logout = (persistor: any) => {
    Modal.alert('登出', '确定登出吗？', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          persistor.purge();
          this.props.logout();
          this.props.navigation.navigate('SignIn');
        }
      }
    ]);
  };

  render() {
    return (
      <PersistorContext.Consumer>
        {persistor => (
          <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Image
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').width / 2.071,
                opacity: 0.8
              }}
              source={require('../assets/3bg.jpg')}
            />
            <View
              style={{
                position: 'absolute',
                top: 30
              }}
            >
              <View style={{ width: 80, height: 80, borderRadius: 40, overflow: 'hidden' }}>
                {this.props.avatar ? (
                  <Image style={{ width: 80, height: 80 }} source={{ uri: `${API_BASE}/${this.props.avatar}` }} />
                ) : (
                  <Image style={{ width: 80, height: 80 }} source={require('../assets/imgs/default-avatar.jpeg')} />
                )}
              </View>
              <Text style={{ alignSelf: 'center', color: 'white' }}>{this.props.username}</Text>
            </View>

            <View>
              <Tabs
                tabs={[{ title: '账户' }, { title: '其他' }]}
                swipeable={false}
                initialPage={'t1'}
                onChange={(tab, index) => {}}
                onTabClick={(tab, index) => {}}
              >
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    height: 450,
                    backgroundColor: '#fff'
                  }}
                >
                  <List style={{ width: '100%' }}>
                    <Item style={{ height: 60 }} onClick={() => this.props.navigation.navigate('Account')}>
                      <View>
                        <Ionicons style={{ marginRight: 10 }} name="ios-contact" size={25} />
                        <Text>账号信息</Text>
                      </View>
                    </Item>

                    <Item style={{ height: 60 }} onClick={() => this.logout(persistor)}>
                      <View>
                        <Ionicons style={{ marginRight: 10 }} name="ios-exit" size={25} />
                        <Text>登出</Text>
                      </View>
                    </Item>
                  </List>
                </View>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    height: 250,
                    backgroundColor: '#fff'
                  }}
                >
                  <List style={{ width: '100%' }}>
                    <Item style={{ height: 60 }} onClick={() => this.props.navigation.navigate('About')}>
                      <View>
                        <Ionicons style={{ marginRight: 10 }} name="ios-information-circle" size={25} />
                        <Text>关于</Text>
                      </View>
                    </Item>
                  </List>
                </View>
              </Tabs>
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
    alignItems: 'center'
  }
});

export const ProfileScreenContainer = connect(
  state => {
    return { username: state.auth.username, userId: state.auth.userId, avatar: state.auth.avatar };
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch),
      logout: () => {
        dispatch({ type: 'RESET' });
      }
    };
  }
)(ProfileScreen);
