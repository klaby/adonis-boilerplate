/**
 * @function sendMail
 *
 * Sending confirmation email to registered users.
 *
 * @param mail
 */
const sendMail = (mail: string): void => {
  setTimeout(() => console.log(`Sending mail to ${mail}...`), 3600)
}

export default {
  sendMail,
}
