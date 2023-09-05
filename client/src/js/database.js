import { openDB } from 'idb';

const initdb = async () =>
  openDB('jateDB', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Pull Request
export const putDb = async (content) => {
  console.log('POST FUNCTION');

  // Create a connection to the database along with the version that is used.
  const newDB = await openDB('jateDB', 1);

  // Create a new transaction and specify the database and data privilages
  const newDatabaseTx = newDB.transaction('jate', 'readwrite');

  // Open up the desired object store
  const store = newDatabaseTx.objectStore('jate');

  // add() method on the store and pass in the content;
  const request = store.add({ text: content })

  // Get confirmation of the request.
  const result = await request;
  console.log('Data saved into the database', result);

}

// TODO: Add logic for a method that gets all the content from the database
// Get Request
export const getDb = async () => {
  
  // Create a connection to the database database and version we want to use.
  const newDB = await openDB('jateDB', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = newDB.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

   // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
}


initdb();
