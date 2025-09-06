import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigation/StackNavigator';
import { navigationRef } from './navigationRef';

export default function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <StackNavigator />
    </NavigationContainer>
  );
}
