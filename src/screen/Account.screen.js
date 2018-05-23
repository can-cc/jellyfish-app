import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  WingBlank,
  TextareaItem,
  Flex,
  Modal,
  WhiteSpace,
  Button,
  List,
  InputItem,
  DatePicker
} from 'antd-mobile';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import { makeActionRequestCollection } from '../action/actions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import format from 'date-fns/format';
import R from 'ramda';

const Item = List.Item;

class AccountScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
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
