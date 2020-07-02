const { db } = require("../util/admin");

const {
  isISODate,
  nextPage,
  prevPage,
  docsExists,
  getFirstAndLast,
  formatDocuments,
} = require("../util/paginator");

exports.getItems = async (req, res) => {
  try {
    // init
    const ref = db
      .collection("items")
      .where("userHandle", "==", req.user.handle);

    const prev = req.body.firstVisible;
    const next = req.body.lastVisible;

    // validate dates
    if (!isISODate(prev) && prev !== undefined) {
      return res
        .status(404)
        .json({ message: "firstVisible should be an ISO String Date" });
    }

    if (!isISODate(next) && next !== undefined) {
      return res
        .status(404)
        .json({ message: "firstVisible should be an ISO String Date" });
    }

    //  check user direction
    if (prev && next) {
      return res.status(404).json({ message: "only one direction at a time" });
    }

    const field = "createdAt";
    const pageSize = 3;

    // start page
    if (!next && !prev) {
      // create query
      const query = ref.orderBy(field).limit(pageSize);
      let snapshot = await query.get();

      if (!docsExists(snapshot))
        return res.status(404).json({ message: "no more docs available" });

      let FirstAndLast = getFirstAndLast(snapshot);
      const items = formatDocuments(snapshot);

      return res.json({
        FirstAndLast,
        items,
      });
    }

    // prev page
    if (prev) {
      let snapshot = await prevPage(ref, prev, field, pageSize).get();
      if (!docsExists(snapshot))
        return res.status(404).json({ message: "no more docs available" });

      let FirstAndLast = getFirstAndLast(snapshot);
      const items = formatDocuments(snapshot);

      return res.json({
        FirstAndLast,
        items,
      });
    }

    // next page
    if (next) {
      let snapshot = await nextPage(ref, next, field, pageSize).get();
      if (!docsExists(snapshot))
        return res.status(404).json({ message: "no more docs available" });

      let FirstAndLast = getFirstAndLast(snapshot);
      const items = formatDocuments(snapshot);

      return res.json({
        FirstAndLast,
        items,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.code });
  }
};
