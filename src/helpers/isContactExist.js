export const isContactExist = (contacts, newNumber) => {
  return contacts.find(({ number }) => newNumber === number);
};
