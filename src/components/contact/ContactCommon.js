import React from "react"
import { sendMessage } from "../../database/sendMessage"

const ContactCommon = () => {

  const send = (event) => {
    event.preventDefault()
    const email = event.target[0].value
    const title = event.target[1].value
    const message = event.target[2].value
    sendMessage(email, title, message)
  }

  return (
    <form className='contact-common-form' onSubmit={send}>
      <label for='contact-common-email'>
        Email
      </label>
      <input type='email' name='email' id='contact-common-email' />
      <label for=' contact-common-topic'>
        Temat
      </label>
      <input type='text' name=' topic' id=' contact-common-topic' />
      <label for='contact-common-msg'>
        Wiadomość
      </label>
      <textarea name=' message' className=' contact-message' id=' contact-common-msg' />
      <input type='submit' value='Wyślij' className='submit-button' />
    </form>
  )
}

export default ContactCommon