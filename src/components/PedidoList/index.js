import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/pedidos';
import * as actionsUsuarios from '../../actions/usuarios';
import * as actionsClientes from '../../actions/clientes';
import * as actionsEmpleados from '../../actions/empleados';
import * as actionsProductos from '../../actions/productos';
import * as actionsRegistros from '../../actions/registros';
import PedidoRow from '../PedidoRow';


const PedidoList = ({ pedidos, isLoading, onLoad }) => {
  useEffect(onLoad, []);
  return (
    <View style={styles.container}>
      <View>
        {
          pedidos.length === 0 && !isLoading && (
            <Text>{'No hay Pedidos'}</Text>
          )
        }
      </View>
      <View>
        {
          isLoading && (
            <ActivityIndicator color='#400601'/>
          )
        }
      </View>
      <View>
        {
          pedidos.length > 0 && !isLoading && (
            <ScrollView>
              {pedidos && pedidos.map((item, i) => (
                <PedidoRow
                  key={i}
                  item={item} 
                />
              ))}
            </ScrollView>
          )
        }
      </View>
    </View>
  );
};

export default connect(
  state => ({
    pedidos: selectors.getPedidos(state),
    isLoading: selectors.isFetchingPedidos(state),
    tipo: selectors.getUsuario(state),
    cliente: selectors.getCliente(state, selectors.getAuthUserID(state)),
  }),
  dispatch => ({
    onLoad(tipo, cliente) {
      tipo === 'Cliente' ? (
        cliente != null && (
          dispatch(actions.startFetchingPedidosClientes(cliente['id']))
        )
      ): (
        dispatch(actions.startFetchingPedidos())
      )
    },
    onPile(tipo){
      dispatch(actionsUsuarios.startFetchingUsuario());
      setTimeout(() => {
        tipo === 'Cliente' ? (
          dispatch(actionsClientes.startFetchingCliente())
        ) : (
          dispatch(actionsEmpleados.startFetchingEmpleado())
        )
      }, 1000);
      setTimeout(() => {
        dispatch(actionsRegistros.startFetchingRegistros());
      }, 100);
      setTimeout(() => {
        dispatch(actionsProductos.startFetchingProductos());
      }, 100);
    },
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onLoad() {
      setTimeout(() => {
        dispatchProps.onPile();
      }, 1000);
      setTimeout(() => {
        console.log("-----",stateProps.cliente, stateProps.tipo),
        stateProps.tipo != null && (
          console.log("Hola mundo!"),
          dispatchProps.onLoad(stateProps.tipo, stateProps.cliente)  
        );
      }, 3000);    
    },
  })
)(PedidoList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  scroll: {
    paddingVertical: 5,
  },
  addText :{
    fontSize: 24,
    color: '#0d0100',
  },
});
