import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';

import * as selectors from '../../reducers';
import * as actions from '../../actions/auth';

const renderInput = ({ input: { onChange, ...restInput }, ...rest}) => {
  return <TextInput onChangeText={onChange} {...restInput} {...rest} />
}

const RegisterForm = ({
  onSubmit,
  isLoading,
  error = null,
  handleSubmit,
}) => {
  return (
    <View style={styles.container}>
      {
        error && (
          <Text style={styles.errors}>{error}</Text>
        )
      }
      <View style={styles.inputs}>
        <Field
          name={'email'}
          props={{
            placeholder: 'Correo',
          }}
          component={renderInput}
          style={styles.textboxes}
        />
        <Field
          name={'username'}
          props={{
            placeholder: 'Nombre de Usuario',
          }}
          component={renderInput}
          style={styles.textboxes}
        />
        <Field
          name={'tipo'}
          props={{
            placeholder: 'Cliente/Empleado',
          }}
          component={ renderInput }
          style={styles.textboxes}/>
        <Field
          name={'password'}
          props={{
            placeholder: 'Contraseña',
            secureTextEntry: true,
          }}
          component={renderInput}
          style={styles.textboxes}
        />
        <Field
          name={'password2'}
          props={{
            placeholder: 'Confirmar Contraseña',
            secureTextEntry: true,
          }}
          component={renderInput}
          style={styles.textboxes}
        />
      </View>
      {
        isLoading ? (
          <ActivityIndicator color='#400601'/>
        ) : (
          <View style={styles.buttonlogin}>
              <Button onPress={handleSubmit(onSubmit)} title='Registrarse' color='#400601' />
          </View>
        )
      }
    </View>
  );
} 

export default reduxForm({form: 'Register'})(
  connect(
    state => ({
      isLoading: selectors.getIsRegistering(state),
      error: selectors.getRegisteringError(state),
    }),
    dispatch => ({
      onSubmit(values) {
        const {
          email, 
          username, 
          password, 
          password2, 
          tipo,
        } = values;
        dispatch(actions.startRegister(username, password, password2, email, tipo));
        dispatch(reset('Register'));
      },
    }),
  )(RegisterForm)
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
  }
});
