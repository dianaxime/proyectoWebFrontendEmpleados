import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Button, Text } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/auth';


const Logout = ({ onClick, isHidden = false, tipo }) => (
  <View style={styles.container}>
    <Text style={styles.errors}>¿Estas seguro que desea salir?</Text>
    <View style={styles.buttonlogin}>
        <Button onPress={onClick} title='Cerrar sesión' color='#400601'>
        </Button>
    </View>
  </View>
);


export default connect(
  undefined,
  dispatch => ({
    onClick() {
      dispatch(actions.logout());
    },
  })
)(Logout);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  errors: {
    color: '#950601',
    margin: 20,
    fontSize: 20,
  },
  buttonsignin: {
    padding: 10,
    marginTop: 30,
  },
});
