import { LogBox, Platform } from 'react-native';
import Reactotron from 'reactotron-react-native';

const reactotron = Reactotron.configure({
 name: 'TestWomFe',
}).useReactNative();

if (__DEV__) {
  LogBox.ignoreLogs([
    'Require cycle:',
    'new NativeEventEmitter',
    'SerializableStateInvariantMiddleware',
    'rendered size is not usable',
    'onInstallConversionFailure',
    'ImmutableStateInvariantMiddleware',
    'Non-serializable values were found in the navigation state',
    'VirtualizedLists should never be nested',
    'source.uri',
    'AxiosError',
    'ViewPropTypes',
    'No native splash screen registered for given view controller.',
    'Cannot set prop ',
    'Possible Unhandled Promise Rejection (id: 0):',
    'componentWillMount has been renamed, and is not recommended for use.  See https://reactjs.org/link/unsafe-component-lifecycles for details.',
    'Encountered two children with the same key,',
  ]);
  
  let host = 'localhost';
  
  if (Platform.OS === 'android') {
    // Untuk Android, coba gunakan debuggerHost dari Constants
    host = ('10.0.2.2').split(':')[0];

  } else {
    // Untuk iOS, gunakan localhost atau debuggerHost
    host = 'localhost';
  }
  
  console.log('Reactotron connecting to host:', host);
  Reactotron.configure({ host }).connect();
}

export default reactotron;
