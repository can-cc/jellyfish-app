import React, { RefObject } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef: RefObject<NavigationContainerRef> = React.createRef();

export function navigate(name, params?) {
  navigationRef.current?.navigate(name, params);
}

export function replace(name, params?) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{ name: name, params }]
  });
}
