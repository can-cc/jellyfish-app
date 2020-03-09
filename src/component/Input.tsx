import React, { Component, SyntheticEvent } from 'react';
import { TextInput, TextInputProperties } from 'react-native';

export interface TextInputProps extends TextInputProperties {
  focused?: boolean;
}

export function Input(props: TextInputProps) {
  return <TextInput underlineColorAndroid="transparent" {...props} style={[props.style]} />;
}

// export class Input extends Component<{
//   onChange: (event: SyntheticEvent) => void,
//   style: any
// } & TextInputProps & any, any> {

//   public inputRef: TextInput | null = null;

//   constructor(props: TextInputProps) {
//     super(props as any);

//     this.state = {
//       focused: props.focused || false,
//     };
//   }

//   componentWillUpdate(nextProps: TextInputProps) {
//     if (nextProps.focused !== this.state.focused) {
//       this.setState({
//         focused: nextProps.focused,
//       });
//     }
//   }

//   componentDidMount() {
//     if (this.inputRef && (this.props.autoFocus || this.props.focused)) {
//       this.inputRef.focus();
//     }
//   }

//   componentDidUpdate() {
//     if (this.inputRef && this.props.focused) {
//       this.inputRef.focus();
//     }
//   }

//   focus = () => {
//     if (this.inputRef) {
//       this.inputRef.focus();
//     }
//   }

//   clear = () => {
//     if (this.inputRef) {
//       this.inputRef.clear();
//     }
//   }

//   render() {
//     return (

//     );
//   }
// }
