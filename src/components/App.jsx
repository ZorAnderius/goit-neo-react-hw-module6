import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import SearchBox from './SearchBox/SearchBox';
import Notification from './Notification/Notification';
import { selectNotify } from '../redux/notificationSlice';

import styles from './App.module.css';

function App() {
  const notification = useSelector(selectNotify);

  useEffect(() => {
    const { message, toastId, toastType } = notification;
    if (toastType && message) {
      toast[toastType](<Notification>{message}</Notification>, {
        className: styles[`toast-${toastType}`],
        toastId,
      });
    }
  }, [notification]);

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
      <ToastContainer />
    </div>
  );
}

export default App;
