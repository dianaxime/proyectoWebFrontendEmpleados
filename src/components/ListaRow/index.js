import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/listas';

const ListaRow = ({ item, producto }) => (
  <View style={styles.container}>
    <Text style={styles.producto}>{ producto.nombreProducto }</Text>
    <TouchableOpacity>
      <View style={styles.rowContainer}>
        <Text style={styles.textos}>Fecha:                               </Text>
        <Text style={styles.textos}>{ item.fechaLista }</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.textos}>Cantidad:                                        </Text>
        <Text style={styles.textos}>{ item.cantidadLista }</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.textos}>Turno:                                </Text>
        <Text style={styles.textos}>{ item.turnoLista }</Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default connect(
  (state, { item }) => ({
    ...selectors.getCompra(state, item),
    producto: selectors.getProducto(state, item.idProducto)
  }),
  undefined,
)(ListaRow);

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
  producto: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
