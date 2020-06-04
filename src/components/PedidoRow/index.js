import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, Button, View } from 'react-native';
import * as selectors from '../../reducers';
import * as actions from '../../actions/pedidos';
import * as selectedActions from '../../actions/selectedPedido';
import moment from 'moment';
import RegistroList from '../RegistroList';
import ValoracionForm from '../ValoracionForm';

const PedidoRow = ({ item, pedido, onSelect, tipo, onAccept, onComplete }) => (
    <View style={styles.container}>
        <TouchableOpacity onPress={onSelect}>
            <Text style={styles.fecha}>{ moment(item.fechaPedido).calendar() }</Text>
            <View style={styles.rowContainer}>
                <Text>Estado:                   </Text>
                <Text>{ item.estadoPedido }</Text>
            </View>
            <View style={styles.rowContainer}>
                <Text>Entrega:                   </Text>
                <Text>{ item.entregaPedido }</Text>
            </View>
            {
                pedido === item.id && (
                    <>
                    {
                        tipo === 'Cliente' && (
                            <ValoracionForm />
                        )
                    }
                    {
                        tipo === 'Empleado' && (
                            <View style={styles.rowContainer}>
                                <TouchableOpacity onPress={onAccept} style={styles.addButton}>
                                    <Text style={styles.addText}>Aceptar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onComplete} style={styles.addButton}>
                                    <Text style={styles.addText}>Completar</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    <View style={styles.rowContainer}>
                        <Text>Cant.     </Text>
                        <Text>Producto</Text>
                    </View>
                        <RegistroList
                        key={pedido}
                        item={pedido} 
                    />
                    </>
                )
            }
        </TouchableOpacity>
    </View>
);

export default connect(
  (state, { item }) => ({
    ...selectors.getPedido(state, item),
    pedido: selectors.getSelectedPedido(state),
    tipo: selectors.getUsuario(state),
    empleado: selectors.getEmpleado(state, selectors.getAuthUserID(state)),
  }),
  (dispatch, { item }) => ({
    onSelect() {
      console.log(item.id);
      dispatch(selectedActions.selectPedido(item.id));
    },
    onAccept(empleado, pedido) {
        dispatch(actions.startTakingPedido(pedido, empleado));
    },
    onComplete(pedido){
        dispatch(actions.startEndingPedido(pedido));
    },
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onAccept(){
        console.log("------",stateProps.empleado['id'], stateProps.pedido)
        dispatchProps.onAccept(stateProps.empleado['id'], stateProps.pedido);
    },
    onComplete(){
        dispatchProps.onComplete(stateProps.pedido);
    },
  })
)(PedidoRow);

const styles = StyleSheet.create({
    container: {
      //backgroundColor: '#fff',
      //alignItems: 'center',
      borderBottomWidth: 0.75,
      borderBottomColor: '#0d0100',
      marginTop: 10,
      marginBottom: 10,
    },
    rowContainer: {
      display: 'flex',
      flexDirection: 'row',
    }, 
    textos: {
      fontSize: 14,
      color: '#0d0100',
    },
    fecha: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#ff9b11',
        borderRadius: 10,
        alignItems: 'center',
        width: 125,
        margin: 5,
    },
    addText: {
        fontSize: 20,
        color: '#0d0100',
        padding: 5,
    },
});
