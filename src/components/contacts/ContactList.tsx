import React, { useLayoutEffect, useRef, useState } from "react"
import "./contactList.css"
import ContactsStore from "@state/stores/ContactsStore"

interface IContactList {
  className?: string
}

const ContactList: React.FunctionComponent<IContactList> = (props) => {
  const contactsStore = ContactsStore.useStore()

  return (
    <div className={props.className}>
      {contactsStore.contacts.map((x) => (
        <span>{x.name}</span>
      ))}
    </div>
  )
}

ContactList.defaultProps = {
  className: "contact-list"
}
export default ContactList
