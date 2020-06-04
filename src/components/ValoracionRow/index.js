import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/valoraciones';
import moment from 'moment';

const ValoracionRow = ({ item }) => (
  <View style={styles.container}>
    <TouchableOpacity >
      <View style={styles.rowContainer}>
        <Text style={styles.textos}>Fecha: </Text>
        <Text style={styles.textos}>{ moment(item.fechaValoracion).calendar() }</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.textos}>Puntuación: </Text>
        <Text style={styles.textos}>{ item.puntuacionValoracion }</Text>
      </View>
      <Text style={styles.textos}>Comentario:</Text>
      <Text style={styles.textos}>{ item.comentarioValoracion }</Text>
    </TouchableOpacity>
  </View>
);

export default connect(
  (state, { item }) => ({
    ...selectors.getComentario(state, item),
  }),
  undefined,
)(ValoracionRow);

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
