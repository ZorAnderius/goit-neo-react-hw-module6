import React from 'react';
import { useSelector } from 'react-redux';

import ContactCard from '../Contact/Contact';
import { message } from '../../helpers/searchMessage';
import { selectContacts } from '../../redux/contactsSlice';
import { selectNameFilter } from '../../redux/filtersSlice';
import NotFound from '../NotFound/NotFound';

import styles from './ContactList.module.css';

const ContactList = React.memo(() => {
  const contacts = useSelector(selectContacts);
  const filterValue = useSelector(selectNameFilter);

  const filterContacts = contacts
    ?.filter(({ name }) =>
      name.toLowerCase().includes(filterValue.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return !!filterContacts?.length ? (
    <ul className={styles.contactsContainer}>
      {filterContacts.map(contact => {
        return (
          <li key={contact.number} className={styles.contactCard}>
            <ContactCard contact={contact} />
          </li>
        );
      })}
    </ul>
  ) : (
    <NotFound value={filterValue}>
      {filterValue ? message.notFound : message.empty}
    </NotFound>
  );
});

export default ContactList;
