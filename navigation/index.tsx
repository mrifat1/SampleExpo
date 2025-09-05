import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigation/StackNavigator';

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
