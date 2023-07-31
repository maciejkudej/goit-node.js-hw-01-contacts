const path = require("path");
const fs = require("fs").promises;
const shortid = require("shortid");
const contactsPath = path.normalize("./db/contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    return error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const getContact = contacts.find((contacts) => {
      if (contacts.id === contactId) {
        return contacts;
      }
    });
    return getContact;
  } catch (error) {
    return error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const removeContact = contacts.filter((contact) => {
      if (contact.id !== contactId) {
        return contact;
      }
    });

    await fs.writeFile(contactsPath, JSON.stringify(removeContact, null, 2));
    return await listContacts();
  } catch (error) {
    return error;
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();

    const newContact = {
      id: shortid.generate(),
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts;
  } catch (error) {
    return error;
  }
};

module.exports = {
  addContact,
  removeContact,
  getContactById,
  listContacts,
};
