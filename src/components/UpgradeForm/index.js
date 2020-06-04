import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';

import * as selectors from '../../reducers';
import * as actionsCliente from '../../actions/clientes';
import * as actionsEmpleado from '../../actions/empleados';

const renderInput = ({ input: { onChange, ...restInput }, ...rest}) => {
  return <TextInput onChangeText={onChange} {...restInput} {...rest} />
}

const UpgradeForm = ({
  onSubmit,
  isLoading,
  error = null,
  handleSubmit,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>¿Has cambiado de dirección o telefóno?</Text>
      {
        error && (
          <Text style={styles.errors}>{error}</Text>
        )
      }
      <View style={styles.inputs}>
        <Field
            name={'telefono'}
            props={{
            placeholder: 'Número de telefóno',
            }}
            component={renderInput}
            style={styles.textboxes}
        />
        <Field
            name={'direccion'}
            props={{
            placeholder: 'Dirección',
            }}
            component={ renderInput }
            style={styles.textboxes}
        />
      </View>
        {
        isLoading ? (
          <ActivityIndicator color='#400601'/>
        ) : (
          <View style={styles.buttonsignin}>
            <Button onPress={handleSubmit(onSubmit)} title='Actualizar' color='#400601'></Button>
          </View>
        )
      }
    </View>
  );
} 

export default reduxForm({form: 'Update'})(
  connect(
    state => ({
      idUsuario: selectors.getAuthUserID(state),
      tipo: selectors.getUsuario(state),
      cliente: selectors.getCliente(state, selectors.getAuthUserID(state)),
      empleado: selectors.getEmpleado(state, selectors.getAuthUserID(state)),
    }),
    dispatch => ({
      onSubmit(values, tipo, cliente, empleado, idUsuario) {
        const {
          telefono,
          direccion,
        } = values;
        tipo === 'Cliente' ? (
            dispatch(actionsCliente.startUpdatingCliente(cliente['id'], direccion, telefono, idUsuario))
        ) : (
            dispatch(actionsEmpleado.startUpdatingEmpleado(empleado['id'], direccion, telefono, idUsuario))
        )
        dispatch(reset('Update'));
      },
    }),
    (stateProps, dispatchProps, ownProps) => ({
      ...ownProps,
      ...stateProps,
      ...dispatchProps,
      onSubmit(values) {
        dispatchProps.onSubmit(values, stateProps.tipo, stateProps.cliente, stateProps.empleado, stateProps.idUsuario);
      },
    })
  )(UpgradeForm)
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputs: {
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  textboxes: {
    padding: 2,
    margin: 2,
    marginBottom: 25,
    borderBottomColor: '#0d0100',
    color: '#0d0100',
    borderBottomWidth: 1,
    width: 200,
  },
  buttonlogin: {
    padding: 10,
    marginTop: 20,
  },
  buttonsignin: {
    padding: 10,
    marginTop: 30,
  },
  errors: {
    color: '#950601',
    margin: 20,
  },
  titulo: {
    color: '#950601',
    margin: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
