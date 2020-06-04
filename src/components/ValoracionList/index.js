import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/valoraciones';
import ValoracionRow from '../ValoracionRow';;

const ValoracionList = ({ comentarios, isLoading, onLoad, puntuacion }) => {
  useEffect(onLoad, []);
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.addText}>Puntuación Promedio:   </Text>
        <Text style={styles.addText}>{ puntuacion }</Text>
      </View>
        <View>
          {
            comentarios.length === 0 && !isLoading && (
              <Text>{'No hay Comentarios'}</Text>
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
            comentarios.length > 0 && !isLoading && (
              <>
                <ScrollView>
                  {comentarios && comentarios.map((item, i) => (
                    <ValoracionRow
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
    comentarios: selectors.getComentarios(state),
    isLoading: selectors.isFetchingComentarios(state),
    puntuacion: selectors.getPuntuacion(state),
    empleado: selectors.getEmpleado(state, selectors.getAuthUserID(state)),
  }),
  dispatch => ({
    onLoad(empleado) {
      dispatch(actions.startFetchingComentarios(empleado));
      dispatch(actions.startFetchingPuntuacion(empleado));
    },
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onLoad() {
      dispatchProps.onLoad(stateProps.empleado);
    },
  })
)(ValoracionList);

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
    fontSize: 20,
    color: '#ff7d09',
    marginTop: 40,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});
