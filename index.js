const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(await listContacts());
      break;

    case "get":
      try {
        const contact = await getContactById(id);
        console.log(contact);
      } catch (err) {
        console.error(err.message);
      }
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      try {
        const deletedContact = await removeContact(id);
        console.log(deletedContact);
      } catch (error) {
        console.log(error.message);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
