import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';
import { v4 as uuidv4 } from 'uuid';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as selectors from '../../reducers';
import * as actions from '../../actions/listas';
import * as actionsEmpleados from '../../actions/empleados';

const renderInput = ({ input: { onChange, ...restInput }, ...rest}) => {
  return <TextInput onChangeText={onChange} {...restInput} {...rest} />
}

const ListaForm = ({
  onSubmit,
  handleSubmit,
  onLoad,
}) => {
    useEffect(onLoad, []);
  return (
    <View style={styles.container} >
      <Text style={styles.titulo}>Añadir Lista al Inventario</Text>
      <View style={styles.inputs}>
        <Field
          name={'cantidad'}
          props={{
            placeholder: 'Cantidad',
          }}
          component={renderInput}
          style={styles.textboxes}
        />
        <Field
          name={'turno'}
          props={{
            placeholder: 'Turno',
          }}
          component={ renderInput }
          style={styles.textboxes}
        />
      </View>
      <View style={styles.addContainer}>
          <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.addButton}>
            <Text style={styles.addText}>Agregar</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
} 

export default reduxForm({form: 'Lista'})(
  connect(
    state => ({
      producto: selectors.getSelectedProducto(state),
      empleado: selectors.getEmpleado(state, selectors.getAuthUserID(state)),
    }),
    dispatch => ({
      onSubmit(values, producto, empleado) {
        const {
          cantidad,
          turno,
        } = values;
        dispatch(actions.startAddingLista(uuidv4(), cantidad, turno, producto, empleado));
        dispatch(reset('Lista'));
      },
      onLoad() {
        setTimeout(() => {
          dispatch(actionsEmpleados.startFetchingEmpleado());
        }, 3000); 
      },
    }),
    (stateProps, dispatchProps, ownProps) => ({
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        onSubmit(values) {
          dispatchProps.onSubmit(values, stateProps.producto, stateProps.empleado['id']);
        },
      })
  )(ListaForm)
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  textboxes: {
    margin: 8,
    borderBottomColor: '#0d0100',
    color: '#0d0100',
    borderBottomWidth: 1,
    width: 250,
  },
  errors: {
    color: '#950601',
    margin: 20,
  },
  addButton: {
    backgroundColor: '#ff9b11',
    borderRadius: 10,
    alignItems: 'center',
    width: 175,
  }, 
  addText :{
    fontSize: 20,
    color: '#0d0100',
    padding: 5,
  },
  addContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 30,
    margin: 20,
  },
  titulo: {
    color: '#950601',
    margin: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
