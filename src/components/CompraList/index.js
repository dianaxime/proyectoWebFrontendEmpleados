import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Button, TouchableOpacity } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/compras';
import * as actionsListas from '../../actions/listas';
import * as actionsClientes from '../../actions/clientes';
import * as actionsProductos from '../../actions/productos';
import * as actionsUsuarios from '../../actions/usuarios';
import CompraRow from '../CompraRow';
import moment from 'moment';

const CompraList = ({ compras, isLoading, onLoad, onExpire, onFinish }) => {
  useEffect(onLoad, []);
  return (
    <View style={styles.container}>
      {
        compras.length === 0 && !isLoading && (
          <Text style={styles.addText}>{'No hay Compras'}</Text>
        )
      }
      {
        isLoading && (
          <ActivityIndicator/>
        )
      }
      {
        compras.length > 0 && !isLoading && (
          <>
            <ScrollView>
              {compras && compras.map((item, i) => (
                <CompraRow
                  key={i}
                  item={item} 
                />
              ))}
            </ScrollView>
            <View style={styles.addContainer}>
              <TouchableOpacity onPress={onFinish} style={styles.addButton}>
                <Text style={styles.addText}>Finalizar Compra</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.addContainer}>
              <TouchableOpacity onPress={onExpire} style={styles.quitButton}>
                <Text style={styles.addText}>Quitar Producto</Text>
              </TouchableOpacity>
            </View>
          </>
        )
      }
    </View>
  );
};

export default connect(
  state => ({
    compras: selectors.getCompras(state),
    isLoading: selectors.isFetchingCompras(state),
    cliente: selectors.getCliente(state, selectors.getAuthUserID(state)),
    selectedCompra: selectors.getSelectedCompra(state),
    tienda: selectors.getSelectedTienda(state),
    listas: selectors.getListas(state),
    compra: selectors.getCompra(state, selectors.getSelectedCompra(state))
  }),
  dispatch => ({
    onLoad(cliente) {
      dispatch(actions.startFetchingCompras(cliente));
    },
    onCharge(){
      dispatch(actionsProductos.startFetchingProductos());
      dispatch(actionsListas.startFetchingListas());
    },
    onPile(){
      dispatch(actionsUsuarios.startFetchingUsuario());
      setTimeout(() => {
        dispatch(actionsClientes.startFetchingCliente());
      }, 1000);
    },
    onExpire(producto, listas, compra){
      dispatch(actions.startExpiringCompra(producto));
      console.log(compra);
      listas.map(lista => {
        lista.idProducto === compra.idProducto && lista.fechaLista === moment().format('YYYY-MM-DD') && (
          dispatch(actionsListas.startIncreasingLista(lista.id, compra.cantidadCompra))
        )
      });
    },
    onFinish(cliente, tienda, compras){
      dispatch(actions.startPutingCompras(cliente, tienda, compras, compras));
    },
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onLoad() {
      dispatchProps.onCharge();
      setTimeout(() => {
        dispatchProps.onPile();
      }, 1000);
      setTimeout(() => {
        console.log("-----",stateProps.cliente),
        stateProps.cliente != null && (
          console.log("Hola mundo!"),
          dispatchProps.onLoad(stateProps.cliente['id'])  
        );
      }, 2000);    
    },
    onExpire(){
      dispatchProps.onExpire(stateProps.selectedCompra, stateProps.listas, stateProps.compra);
    },
    onFinish(){
      dispatchProps.onFinish(stateProps.cliente, stateProps.tienda, stateProps.compras);
    },
  })
)(CompraList);

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
  addButton: {
    backgroundColor: '#ff9b11',
    borderRadius: 10,
    alignItems: 'center',
    width: 175,
  },
  quitButton: {
    backgroundColor: '#C71A0A',
    borderRadius: 10,
    alignItems: 'center',
    width: 175,
  }, 
  addText :{
    fontSize: 20,
    color: '#0d0100',
    padding: 5,
  },
  addContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 30,
    margin: 10,
  },
});
