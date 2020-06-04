import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';
import { v4 as uuidv4 } from 'uuid';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as selectors from '../../reducers';
import * as actions from '../../actions/tiendas';

const renderInput = ({ input: { onChange, ...restInput }, ...rest}) => {
  return <TextInput onChangeText={onChange} {...restInput} {...rest} />
}

const TiendaForm = ({
  onSubmit,
  handleSubmit,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Añadir Ubicación</Text>
      <View style={styles.inputs}>
          <Field
              name={'nombreTienda'}
              props={{
              placeholder: 'Nombre de la Tienda',
              }}
              component={renderInput}
              style={styles.textboxes}
          />
          <Field
              name={'ubicacionTienda'}
              props={{
              placeholder: 'Ubicación',
              }}
              component={ renderInput }
              style={styles.textboxes}
          />
          <Field
              name={'telefonoTienda'}
              props={{
              placeholder: 'Telefóno',
              }}
              component={renderInput}
              style={styles.textboxes}
          />
          <Field
              name={'faxTienda'}
              props={{
              placeholder: 'Fax',
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

export default reduxForm({form: 'Tienda'})(
  connect(
    state => ({
      tipo: selectors.getUsuario(state),
    }),
    dispatch => ({
      onSubmit(values) {
        const {
          nombreTienda,
          ubicacionTienda,
          telefonoTienda,
          faxTienda,
        } = values;
        dispatch(actions.startAddingTienda(uuidv4(), nombreTienda, ubicacionTienda, telefonoTienda, faxTienda));
        dispatch(reset('Tienda'));
      },
    }),
  )(TiendaForm)
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
