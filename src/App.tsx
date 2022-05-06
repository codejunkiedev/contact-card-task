import React from "react"
import logo from "./background_map.svg"
import "./App.css"
import ContactList from "@com/contacts/ContactList"
import ContactsStore from "@state/stores/ContactsStore"

const App: React.FunctionComponent = () => {
  return (
    <div className="App newHardware">
      <ContactsStore.Provider>
        <ContactList />
      </ContactsStore.Provider>
    </div>
  )
}

export default App
