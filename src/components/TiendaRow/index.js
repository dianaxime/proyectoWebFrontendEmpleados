import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/tiendas';
import * as selectedActions from '../../actions/selectedTienda';

const TiendaRow = ({ item, onSelect }) => (
  <View style={styles.container}>
    <Text style={styles.tienda}>{ item.nombreTienda }</Text>
    <TouchableOpacity onPress={onSelect}>
      <View style={styles.rowContainer}>
        <Text style={styles.textos}>Ubicacion:           </Text>
        <Text style={styles.textos}>{ item.ubicacionTienda }</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.textos}>Telefóno:           </Text>
        <Text style={styles.textos}>{ item.telefonoTienda }</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.textos}>Fax:                    </Text>
        <Text style={styles.textos}>{ item.faxTienda }</Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default connect(
  (state, { item }) => ({
    ...selectors.getTienda(state, item),
  }),
  (dispatch, { item }) => ({
    onSelect() {
      console.log(item.id);
      dispatch(selectedActions.selectTienda(item.id));
    },
  }),
)(TiendaRow);

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
  tienda: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
