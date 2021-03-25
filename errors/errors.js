function badRequestError(message) {
  return { message };
}

function notFoundError(message) {
  return { message };
}

module.exports = {
  badRequestError,
  notFoundError,
};
