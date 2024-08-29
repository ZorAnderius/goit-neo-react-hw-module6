import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useCallback, useId, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import { validSchema } from '../../helpers/validationSchema';
import { isContactExist } from '../../helpers/isContactExist';
import { toCapitalCase } from '../../helpers/toCapitalCase';
import { nameToCapital } from '../../helpers/nameToCapital';
import { addContact, selectContacts } from '../../redux/contactsSlice';
import { notify } from '../../redux/notificationSlice';
import Button from '../Button/Button';
import styles from './ContactForm.module.css';

const ContactForm = React.memo(() => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const nameId = useId();
  const numberId = useId();

  const initValue = useMemo(() => ({
    name: '',
    number: '',
  }));

  const fieldStyles = useCallback(({ field, value, touched, error }) => {
    return value
      ? error && error[field]
        ? styles.error
        : styles.success
      : error && error[field] && touched[field]
      ? styles.error
      : '';
  }, []);

  const resetTouched = useCallback((values, setTouched) => {
    const notTouched = Object.keys(values).reduce((acc, key) => ({
      ...acc,
      [key]: false,
    }));

    setTouched(notTouched);
  }, []);

  const handleSubmit = useCallback((values, actions) => {
    const { name, number } = values;

    if (isContactExist(contacts, number)) {
      dispatch(
        notify({
          message: `Contact with follow number ${number} is already exist`,
          toastType: 'info',
        })
      );
      return;
    }

    dispatch(addContact({ id: nanoid(), name: nameToCapital(name), number }));

    dispatch(
      notify({
        message: `Contact ${toCapitalCase(values.name)} has added successfully`,
        toastType: 'success',
      })
    );

    actions.resetForm();
    resetTouched(values, actions.setTouched);
  });

  const handleClick = useCallback(({ errors, touched }) => {
    const isEmpty = Object.values(errors).length === 0;
    const isTouched = touched.name || touched.number;
    if ((!isTouched && isEmpty) || errors.name || errors.number) {
      dispatch(
        notify({
          message: 'Please fill in all fields to successfully add a contact',
          toastType: 'error',
        })
      );
    }
  });

  return (
    <Formik
      initialValues={initValue}
      onSubmit={handleSubmit}
      validationSchema={validSchema}
    >
      {({ errors, values: { name, number }, touched }) => {
        return (
          <Form className={styles.container}>
            <div className={styles.fieldContainer}>
              <label
                className={clsx(styles.label, name && styles.active)}
                htmlFor={nameId}
              >
                Name
              </label>
              <Field
                id={nameId}
                className={clsx(
                  styles.field,
                  fieldStyles({ field: 'name', value: name, touched, errors })
                )}
                type="text"
                name="name"
                autoComplete="off"
              />
              <ErrorMessage
                className={styles.errorMsg}
                name="name"
                component="div"
              />
            </div>

            <div className={styles.fieldContainer}>
              <label
                className={clsx(styles.label, number && styles.active)}
                htmlFor={numberId}
              >
                Number
              </label>
              <Field
                id={numberId}
                className={clsx(
                  styles.field,
                  fieldStyles({
                    field: 'number',
                    value: number,
                    touched,
                    errors,
                  })
                )}
                type="text"
                name="number"
                autoComplete="off"
              />
              <ErrorMessage
                className={styles.errorMsg}
                name="number"
                component="div"
              />
            </div>
            <Button
              type="submit"
              style="submitBtn"
              handleClick={() => handleClick({ errors, touched })}
            >
              Add contact
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
});

export default ContactForm;
