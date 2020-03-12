import React, { RefObject } from 'react';
import { NavigationProp, ParamListBase, NavigationContainerRef } from '@react-navigation/native';

export const navigationRef: RefObject<NavigationContainerRef> = React.createRef();

export function navigate(name, params?) {
  navigationRef.current?.replace;
  navigationRef.current?.navigate(name, params);
}

export function replace(name, params?) {
  navigationRef.current?.replace(name, params);
}
