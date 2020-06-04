import React, { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/compras';
import * as actionsListas from '../../actions/listas';
import * as selectedActions from '../../actions/selectedProducto';
import moment from 'moment';

const ProductRow = ({ item, onSelect, onShop, tipo }) => {
  const [cant, changeCant] = useState(0);
  const sum = () => changeCant(cant+1);
  const res = () => {
    cant > 0 ? (
      changeCant(cant-1)
    ) : (
      changeCant(0)
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.producto}>{ item.nombreProducto }</Text>
      <TouchableOpacity onPress={onSelect}>
        <View>
          <Text style={styles.textos}>{ item.descripcionProducto }</Text>
          <View style={styles.textContainer}>
            <Text style={styles.textos}>Precio:                               </Text>
            <Text style={styles.textos}>Q { parseFloat(item.precioProducto).toFixed(2) }</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textos}>Descuento:                        </Text>
            <Text style={styles.textos}>Q { parseFloat(item.descuentoProducto).toFixed(2) }</Text>
          </View>
        </View>
          {
            (tipo === 'Cliente') && (
              <View style={styles.containerButton}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={res}>
                  <Text style={styles.textButtons}>-</Text>
                </TouchableOpacity>
                <Text style={styles.textboxes}>{ cant }</Text>
                <TouchableOpacity style={styles.button} onPress={sum}>
                  <Text style={styles.textButtons}>+</Text>
                </TouchableOpacity>
              </View>
                <View >
                  <TouchableOpacity onPress={() => onShop(cant)} style={styles.addButton}>
                      <Text style={styles.addText}>Añadir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          }
      </TouchableOpacity>
    </View>
);
}

export default connect(
  (state, { item }) => ({
    ...selectors.getProducto(state, item),
    cliente: selectors.getCliente(state, selectors.getAuthUserID(state)),
    tipo: selectors.getUsuario(state),
    listas: selectors.getListas(state),
  }),
  (dispatch, { item }) => ({
    onSelect() {
      console.log(item.id);
      dispatch(selectedActions.selectProducto(item.id));
    },
    onShop(cant, cliente, listas ) {
      dispatch(actions.startAddingCompra(uuidv4(), cant, 'activo', cant*item.precioProducto, cant*item.descuentoProducto, item.id, cliente));
      listas.map(lista => {
        lista.idProducto === item.id && lista.fechaLista === moment().format('YYYY-MM-DD') && (
          dispatch(actionsListas.startDecreasingLista(lista.id, cant))
        )
      });
    }
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onShop(cant) {
      console.log("Hello world", cant, stateProps.cliente['id']);
      dispatchProps.onShop(cant, stateProps.cliente['id'], stateProps.listas);
    },
  })
)(ProductRow);

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
  button : {
    borderRadius: 50,
    margin: 10,
    backgroundColor: '#d97211',
    width: 70,
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  }, 
  textboxes: {
    margin: 5,
    fontSize: 30,
    color: '#0d0100'
  },
  textButtons: {
    margin: 5,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  }, 
  addButton: {
    backgroundColor: '#ff9b11',
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    width: 125,
  },
  addContainer: {
    alignItems: 'center',
    width: 30,
    margin: 10,
  }, 
  addText :{
    fontSize: 20,
    color: '#0d0100',
    padding: 5,
  }, 
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textos: {
    fontSize: 14,
    color: '#0d0100',
  },
  containerButton: {
    alignItems: 'center',
  },
  producto: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
