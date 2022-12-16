import { nanoid } from 'nanoid';
import { useState, useEffect, useRef } from 'react';

import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import SearchContact from './SearchContact/SearchContact';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const isLocalStorage = useRef(true);

  useEffect(() => {
    if (localStorage.getItem('users')) {
      setContacts([...JSON.parse(localStorage.getItem('users'))]);
    }

    return;
  }, []);

  useEffect(() => {
    if (isLocalStorage.current) {
      isLocalStorage.current = false;
      return;
    }

    localStorage.setItem('users', JSON.stringify(contacts));
  }, [contacts]);

  const handleFilter = event => {
    setFilter(event.target.value);
  };

  const handleAddContact = (event, name, number, handleClearState) => {
    event.preventDefault();

    const isUser = Boolean(contacts.find(item => item.name === name));

    if (isUser) {
      alert(`${name} is already in contacts`);
      handleClearState();
    } else {
      setContacts([...contacts, { name, number, id: nanoid() }]);

      handleClearState();
    }
  };

  const handleDeleteContact = id => {
    setContacts([...contacts.filter(item => item.id !== id)]);
  };

  return (
    <section className="phonebook">
      <h1 className="phonebook__title">Phone book</h1>
      <ContactForm handleAddContact={handleAddContact} />
      <h2 className="contacts__title">Contacts:</h2>
      <SearchContact
        contacts={contacts}
        filter={filter}
        handleFilter={handleFilter}
        handleDeleteContact={handleDeleteContact}
      />
      <ContactsList
        contacts={contacts}
        filter={filter}
        handleDeleteContact={handleDeleteContact}
      />
    </section>
  );
};
