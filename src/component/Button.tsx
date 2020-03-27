import React from 'react';
import { TouchableHighlight, StyleProp, ViewStyle } from 'react-native';

export class Button extends React.Component<{
  type?: 'primary' | 'normal';
  onPress?: Function;
  transparent?: boolean;
  style?: StyleProp<ViewStyle>;
  round?: boolean;
}> {
  getUnderlayColor(): string {
    const { type = 'normal' } = this.props;
    switch (type) {
      case 'normal':
      default:
        return '#f8f8f8';
    }
  }

  getBgColor(): string {
    if (this.props.transparent) {
      return 'transparent';
    }
    if (this.props.type === 'primary') {
      return '#4295ff';
    }
    return 'transparent';
  }

  render() {
    return (
      <TouchableHighlight
        style={[
          {
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 18,
            paddingRight: 18,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0,
            borderRadius: this.props.round ? 18 : 6,
            backgroundColor: this.props.transparent ? 'transparent' : '#4295ff'
          },
          this.props.style
        ]}
        activeOpacity={1}
        underlayColor={this.getUnderlayColor()}
        onPress={(e: any) => {
          if (!this.props.onPress) {
            return;
          }
          this.props.onPress(e);
        }}
      >
        {this.props.children}
      </TouchableHighlight>
    );
  }
}

export const AppButton = Button;
