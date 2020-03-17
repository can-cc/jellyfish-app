import * as React from 'react';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en: {
    welcome: 'Hello',
    loginText: 'Login',
    goSignUpText: 'New to Jellyfish? Create an account',
    logInAuthError: 'Username or password incorrectly',
    logInCommonError: 'Login failure',
    usernameText: 'Username',
    passwordText: 'Password',
    createTodoCommonFailure: 'Creation failed, please try again'
  },
  zh: {
    welcome: '欢迎',
    loginText: '登陆',
    goSignUpText: '注册新用户',
    logInAuthError: '用户名或密码错误，请重试',
    logInCommonError: '登陆失败，请稍后重试',
    usernameText: '用户名',
    passwordText: '密码',
    createTodoCommonFailure: '创建失败，请重试'
  }
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;
