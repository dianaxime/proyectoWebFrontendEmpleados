import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { reset, Field, reduxForm } from 'redux-form';

import * as selectors from '../../reducers';
import * as actions from '../../actions/auth';


const renderInput = ({ input: { onChange, ...restInput }, ...rest}) => {
  return <TextInput onChangeText={onChange} {...restInput} {...rest} />
}
const LoginForm = ({
  onSubmit,
  isLoading,
  error = null,
  handleSubmit,
  navigation,
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
          name={'username'}
          props={{
            placeholder: 'Correo',
          }}
          component={renderInput}
          style={styles.textboxes}
        />
        <Field
          name={'password'}
          props={{
            placeholder: 'Contraseña',
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
              <Button onPress={handleSubmit(onSubmit)} title='Ingresar' color='#400601'/>
            </View>
          )
        }
        <View style={styles.buttonsignin}>
          <Button title='¿Aún no tienes una cuenta?' onPress={() => navigation.navigate("SignIn")} color='#400601'/>
        </View>
    </View>
  );
} 

export default reduxForm({form: 'Login'})(
  connect(
    state => ({
      isLoading: selectors.getIsAuthenticating(state),
      error: selectors.getAuthenticatingError(state),
      isAuthenticated: selectors.isAuthenticated(state),
      authUsername: selectors.getAuthUsername(state),
    }),
    dispatch => ({
      onSubmit(values) {
        const {username, password} = values;
        dispatch(actions.startLogin(username, password));
        dispatch(reset('Login'));
      },
    }),
  )(LoginForm)
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
