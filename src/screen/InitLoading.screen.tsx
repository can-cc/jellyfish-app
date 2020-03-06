// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { ActivityIndicator, View } from 'react-native';

// class InitLoadingScreen extends Component<any, any> {
//   constructor(props) {
//     super(props);
//     this.bootstrap();
//   }

//   componentDidMount() {}

//   bootstrap = () => {
//     this.props.navigation.navigate(this.props.token ? 'Main' : 'SignIn');
//   };

//   render() {
//     return (
//       <View style={{ flex: 1 }}>
//         <ActivityIndicator />
//       </View>
//     );
//   }
// }

// export const InitLoadingScreenContainer = connect((state: any) => {
//   return { token: state.auth.token };
// })(InitLoadingScreen);
