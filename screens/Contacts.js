import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { fetchContacts } from '../utility/api';
import ContactListItem from '../components/ContactListitem';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const keyExtractor = ({ phone }) => phone;

const Contacts = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [openSwipeable, setOpenSwipeable] = useState(null); // Track the open swipeable item

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

  const handleSwipeableOpen = (ref) => {
    if (openSwipeable && openSwipeable !== ref) {
      openSwipeable.close(); // Close the previously opened swipeable item
    }
    setOpenSwipeable(ref); // Set the new swipeable as the currently open one
  };

  const renderContact = ({ item }) => {
    const { name, avatar, phone } = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigation.navigate("Profile", { contact: item })}
        onSwipeableOpen={handleSwipeableOpen} // Pass the function to handle swipeable state
      />
    );
  };

  return (
    <SafeAreaProvider style={styles.safeArea}>
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
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});

export default Contacts;
