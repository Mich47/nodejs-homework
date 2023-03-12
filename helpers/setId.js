const setId = (contacts) => {
  const newId = contacts.reduce(
    (largeId, { id }) =>
      (largeId = largeId > Number(id) ? largeId : Number(id)),
    0
  );

  return (newId + 1).toString();
};

module.exports = setId;
