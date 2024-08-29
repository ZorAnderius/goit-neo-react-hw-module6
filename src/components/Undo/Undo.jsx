import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import Button from '../Button/Button';
import { addContact } from '../../redux/contactsSlice';

import styles from './Undo.module.css';

const Undo = ({ value, toastId }) => {
  const dispatch = useDispatch();
  const handleRejectDelete = () => {
    dispatch(addContact(value));
    toast.dismiss(toastId);
  };

  return (
    <div className={styles.undoContainer}>
      <p>
        Contact
        <span className={styles.strongTitle}> {value.name} </span>
        has deleted successful.
      </p>
      <Button style="undoBtn" handleClick={handleRejectDelete}>
        Cancel
      </Button>
    </div>
  );
};

export default Undo;
