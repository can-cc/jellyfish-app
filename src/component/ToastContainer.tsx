import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { makeActionRequestCollection } from '../redux/action/actions';
import Input from '../component/Input';
import { NavigationScreenOptions, NavigationContainerProps, NavigationEventSubscription } from 'react-navigation';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { AppText } from '../component/AppText';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisH, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { updateTodoRequest, deleteTodoRequest } from '../redux/action/todo';
import Toast, {DURATION} from 'react-native-easy-toast'

class ToastRootPlaceholder extends Component<{}> {
  

  componentWillMount() {}

  componentDidMount() {
   
  }

  componentWillUnmount() {
   
  }

 

  render() {
    return (
      <View style={styles.container}>
        <Toast ref="toast"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
  }
});

export const ToastContainer = connect(
  (state: any, props: any) => {
    return {
     
    };
  }
)(ToastRootPlaceholder);
