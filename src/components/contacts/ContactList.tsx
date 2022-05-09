import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import "./contactList.css"
import ContactsStore from "@state/stores/ContactsStore"
import { GridContextProvider, GridDropZone, GridItem, swap } from "react-grid-dnd"
import Contact from "./contact/Contact"

interface IContactList {
  className?: string
}

const ContactList: React.FunctionComponent<IContactList> = (props) => {
  const contactsStore = ContactsStore.useStore()
  const [items, setItems] = React.useState<any>([])
  function onChange(sourceId: unknown, sourceIndex: number, targetIndex: number, targetId: unknown) {
    const nextState = swap(items, sourceIndex, targetIndex)
    setItems(nextState)
  }
  useEffect(() => {
    setItems(contactsStore.contacts)
  }, [])
  return (
    <GridContextProvider onChange={onChange}>
      <GridDropZone id="items" boxesPerRow={3} rowHeight={150} style={{ height: "100vh" }}>
        {items.map((item: any) => (
          <GridItem key={item.index}>
            <div className="grid-item">
              <Contact name={item.name} mob={item.mob} pic={item.pic} />
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
