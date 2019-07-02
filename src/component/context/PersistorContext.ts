import React from 'react';
import { Persistor } from 'redux-persist';

export const PersistorContext = React.createContext<Persistor| null>(null);
