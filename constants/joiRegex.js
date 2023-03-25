const NAME_REGEX = /^[a-zA-Z .'-]+$/;
const PHONE_REGEX =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{0,4}[-.\s]?\d{0,9}$/;

module.exports = { NAME_REGEX, PHONE_REGEX };
