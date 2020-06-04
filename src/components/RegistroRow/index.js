import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/registros';

const RegistroRow = ({ item, producto }) => (
  <View style={styles.container}>
    <TouchableOpacity >
      <View style={styles.rowContainer}>
        <Text>{ item.cantidadRegistro }        </Text>
        <Text>     { producto.nombreProducto }</Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default connect(
  (state, { item }) => ({
    ...selectors.getRegistro(state, item),
    producto: selectors.getProducto(state, item.idProducto)
  }),
  undefined,
)(RegistroRow);

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#fff',
    alignItems: 'flex-start',
    marginTop: 2,
    marginBottom: 2,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  }, 
  textos: {
    fontSize: 14,
    color: '#0d0100',
  },
  fecha: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
