import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator(); 

import { Home } from '../screens/Home';
import { Habit } from '../screens/Habit';
import { New } from '../screens/New';

export function AppRotues() {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
    >
      <Screen 
        name="home"
        component={Home}
      />

      <Screen 
        name="habit"
        component={Home}
      />

      <Screen 
        name="new"
        component={New}
      />
    </Navigator>
  );
}