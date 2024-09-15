import 'react-native-get-random-values';
import { v4 } from 'uuid';

const mapContact = contact => {
    const {
        name, picture, phone, cell, email,
    } = contact;
    return {
        id: v4(),
        name: name.first + " " + name.last,
        avatar: picture.large,
        phone,
        cell,
        email,
        favorite: Math.random() >= 0.5,
    };
};

const fetchContacts = async () => {
    const response = await fetch('https://randomuser.me/api/?results=100&seed=fullstackio');
    const contractData = await response.json();
    return contractData.results.map(mapContact);
};

const fetchUserContact = async () => {
    const response = await fetch('https://randomuser.me/api/?seed=fullstackio');
    const userData = await response.json();
    return mapContact(userData.results[0]);
};

const fetchRandomContact = async () => {
    const response = await fetch('https://randomuser.me/api/');
    const contractData = await response.json();
    return mapContact(contractData.results[0]);
};

export { fetchContacts, fetchUserContact, fetchRandomContact };
