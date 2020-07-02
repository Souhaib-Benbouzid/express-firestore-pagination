exports.nextPage = (ref, lastVisible, field, pageSize) => {
  return ref.orderBy(field).startAfter(lastVisible).limit(pageSize);
};

exports.prevPage = (ref, firstVisible, field, pageSize) => {
  return ref.orderBy(field).endBefore(firstVisible).limitToLast(pageSize);
};

exports.docsExists = (snapshot) => {
  if (snapshot.docs.length === 0) {
    return false;
  }
  return true;
};

exports.getFirstAndLast = (snapshot) => {
  let firstVisible = snapshot.docs[0].data().createdAt;
  let lastVisible = snapshot.docs[snapshot.docs.length - 1].data().createdAt;

  return { firstVisible, lastVisible };
};
exports.formatDocuments = (snapshot) => {
  let elements = [];
  snapshot.docs.forEach((doc) => {
    elements.push(doc.data());
  });

  return { totalNumber: snapshot.docs.length, elements };
};

exports.isISODate = (date) => {
  let regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
  return regex.test(date);
};
