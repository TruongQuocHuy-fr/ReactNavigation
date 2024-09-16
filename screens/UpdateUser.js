import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import colors from '../utility/colors';
import { useTranslation } from 'react-i18next';

const UpdateUser = ({ route, navigation }) => {
  const { user, setUser } = route.params; 

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const { t } = useTranslation();

  const handleUpdate = () => {
    const updatedUser = { ...user, name, phone };
    if (setUser) {
      setUser(updatedUser);
    }
    Alert.alert(t('success'), t('update-success'));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t('name')}:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder={t('enter_name')}
        placeholderTextColor={colors.gray}
      />
      <Text style={styles.label}>{t('phone')}:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder={t('enter_phone')}
        keyboardType="phone-pad"
        placeholderTextColor={colors.gray}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>{t('update')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    color: colors.darkGray,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.lightGray,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  button: {
    backgroundColor: colors.blue,
    paddingVertical: 14,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default UpdateUser;
