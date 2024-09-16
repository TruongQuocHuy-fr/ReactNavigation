import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import ContactThumbnail from '../components/ContactThumbnail';
import colors from '../utility/colors';
import { fetchUserContact } from '../utility/api';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

const User = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    fetchUserContact()
      .then((user) => {
        setUser(user);
        setLoading(false);
        setError(false);
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
      });
  }, []);

  const { avatar, name, phone } = user;

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color={colors.white} />}
      {error && <Text style={styles.errorText}>{t('error_loading_data')}</Text>}
      {!loading && !error && (
        <>
          <View style={styles.thumbnailContainer}>
            <ContactThumbnail avatar={avatar} name={name} phone={phone} />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('UpdateUser', { user, setUser })}
          >
            <Text style={styles.buttonText}>{t('update_profile')}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue,
    padding: 16,
  },
  thumbnailContainer: {
    marginBottom: 30,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  errorText: {
    color: colors.red,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.green,
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 28,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    transition: 'background-color 0.3s',
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
});

export default User;
