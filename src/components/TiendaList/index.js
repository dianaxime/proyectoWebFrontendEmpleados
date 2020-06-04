import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/tiendas';
import * as actionsUsuarios from '../../actions/usuarios';
import TiendaRow from '../TiendaRow';

const TiendaList = ({ tiendas, isLoading, onLoad, tipo }) => {
  useEffect(onLoad, []);
  return (
    <View style={styles.container}>
      <View>
        {
          tiendas.length === 0 && !isLoading && (
            <Text style={styles.addText}>{'No hay Tiendas'}</Text>
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
          tiendas.length > 0 && !isLoading && (
            <>
              <ScrollView>
                {tiendas && tiendas.map((item, i) => (
                  <TiendaRow
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
    tiendas: selectors.getTiendas(state),
    isLoading: selectors.isFetchingTiendas(state),
    tipo: selectors.getUsuario(state),
  }),
  dispatch => ({
    onLoad() {
      dispatch(actionsUsuarios.startFetchingUsuario());
      setTimeout(() => {
        dispatch(actions.startFetchingTiendas());
      }, 3000);   
    },
  }),
)(TiendaList);

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
