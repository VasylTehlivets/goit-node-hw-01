const fsp = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function getContact() {
  const contacts = await fsp.readFile(contactsPath);
  const parcedContacts = JSON.parse(contacts);
  return parcedContacts;
}

async function uppdateContacts(contacts) {
  await fsp.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  return await getContact();
}

async function getContactById(contactId) {
  const contacts = await getContact();
  const foundContact = contacts.find((item) => item.id === contactId);
  if (!foundContact) {
    throw new Error("The contact not found");
  }
  return foundContact;
}

async function removeContact(contactId) {
  const contacts = await getContact();
  const contactIndex = contacts.findIndex((item) => item.id === contactId);
  if (contactIndex === -1) {
    throw new Error("The contact not found");
  }
  const deletedContact = contacts.splice(contactIndex, 1);
  await uppdateContacts(contacts);
  return deletedContact;
}

async function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const contacts = await getContact();
  contacts.push(newContact);
  await uppdateContacts(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
