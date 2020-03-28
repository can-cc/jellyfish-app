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
    createTodoCommonFailure: 'Creation failed, please try again',
    createTodoToggleText: 'Add to do',
    defaultTodoListName: 'Task',
    addDeadlineText: 'Add Deadline',
    createdAtText: 'Created at',
    remindMeText: 'Remind me',
    addFileText: 'Add files',
    addNoteText: 'Add note',
    deleteText: 'Delete',
    cancelText: 'Cancel',
    deleteTodoTitle: 'Delete to do',
    deleteTodoConfirm: 'Confirm to delete to do'
  },
  zh: {
    welcome: '欢迎',
    loginText: '登陆',
    goSignUpText: '注册新用户',
    logInAuthError: '用户名或密码错误，请重试',
    logInCommonError: '登陆失败，请稍后重试',
    usernameText: '用户名',
    passwordText: '密码',
    createTodoCommonFailure: '创建失败，请重试',
    createTodoToggleText: '添加待办事项',
    defaultTodoListName: '任务',
    addDeadlineText: '添加到期时间',
    createdAtText: '创建于',
    remindMeText: '提醒我',
    addFileText: '添加文件',
    addNoteText: '添加备注',
    deleteText: '删除',
    cancelText: '取消',
    deleteTodoTitle: '删除待办',
    deleteTodoConfirm: '删除后不能恢复，确定要删除吗?'
  }
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;
