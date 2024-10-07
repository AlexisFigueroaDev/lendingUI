import Reactotron from 'reactotron-react-native';

Reactotron.configure({name: 'LendingUI'}) // Configura el nombre de tu proyecto
  .useReactNative() // Añade todos los plugins predeterminados de React Native
  .connect(); // Conecta con la aplicación Reactotron

Reactotron.clear();

console.tron = Reactotron;

export default Reactotron;
