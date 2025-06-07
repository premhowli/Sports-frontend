import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GameDetail from './src/features/games/GameDetails';
import ProfileScreen from './src/features/profile/ProfileScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GamesDashboard} from './src/features/games/GamesDashboard';
import { getTabBarIcon } from './src/shared/components/TabBarIcon';

export type RootStackParamList = {
  Dashboard: undefined;
  GameDetail: {gameId: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const GamesStack: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="Dashboard" component={GamesDashboard} />
    <Stack.Screen name="GameDetail" component={GameDetail} />
  </Stack.Navigator>
);


const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: getTabBarIcon(route),
            headerShown: false,
          })}>
          <Tab.Screen name="Games" component={GamesStack} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;


