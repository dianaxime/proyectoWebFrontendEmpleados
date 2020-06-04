import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';
import { v4 as uuidv4 } from 'uuid';
import { Icon } from 'react-native-elements';

import * as selectors from '../../reducers';
import * as actions from '../../actions/valoraciones';
import * as actionsPuntuacion from '../../actions/selectedPuntuacion';

const renderInput = ({ input: { onChange, ...restInput }, ...rest}) => {
  return <TextInput onChangeText={onChange} {...restInput} {...rest} />
}

const ValoracionForm = ({
  onSubmit,
  handleSubmit,
  onRate,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Icon
        reverse
        name='emoji-sad'
        type='entypo'
        color='#FF1D09'
        onPress={() => onRate(1)} 
        />
        <Icon
        reverse
        name='emoji-neutral'
        type='entypo'
        color='#FFC609'
        onPress={() => onRate(3)} 
        />
        <Icon
        reverse
        name='emoji-happy'
        type='entypo'
        color='#8BC609'
        onPress={() => onRate(5)} 
        />
      </View>
      <Field
        name={'comentarios'}
        props={{
          placeholder: 'Comentarios',
        }}
        component={renderInput}
        style={styles.textboxes}
      />
      <View style={styles.addContainer}>
          <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.addButton}>
            <Text style={styles.addText}>Enviar</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
} 

export default reduxForm({form: 'Valoracion'})(
  connect(
    state => ({
      rate: selectors.getSelectedPuntuacion(state),
      pedido: selectors.getPedido(state, selectors.getSelectedPedido(state)),
      cliente: selectors.getCliente(state, selectors.getAuthUserID(state)),
    }),
    dispatch => ({
      onSubmit(values, rate, empleado, cliente) {
        const {
          comentarios,
        } = values;
        console.log(rate);
        dispatch(actions.startAddingValoracion(uuidv4(), comentarios, rate, cliente, empleado));
        dispatch(reset('Valoracion'));
      },
      onRate(rate) {
        dispatch(actionsPuntuacion.selectPuntuacion(rate));
      },
    }),
    (stateProps, dispatchProps, ownProps) => ({
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        onSubmit(values) {
          dispatchProps.onSubmit(values, stateProps.rate, stateProps.pedido['idEmpleado'], stateProps.cliente['id']);
        },
    })
  )(ValoracionForm),
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textboxes: {
    margin: 8,
    borderBottomColor: '#0d0100',
    color: '#0d0100',
    borderBottomWidth: 0.25,
    width: 250,
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
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});
