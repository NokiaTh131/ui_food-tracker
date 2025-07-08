import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import {theme} from './src/theme/colors';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={theme.primary} barStyle="light-content" />
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            const iconSize = 32; // Large icons for elder-friendly UI

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Assistant') {
              iconName = 'chat';
            } else if (route.name === 'History') {
              iconName = 'history';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            }

            return <Icon name={iconName} size={iconSize} color={color} />;
          },
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.textSecondary,
          tabBarStyle: {
            height: 80,
            paddingBottom: 10,
            paddingTop: 10,
            backgroundColor: theme.background,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: theme.primary,
            height: 80,
          },
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: 'bold',
            color: theme.background,
          },
          headerTintColor: theme.background,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Assistant" component={ChatScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;