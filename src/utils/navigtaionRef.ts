import {createNavigationContainerRef} from '@react-navigation/native';
import {RootStackParamList} from '@/types/StackNavigationType';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    // TODO: 타입추론 방안 강구
    navigationRef.navigate(name as any, params as any);
  }
}
