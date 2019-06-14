import _ from "lodash";

export function paginate(totalItems, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  console.log("startIndex:", startIndex);
  // _(); //Creates a lodash object which wraps value to enable implicit method chain sequences.

  return _(totalItems)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
