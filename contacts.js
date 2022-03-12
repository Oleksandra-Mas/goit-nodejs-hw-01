const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

  async function listContacts() {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  }
  
  async function getContactById(contactId) {
      const contacts = await listContacts();
      const contact = contacts.find(({id})=>id===contactId);
      if (!contact) {
          throw new Error(`Contact with ${contactId} not found`);
      }
      return contact;
  }
  
  async function removeContact(contactId) {
    const contacts = await listContacts();
    const contactIdx = contacts.findIndex(({id})=>id===contactId);
    if (contactIdx===-1) {
        throw new Error(`Contact with ${contactId} not found`);
    }
      const removedContact = contacts[contactIdx];
    contacts.splice(contactIdx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removedContact;
  }
  
  async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { id:v4(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  }

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
  }