import React from 'react';
import { TouchableHighlight } from 'react-native';

export class Button extends React.Component<
  {
    type: 'primary' | 'normal';
  } & any,
  any
> {

  getUnderlayColor(): string {
    const { type = 'normal' } = this.props;
    switch (type) {
      case 'normal':
      default:
        return '#f8f8f8';
    }
  }

  render() {
    return (
      <TouchableHighlight
        style={[
          {
            paddingTop: 10,
            paddingBottom: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0,
            borderRadius: 16,
            backgroundColor: this.props.transparent ? 'transparent' : '#ddecff'
          },
          this.props.style
        ]}
        activeOpacity={1}
        underlayColor={this.getUnderlayColor()}
        onPress={(e: any) => this.props.onPress(e)}
      >
        {this.props.children}
      </TouchableHighlight>
    );
  }
}

export const AppButton = Button;
