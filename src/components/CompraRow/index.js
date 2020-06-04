import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/compras';
import * as selectedActions from '../../actions/selectedCompra';

const CompraRow = ({ item, producto, onSelect }) => (
  <View style={styles.container}>
    <Text style={styles.titulo}>{ producto.nombreProducto }</Text>
    <TouchableOpacity onPress={onSelect}>
      <View style={styles.rowContainer}>
        <Text>Cantidad:                                       </Text>
        <Text>{ item.cantidadCompra }</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text>Subtotal:                                   </Text>
        <Text>Q{ parseFloat(item.subtotalCompra).toFixed(2) }</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text>Descuento:                                </Text>
        <Text>Q{ parseFloat(item.descuentoCompra).toFixed(2) }</Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default connect(
  (state, { item }) => ({
    ...selectors.getCompra(state, item),
    producto: selectors.getProducto(state, item.idProducto)
  }),
  (dispatch, { item }) => ({
    onSelect() {
      console.log(item.id);
      dispatch(selectedActions.selectCompra(item.id));
    },
  }),
)(CompraRow);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.75,
    borderBottomColor: '#0d0100',
    marginTop: 10,
    marginBottom: 10,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  }, 
  textos: {
    fontSize: 14,
    color: '#0d0100',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
