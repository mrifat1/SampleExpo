import { createNavigationContainerRef } from '@react-navigation/native';

export type RootStackParamList = {
  Main: undefined;
  notification: undefined;
  settings: undefined;
  Profile: undefined;
  Home: undefined;
  PrivacyPolicyScreen: undefined
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: keyof RootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
