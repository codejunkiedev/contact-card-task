import React, { useRef, useState } from "react"
import "./contactList.css"
import ContactsStore from "@state/stores/ContactsStore"
import Contact from "./contact/Contact"

interface IContactList {
  className?: string
}

const ContactList: React.FunctionComponent<IContactList> = (props) => {
  const contactsStore = ContactsStore.useStore()
  const [list, setList] = useState(contactsStore.contacts)
  const [dragging, setDragging] = useState(false)
  const dragItem = useRef<{ itemI: number } | null>(null)
  const dragNode = useRef<HTMLDivElement | null>(null)

  const handleDragStart = (e: React.DragEvent, params: { itemI: number }) => {
    dragItem.current = params
    dragNode.current = e.target as HTMLDivElement
    dragNode?.current?.addEventListener("dragend", handleDragEnd)
    setTimeout(() => {
      setDragging(true)
    }, 0)
  }
  const handleDragEnd = () => {
    setDragging(false)
    dragNode.current?.removeEventListener("dragend", handleDragEnd)
    dragItem.current = null
    dragNode.current = null
  }
  const handleDragEnter = (
    e: React.DragEvent,
    params: {
      itemI: number
    }
  ) => {
    const currentItem = dragItem.current
    if (e.target !== dragNode.current) {
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList))
        newList.splice(params.itemI, 0, newList.splice(currentItem?.itemI, 1)[0])
        dragItem.current = params
        return newList
      })
    }
  }

  const getStyles = (params: { itemI: number }) => {
    const currentItem = dragItem.current
    if (currentItem?.itemI === params.itemI) {
      return "current dnd-item"
    }
    return "dnd-item"
  }
  const setFavourite = (index: number) => {
    const contactIndex = list.findIndex((contact) => contact.index === index)
    let temp_state = [...list]

    let temp_element = { ...temp_state[contactIndex] }

    temp_element.favourite = !temp_element.favourite

    temp_state[contactIndex] = temp_element

    setList(temp_state)
  }
  return (
    <div className="drag-n-drop">
      {list.map((item, itemI) => (
        <div
          onDragStart={(e) => handleDragStart(e, { itemI })}
          onDragEnter={
            dragging
              ? (e) => {
                  handleDragEnter(e, { itemI })
                }
              : () => {
                  return null
                }
          }
          className={dragging ? getStyles({ itemI }) : "dnd-item"}
          draggable
        >
          <Contact
            index={item.index}
            setFavourite={setFavourite}
            isFavourite={item.favourite}
            name={item.name}
            mob={item.mob}
            pic={item.pic}
          />
        </div>
      ))}
    </div>
  )
}

ContactList.defaultProps = {
  className: "contact-list"
}
export default ContactList
