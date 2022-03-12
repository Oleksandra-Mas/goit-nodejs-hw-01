const argv = require('yargs').argv;

const { listContacts, getContactById, addContact, removeContact } = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
    console.log(action);
  switch (action) {
      case 'list':
          const contacts = await listContacts();
          console.table(contacts);
      break;

    case 'get':
        const contact = await getContactById(id.toString());
        console.log(contact);
      break;

    case 'add':
        const newContact = await addContact(name, email, phone);
        console.log(newContact);
      break;

    case 'remove':
        const removedContact = await removeContact(id.toString());
        console.log(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);