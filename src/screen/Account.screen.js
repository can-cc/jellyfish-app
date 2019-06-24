import React from 'react';
import { StyleSheet, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { makeActionRequestCollection } from '../action/actions';

const Item = View;

class AccountScreen extends React.Component {
  static defaultNavigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title: '账号',
      tabBarLabel: '账号',
      headerBackTitle: null
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <List renderHeader={() => '账号'}>
          <Item extra={this.props.username}>用户名</Item>
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});

export const AccountScreenContainer = connect(
  (state, props) => {
    return { username: state.auth.username };
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(AccountScreen);
