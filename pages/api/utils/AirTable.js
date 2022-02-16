import Airtable from 'airtable';
Airtable.configure({
  apiKey: 'keyjsJmfHP80qFsx5',
});
const base = Airtable.base('appX1Ouk3kEi71lIm');
const table = base('todo');

const getMinifiedRecord = (record) => {
  if (!record.fields.completed) {
    record.fields.completed = false;
  }
  return {
    id: record.id,
    fields: record.fields,
  };
};

const minifyRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};

export { table, getMinifiedRecord, minifyRecords };
