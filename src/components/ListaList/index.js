import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Button } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/listas';
import * as actionsProductos from '../../actions/productos';
import ListaRow from '../ListaRow';
import ListaForm from '../ListaForm';

const ListaList = ({ listas, isLoading, onLoad }) => {
  useEffect(onLoad, []);
  return (
    <View style={styles.container}>
      <View>
        {
          listas.length === 0 && !isLoading && (
            <Text style={styles.addText}>{'No hay Listas'}</Text>
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
          listas.length > 0 && !isLoading && (
            <>
              <ScrollView style={styles.scroll}>
                {listas && listas.map((item, i) => (
                  <ListaRow
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
    listas: selectors.getListas(state),
    isLoading: selectors.isFetchingListas(state),
  }),
  dispatch => ({
    onLoad() {
      dispatch(actionsProductos.startFetchingProductos());
      setTimeout(() => {
        dispatch(actions.startFetchingListas());
      }, 1000);
    },
  }),
)(ListaList);

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
