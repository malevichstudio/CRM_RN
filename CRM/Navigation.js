import React, { useContext } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { MainBTN } from '../../../components/UI';

import OrdersData from '../../../containers/Orders/OrdersData';
import useActiveScreen from '../../../Hooks/useActiveScreen';
import { AppContext } from '../../../Main';

function Orders() {
  const navigation = useNavigation();
  const { filters, sorting } = useContext(AppContext);

  const changeScreenHandler = () => {
    navigation.navigate('Order', {
      id: null,
    });
  };

  const showBTN = useActiveScreen();

  return (
    <>
      {showBTN && (
        <MainBTN
          Icon={() => <MaterialIcons name='add' size={25} color='#fff' />}
          onPress={() => changeScreenHandler()}
        />
      )}
      <OrdersData filters={filters} sorting={sorting} />
    </>
  );
}

export default Orders;
