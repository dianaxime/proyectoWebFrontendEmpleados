import 'react-native-gesture-handler';
import React from 'react';
import { connect } from 'react-redux';
import * as selectors from './src/reducers';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TokenRefresh from './src/components/TokenRefresh';
import Login from './src/components/LoginForm';
import Register from './src/components/RegisterForm';
import DataForm from './src/components/DataForm';
import NavigationComponents from './src/components/NavigationComponents';


const Stack = createStackNavigator();
const MainApp = ({
  isAuthenticated = false,
  fetchingCliente = false,
  fetchingEmpleado = false,
  tipo = null,
  cliente = null,
  empleado = null,
}) => {
  return (
    <>
        {
          !fetchingCliente && !fetchingEmpleado && !cliente && !empleado && tipo && isAuthenticated && (
            <DataForm open={true}/>
          ) 
        }
      <NavigationContainer>
        {
          !isAuthenticated ? (
            <Stack.Navigator>
              <Stack.Screen name='LogIn' options={{ title: 'Iniciar Sesión', headerTitleStyle: {textAlign: 'center'} }} component={Login} />
              <Stack.Screen name='SignIn' options={{ title: 'Registro' }} component={Register} />
            </Stack.Navigator>
          ) : (
              <>
                <TokenRefresh />
                <NavigationComponents />
              </>
            )
          }
      </NavigationContainer>
    </>
  );
};

export default connect(
  state => ({
    isAuthenticated: selectors.isAuthenticated(state),
    fetchingCliente: selectors.isFetchingCliente(state),
    fetchingEmpleado: selectors.isFetchingEmpleado(state),
    tipo: selectors.getUsuario(state),
    cliente: selectors.getCliente(state, selectors.getAuthUserID(state)),
    empleado: selectors.getEmpleado(state, selectors.getAuthUserID(state)),
  }),
  undefined
)
(MainApp);