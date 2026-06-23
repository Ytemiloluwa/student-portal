import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme, DarkTheme as NavDarkTheme } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { RootNavigator } from './src/navigation/RootNavigator';

// A strict Black and White custom theme
const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000000',
    background: '#FFFFFF',
    card: '#F8F8F8',
    text: '#000000',
    border: '#E0E0E0',
    notification: '#000000',
  },
};

const DarkTheme = {
  ...NavDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    primary: '#FFFFFF',
    background: '#000000',
    card: '#121212',
    text: '#FFFFFF',
    border: '#333333',
    notification: '#FFFFFF',
  },
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer theme={isDarkMode ? DarkTheme : LightTheme}>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
