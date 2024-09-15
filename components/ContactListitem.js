import React, { useRef } from 'react';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../utility/colors';
import { RectButton, GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ContactListItem = ({ name, avatar, phone, onPress, onSwipeableOpen }) => {
  const swipeableRef = useRef(null); // Create a reference to Swipeable

  // Function to handle action press (call or message)
  const handleActionPress = (actionType) => {
    Alert.alert(`${actionType}`, actionType === 'Calling' ? phone : `Sending message to ${name}`);
    if (swipeableRef.current) {
      swipeableRef.current.close(); // Close the swipe after performing an action
    }
  };

  // Render call action on right swipe
  const renderRightActions = () => {
    return (
      <RectButton
        style={styles.rightAction}
        onPress={() => handleActionPress('Calling')} // Call action triggered on press
      >
        <Icon name="phone" size={24} color="white" />
      </RectButton>
    );
  };

  // Render message action on left swipe
  const renderLeftActions = () => {
    return (
      <RectButton
        style={styles.leftAction}
        onPress={() => handleActionPress('Message')} // Message action triggered on press
      >
        <Icon name="message" size={24} color="white" />
      </RectButton>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={swipeableRef} // Attach reference to Swipeable
        renderLeftActions={renderLeftActions} // Swipe left to show message action
        renderRightActions={renderRightActions} // Swipe right to show call action
        rightThreshold={40} // Limit the swipe to reveal only 40px
        leftThreshold={40}  // Limit the swipe to reveal only 40px
        onSwipeableWillOpen={() => {
          onSwipeableOpen(swipeableRef.current); // Track open swipeable item
        }}
        onSwipeableWillClose={() => {
          // Optional: Additional logic when swipe is about to close
        }}
        onSwipeableClose={() => {
          // The swipeable is fully closed; reset any state if needed
        }}
      >
        <View style={styles.container}>
          <Image style={styles.avatar} source={{ uri: avatar }} />
          <View style={styles.details}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>{phone}</Text>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  phone: PropTypes.string,
  onPress: PropTypes.func,
  onSwipeableOpen: PropTypes.func, // Add the new prop to handle swipeable state
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.grey,
  },
  avatar: {
    borderRadius: 25,
    width: 50,
    height: 50,
    borderColor: colors.grey,
    borderWidth: 1,
  },
  details: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 15,
  },
  title: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    color: colors.blue,
    fontSize: 14,
    marginTop: 2,
  },
  rightAction: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: 60, // Limit the width of the swipeable action
  },
  leftAction: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: 60, // Limit the width of the swipeable action
  },
});

export default ContactListItem;
