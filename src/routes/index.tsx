import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/**
    prefix penamaan pake nama module contoh => NamaModulesNamaScreen = AppLogin
*/
enum ROUTERS {

  HomeAttendance = 'HomeAttendance',
  AuthMain = 'AuthMain',
  ProductDetails = 'ProductDetails',

}

export type RouteParams = {
  title?: string;
  data?: any;
};


export type RootStackNavigationTypes = {

  [ROUTERS.HomeAttendance]: RouteParams | undefined;
  [ROUTERS.AuthMain]: RouteParams | undefined;
  [ROUTERS.ProductDetails]: { productId: number; title?: string; product?: any } | undefined;

};

const Stack = createNativeStackNavigator<RootStackNavigationTypes>();
const { Navigator } = Stack;
const { Screen } = Stack;

export { NavigationContainer, Navigator, ROUTERS, Screen, Stack };

