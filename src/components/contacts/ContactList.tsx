import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import "./contactList.css"
import ContactsStore from "@state/stores/ContactsStore"
import { GridContextProvider, GridDropZone, GridItem, swap } from "react-grid-dnd"
import Contact from "./contact/Contact"
import useMediaQuery from "@mui/material/useMediaQuery"

interface IContactList {
  className?: string
}

const ContactList: React.FunctionComponent<IContactList> = (props) => {
  const contactsStore = ContactsStore.useStore()
  const totalContacts = contactsStore.contacts.length
  const big = useMediaQuery("(min-width:1000px)")
  const md = useMediaQuery("(min-width:600px)")

  function onChange(sourceId: unknown, sourceIndex: number, targetIndex: number, targetId: unknown) {
    contactsStore.swap(sourceIndex, targetIndex)
  }

  return (
    <GridContextProvider onChange={onChange}>
      <GridDropZone
        id="items"
        boxesPerRow={md ? (big ? 3 : 2) : 1}
        rowHeight={150}
        style={{
          height: md
            ? big
              ? `${(totalContacts * 30) / 3}vh`
              : `${(totalContacts * 35) / 2}vh`
            : `${totalContacts * 30}vh`
        }}
      >
        {contactsStore.contacts.map((item) => (
          <GridItem key={item.index}>
            <div className="grid-item">
              <Contact index={item.index} isFavourite={item.favourite} name={item.name} mob={item.mob} pic={item.pic} />
            </div>
          </GridItem>
        ))}
      </GridDropZone>
    </GridContextProvider>
  )
}

ContactList.defaultProps = {
  className: "contact-list"
}
export default ContactList
