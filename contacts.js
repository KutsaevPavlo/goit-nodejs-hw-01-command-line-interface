const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');


const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
    try {
      const data = await fs.readFile(contactsPath);
      return JSON.parse(data);
      
    } catch (err) {
      console.log(err);
    }
   
    
  }

 
  async function getContactById(contactId) {
    try {
        const data = await listContacts();
        const searchContacts = data.find(({id})=> id ===contactId)
        return searchContacts || null
    } catch (error) {
        console.log(error)
    }
  }
  
  async function removeContact(contactId) {
    try {
        const data = await listContacts();
        const index = data.findIndex(({ id }) => id === contactId);

        if (index === -1) {
          return null;

        }
        const [removedContact] = data.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

        return removedContact;
    } catch (error) {
        console.log(error)
    }
  }
  
  async function addContact({name, email, phone}) {
    try {
        const data = await listContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone,
          };
          data.push(newContact);
          await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
          return newContact;

    } catch (error) {
        console.log(error)
    }
  }

  module.exports = {
    addContact, removeContact, getContactById, listContacts,
  };