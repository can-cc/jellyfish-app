import React from 'react';
import { TouchableHighlight } from 'react-native';

export class Button extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={[
          {
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0,
            borderRadius: 16,
            backgroundColor: this.props.transparent ? 'transparent' : '#ddecff'
          },
          this.props.style
        ]}
        activeOpacity={1}
        underlayColor="#C0D9FA"
        onPress={(e?: any) => this.props.onPress(e)}
      >
        {this.props.children}
      </TouchableHighlight>
    );
  }
}

export const AppButton = Button;
