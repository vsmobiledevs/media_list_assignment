import React from 'react';
import {LogBox} from 'react-native';
import MediaList from './src/screens/MediaList';

// ignore warnings
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <>
      <MediaList />
    </>
  );
};

export default App;
