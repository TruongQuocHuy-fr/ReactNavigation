import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { fetchContacts } from '../utility/api';
import ContactListItem from '../components/ContactListitem';
import { SafeAreaProvider  } from 'react-native-safe-area-context';

const keyExtractor = ({ phone }) => phone;

const Contacts = ({ navigation }) => {
  // state
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Load data
  useEffect(() => {
    setLoading(true); // Set loading to true when fetching data
    fetchContacts()
      .then(contacts => {
        setContacts(contacts);
        setLoading(false);
        setError(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
        setError(true);
      });
  }, []);

  const contactsSorted = contacts.sort((a, b) => a.name.localeCompare(b.name));

  const renderContact = ({ item }) => {
    const { name, avatar, phone } = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigation.navigate("Profile", { contact: item })}
      />
    );
  };

  return (
    <SafeAreaProvider  style={styles.safeArea}>
      <View style={styles.container}>
        {loading && <ActivityIndicator color="blue" size="large" />}
        {error && <Text>Error...</Text>}
        {!loading && !error && (
          <FlatList
            data={contactsSorted}
            keyExtractor={keyExtractor}
            renderItem={renderContact}
          />
        )}
      </View>
    </SafeAreaProvider >
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    //marginTop: 40, // Adjust this value as needed
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});

export default Contacts;
