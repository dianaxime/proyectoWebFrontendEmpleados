import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, Button, TouchableOpacity, View } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/facturas';
import moment from 'moment';

const FacturaRow = ({ item }) => (
  <View style={styles.container}>
    <TouchableOpacity>
        <Text style={styles.fecha}>{ moment(item.fechaFactura).format('LLL') }</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.textos}>Subtotal:                            </Text>
          <Text style={styles.textos}>Q{ parseFloat(item.subtotalFactura).toFixed(2) }</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textos}>IVA:                                    </Text>
          <Text style={styles.textos}>Q{ parseFloat(item.ivaFactura).toFixed(2) }</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textos}>Total:                                 </Text>
          <Text style={styles.textos}>Q{ parseFloat(item.totalFactura).toFixed(2) }</Text>
        </View>
    </TouchableOpacity>
  </View>
);

export default connect(
  (state, { item }) => ({
    ...selectors.getFactura(state, item),
  }),
  undefined,
)(FacturaRow);

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
  fecha: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
