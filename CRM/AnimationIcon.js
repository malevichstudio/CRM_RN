import React, { useRef } from 'react';
import { Animated } from 'react-native';
import { FAB } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import stylesGlobal from '../../../globalStyles';

const AnimationIcon = ({ setShowIcone, changeScreenHandler }) => {
  const anim = useRef(new Animated.Value(0)).current;

  const setShow = (value, time) => {
    Animated.timing(anim, {
      toValue: value,
      duration: time,
    }).start();
  };

  const show = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-250, 50],
  });

  setShowIcone(setShow);

  return (
    <Animated.View style={{ right: show }}>
      <FAB
        icon={() => <MaterialIcons name='edit' size={25} color='#fff' />}
        onPress={() => changeScreenHandler()}
        style={stylesGlobal.buttonNav}
      />
    </Animated.View>
  );
};

export default AnimationIcon;
