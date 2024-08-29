import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import { FaPhone } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { IoPersonSharp } from 'react-icons/io5';
import { nanoid } from 'nanoid';

import Button from '../Button/Button';
import Undo from '../Undo/Undo';
import { notify } from '../../redux/notificationSlice';
import styles from './Contact.module.css';

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const { name, number } = contact;

  const handleClick = () => {
    dispatch(deleteContact(contact));
    const toastId = nanoid();
    dispatch(
      notify({
        message: <Undo value={contact} toastId={toastId} />,
        toastType: 'info',
        toastId: toastId,
      })
    );
  };

  return (
    <>
      <div className={styles.contactWrap}>
        <div className={styles.contactInfo}>
          <IoPersonSharp />
          <p>{name}</p>
        </div>
        <a
          href={`tel:${number.split('-').join('')}`}
          className={styles.contactInfo}
          aria-label={`Call ${number}`}
        >
          <FaPhone />
          <p>{number}</p>
        </a>
      </div>
      <Button handleClick={handleClick} style="deleteBtn">
        <FaTrash />
      </Button>
    </>
  );
};

export default Contact;
