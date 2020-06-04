import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';
import { v4 as uuidv4 } from 'uuid';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as selectors from '../../reducers';
import * as actions from '../../actions/ofertas';

const renderInput = ({ input: { onChange, ...restInput }, ...rest}) => {
  return <TextInput onChangeText={onChange} {...restInput} {...rest} />
}

const OfertaForm = ({
  onSubmit,
  handleSubmit,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Añadir Oferta</Text>
      <Field
        name={'vence'}
        props={{
          placeholder: 'Fecha de Vencimiento',
        }}
        component={renderInput}
        style={styles.textboxes}
      />
      <Field
        name={'descripcion'}
        props={{
          placeholder: 'Descripción',
        }}
        component={ renderInput }
        style={styles.textboxes}
      />
      <Field
        name={'descuento'}
        props={{
          placeholder: '% de Descuento',
        }}
        component={renderInput}
        style={styles.textboxes}
      />
      <View style={styles.addContainer}>
        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.addButton}>
          <Text style={styles.addText}>Agregar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} 

export default reduxForm({form: 'Oferta'})(
  connect(
    state => ({
      producto: selectors.getSelectedProducto(state),
    }),
    dispatch => ({
      onSubmit(values, producto) {
        const {
          vence,
          descripcion,
          descuento,
        } = values;
        dispatch(actions.startAddingOferta(uuidv4(), descripcion, descuento, vence, producto));
        dispatch(reset('Oferta'));
      },
    }),
    (stateProps, dispatchProps, ownProps) => ({
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        onSubmit(values) {
          dispatchProps.onSubmit(values, stateProps.producto);
        },
      })
  )(OfertaForm)
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
