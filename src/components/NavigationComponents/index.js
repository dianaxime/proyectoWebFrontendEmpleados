import React, {useEffect} from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { connect } from 'react-redux';
import * as selectors from '../../reducers';

import Logout from '../Logout';
import UpgradeForm from '../UpgradeForm';
import ProductoList from '../ProductoList';
import CompraList from '../CompraList';
import TiendaList from '../TiendaList';
import ListaList from '../ListaList';
import FacturaList from '../FacturaList';
import PedidoList from '../PedidoList';
import ValoracionList from '../ValoracionList';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import OfertaForm from '../OfertaForm';
import ProductoForm from '../ProductoForm';
import ListaForm from '../ListaForm';
import TiendaForm from '../TiendaForm';
import UpgradeTienda from '../UpgradeTienda';

const TabHomeEmpleado = createMaterialTopTabNavigator();
function TabNavigatorEmpleado() {
  return (
    <TabHomeEmpleado.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Productos') {
            iconName = 'th-list';
          } else if (route.name === 'Añadir') {
            iconName = 'plus-circle';
          } else if (route.name === 'Ofertas') {
            iconName = 'tags';
          }
          return <FontAwesome5 name={iconName} size={24} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'maroon',
        inactiveTintColor: 'gray',
        indicatorStyle: {
          height: 0,
        },
        showIcon: true,
        style: {
          borderTopWidth: 0.5,
          borderTopColor: 'grey',
          maxHeight: 60,
        },
        labelStyle: {
          fontSize: 10,
        }
      }}
      tabBarPosition='bottom'
    >
      <TabHomeEmpleado.Screen name="Productos" component={ProductoList} />
      <TabHomeEmpleado.Screen name="Añadir" component={ProductoForm} />
      <TabHomeEmpleado.Screen name="Ofertas" component={OfertaForm} />
    </TabHomeEmpleado.Navigator>
  );
}

const TabInventario = createMaterialTopTabNavigator();
function TabNavigatorInventario() {
  return (
    <TabInventario.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Productos') {
            iconName = 'th-list';
          } else if (route.name === 'Listas') {
            iconName = 'list-alt';
          } else if (route.name === 'Añadir') {
            iconName = 'plus';
          }
          return <FontAwesome5 name={iconName} size={24} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'maroon',
        inactiveTintColor: 'gray',
        indicatorStyle: {
          height: 0,
        },
        showIcon: true,
        style: {
          borderTopWidth: 0.5,
          borderTopColor: 'grey',
          maxHeight: 60,
        },
        labelStyle: {
          fontSize: 10,
        }
      }}
      tabBarPosition='bottom'
    >
      <TabInventario.Screen name="Productos" component={ProductoList} />
      <TabInventario.Screen name="Listas" component={ListaList} />
      <TabInventario.Screen name="Añadir" component={ListaForm} />
    </TabInventario.Navigator>
  );
}

const TabUbicaciones = createMaterialTopTabNavigator();
function TabNavigatorUbicaciones() {
  return (
    <TabUbicaciones.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Ubicaciones') {
            iconName = 'map-marker-alt';
          } 
          else if (route.name === 'Añadir') {
            iconName = 'plus';
          }
          else if (route.name === 'Actualizar') {
            iconName = 'edit';
          }
          return <FontAwesome5 name={iconName} size={24} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'maroon',
        inactiveTintColor: 'gray',
        indicatorStyle: {
          height: 0,
        },
        showIcon: true,
        style: {
          borderTopWidth: 0.5,
          borderTopColor: 'grey',
          maxHeight: 60,
        },
        labelStyle: {
          fontSize: 10,
        }
      }}
      tabBarPosition='bottom'
    >
      <TabUbicaciones.Screen name="Ubicaciones" component={TiendaList} />
      <TabUbicaciones.Screen name="Añadir" component={TiendaForm} />
      <TabUbicaciones.Screen name="Actualizar" component={UpgradeTienda} />
    </TabUbicaciones.Navigator>
  );
}

const TabProfileEmpleado = createMaterialTopTabNavigator();
function TabNavigatorProfile() {
  return (
    <TabProfileEmpleado.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Actualizar') {
            iconName = 'user';
          } else if (route.name === 'Comentarios') {
            iconName = 'comments';
          }
          return <FontAwesome5 name={iconName} size={24} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'maroon',
        inactiveTintColor: 'gray',
        indicatorStyle: {
          height: 0,
        },
        showIcon: true,
        style: {
          borderTopWidth: 0.5,
          borderTopColor: 'grey',
          maxHeight: 60,
        },
        labelStyle: {
          fontSize: 10,
        }
      }}
      tabBarPosition='bottom'
    >
      <TabProfileEmpleado.Screen name="Actualizar" component={UpgradeForm} />
      <TabProfileEmpleado.Screen name="Comentarios" component={ValoracionList} />
    </TabProfileEmpleado.Navigator>
  );
}

const TabHomeCliente = createMaterialTopTabNavigator();
function TabNavigatorCliente() {
  return (
    <TabHomeCliente.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Productos') {
            iconName = 'th-list';
          } else if (route.name === 'Compras') {
            iconName = 'shopping-cart';
          }
          return <FontAwesome5 name={iconName} size={24} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'maroon',
        inactiveTintColor: 'gray',
        indicatorStyle: {
          height: 0,
        },
        showIcon: true,
        style: {
          borderTopWidth: 0.5,
          borderTopColor: 'grey',
          maxHeight: 60,
        },
        labelStyle: {
          fontSize: 10,
        }
      }}
      tabBarPosition='bottom'
    >
      <TabHomeCliente.Screen name="Productos" component={ProductoList} />
      <TabHomeCliente.Screen name="Compras" component={CompraList} />
    </TabHomeCliente.Navigator>
  );
}

const DrawerCliente = createDrawerNavigator();
function DrawerNavigatorCliente() {
    return (
        <DrawerCliente.Navigator initialRouteName="Inicio"
            screenOptions={({ route }) => ({
                drawerIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Inicio') {
                        iconName = 'home';
                    } else if (route.name === 'Ubicaciones') {
                        iconName = 'map-marker-alt';
                    }
                    else if (route.name === 'Perfil') {
                        iconName = 'user-edit';
                    }
                    else if (route.name === 'Facturas') {
                        iconName = 'money-bill';
                    }
                    else if (route.name === 'Pedidos') {
                        iconName = 'history';
                    }
                    else if (route.name === 'Salir') {
                        iconName = 'sign-out-alt';
                    }
                    return <FontAwesome5 name={iconName} size={size} color={color} />;
                },
            })}
            drawerContentOptions={{
                activeTintColor: 'maroon',
                inactiveTintColor: 'gray',
                indicatorStyle: {
                    height: 0,
                },
                showIcon: true,
                labelStyle: {
                    fontSize: 16,
                }
            }}
        >
            <DrawerCliente.Screen name="Inicio" component={TabNavigatorCliente} />
            <DrawerCliente.Screen name="Ubicaciones" component={TiendaList} />
            <DrawerCliente.Screen name="Perfil" component={UpgradeForm} />
            <DrawerCliente.Screen name="Facturas" component={FacturaList} />
            <DrawerCliente.Screen name="Pedidos" component={PedidoList} />
            <DrawerCliente.Screen name="Salir" component={Logout} />
        </DrawerCliente.Navigator>
    );
}

const DrawerEmpleado = createDrawerNavigator();
function DrawerNavigatorEmpleado() {
  return (
    <DrawerEmpleado.Navigator initialRouteName="Inicio"
        screenOptions={({ route }) => ({
            drawerIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Inicio') {
                    iconName = 'home';
                }
                else if (route.name === 'Listas') {
                  iconName = 'list-alt';
                } 
                else if (route.name === 'Ubicaciones') {
                    iconName = 'map-marker-alt';
                }
                else if (route.name === 'Perfil') {
                    iconName = 'user-edit';
                }
                else if (route.name === 'Facturas') {
                    iconName = 'money-bill';
                }
                else if (route.name === 'Pedidos') {
                    iconName = 'history';
                }
                else if (route.name === 'Salir') {
                    iconName = 'sign-out-alt';
                }
                return <FontAwesome5 name={iconName} size={size} color={color} />;
            },
        })}
        drawerContentOptions={{
            activeTintColor: 'maroon',
            inactiveTintColor: 'gray',
            indicatorStyle: {
                height: 0,
            },
            showIcon: true,
            labelStyle: {
                fontSize: 16,
            }
        }}
    >
      <DrawerEmpleado.Screen name="Inicio" component={TabNavigatorEmpleado} />
      <DrawerEmpleado.Screen name="Listas" component={TabNavigatorInventario} />
      <DrawerEmpleado.Screen name="Ubicaciones" component={TabNavigatorUbicaciones} />
      <DrawerEmpleado.Screen name="Perfil" component={TabNavigatorProfile} />
      <DrawerEmpleado.Screen name="Facturas" component={FacturaList} />
      <DrawerEmpleado.Screen name="Pedidos" component={PedidoList} />
      <DrawerEmpleado.Screen name="Salir" component={Logout} />
    </DrawerEmpleado.Navigator>
  );
}

const RootStack = createStackNavigator();
const NavigationComponents = ({
    tipo = null,
}) => {
  return (
    <RootStack.Navigator headerMode='none'>
      <RootStack.Screen name='Empleado' component={DrawerNavigatorEmpleado} />
    </RootStack.Navigator>
  );
};

export default connect(
  state => ({
    tipo: selectors.getUsuario(state),
  }),
  undefined
)
(NavigationComponents);