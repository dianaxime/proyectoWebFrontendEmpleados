import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/productos';
import * as actionsUsuarios from '../../actions/usuarios';
import * as actionsListas from '../../actions/listas';
import ProductoRow from '../ProductoRow';

const ProductList = ({ productos, isLoading, onLoad, tipo }) => {
  useEffect(onLoad, []);
  return (
    <View style={styles.container}>
      <View>
        {
          productos.length === 0 && !isLoading && (
            <Text style={styles.addText}>{'No hay Productos'}</Text>
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
          productos.length > 0 && !isLoading && (
            <>
              <ScrollView style={styles.scroll}>
                {productos && productos.map((item, i) => (
                  <ProductoRow
                    key={i}
                    item={item} 
                  />
                ))}
              </ScrollView>
            </>
          )
        }
      </View>
    </View>
  );
};

export default connect(
  state => ({
    productos: selectors.getProductos(state),
    isLoading: selectors.isFetchingProductos(state),
    tipo: selectors.getUsuario(state, selectors.getAuthUserID(state)),
  }),
  dispatch => ({
    onLoad() {
      setTimeout(() => {
        dispatch(actionsUsuarios.startFetchingUsuario());
      }, 3000); 
      dispatch(actions.startFetchingProductos());
      dispatch(actionsListas.startFetchingListas());
    },
  }),
)(ProductList);

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
