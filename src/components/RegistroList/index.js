import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/registros';
import RegistroRow from '../RegistroRow';


const RegistroList = ({ registros, isLoading, onLoad, item }) => {
  useEffect(onLoad, []);
  return (
    <View style={styles.container}>
        {
          registros.length === 0 && !isLoading && (
            <Text style={styles.addText}>{'No hay Registros'}</Text>
          )
        }
      {
        isLoading && (
          <ActivityIndicator color='#400601'/>
        )
      }
      {
        registros.length > 0 && !isLoading && (
          <ScrollView>
            {registros && registros.map((reg, i) => (
                item === reg.idPedido && (
                    <RegistroRow
                      key={i}
                      item={reg} 
                    />
                )
            ))}
          </ScrollView>
        )
      }
    </View>
  );
};

export default connect(
  (state, {item}) => ({
    ...selectors.getPedido(state, item),
    registros: selectors.getRegistros(state),
    isLoading: selectors.isFetchingRegistros(state),
    tipo: selectors.getUsuario(state),
    pedido: selectors.getSelectedPedido(state),
    pedido: selectors.getPedido(state, item),
  }),
  (dispatch, {item}) => ({
    onLoad() {
      dispatch(actions.startFetchingRegistros())
    },    
}),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
  })
)(RegistroList);

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#fff',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  scroll: {
    paddingVertical: 5,
  },
  addText :{
    fontSize: 24,
    color: '#0d0100',
  },
});
