import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';
import { v4 as uuidv4 } from 'uuid';

import * as selectors from '../../reducers';
import * as actions from '../../actions/productos';
import { TouchableOpacity } from 'react-native-gesture-handler';

const renderInput = ({ input: { onChange, ...restInput }, ...rest}) => {
  return <TextInput onChangeText={onChange} {...restInput} {...rest} />
}
const ProductoForm = ({
  onSubmit,
  isLoading,
  error = null,
  handleSubmit,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Añadir Producto</Text>
      <View style={styles.inputs}>
        <Field
          name={'nombre'}
          props={{
            placeholder: 'Nombre del Producto',
          }}
          component={renderInput}
          style={styles.textboxes}
        />
        <Field
          name={'descripcion'}
          props={{
            placeholder: 'Descripción',
          }}
          component={renderInput}
          style={styles.textboxes}
        />
        <Field
          name={'precio'}
          props={{
            placeholder: 'Precio',
          }}
          component={renderInput}
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

export default reduxForm({form: 'Producto'})(
  connect(
    state => ({
      idUsuario: selectors.getAuthUserID(state),
      tipo: selectors.getUsuario(state),
    }),
    dispatch => ({
      onSubmit(values) {
        const {
          nombre,
          descripcion,
          precio,
        } = values;
        dispatch(actions.startAddingProducto(uuidv4(), nombre, precio, descripcion, 0));
        dispatch(reset('Producto'));
      },
    }),
  )(ProductoForm)
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
