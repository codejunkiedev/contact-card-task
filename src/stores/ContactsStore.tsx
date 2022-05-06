import React, { useState, useContext, useEffect } from "react"
import { useImmer } from "@state/stores/StoreUtils"

import contact1 from "./assets/contact_01.png"
import contact2 from "./assets/contact_02.png"
import contact3 from "./assets/contact_03.png"
import contact4 from "./assets/contact_04.png"
import contact5 from "./assets/contact_05.png"
import contact6 from "./assets/contact_06.png"
import contact7 from "./assets/contact_07.png"
import contact8 from "./assets/contact_08.png"
import contact9 from "./assets/contact_09.png"
import contact10 from "./assets/contact_10.png"
import contact11 from "./assets/contact_11.png"
import contact12 from "./assets/contact_12.png"

export const contacts: IContact[] = [
  {
    name: "JOHN DOE",
    pic: contact1,
    mob: "0160 465 7346"
  },
  {
    name: "ALEX SMITH",
    pic: contact2,
    mob: "0154 765 8987"
  },
  {
    name: "SAMANTHA IVY",
    pic: contact3,
    mob: "0147 874 9863"
  },

  {
    name: "ELLEN DOE",
    pic: contact4,
    mob: "0150 987 9763"
  },
  {
    name: "PHIL RUDOLPH",
    pic: contact5,
    mob: "0157 084 4693"
  },
  {
    name: "ANNA WEBER",
    pic: contact6,
    mob: "0154 765 8987"
  },
  {
    name: "EMILIA MEYER",
    pic: contact7,
    mob: "0150 987 9763"
  },
  {
    name: "ARTUR KIRCHNER",
    pic: contact8,
    mob: "0147 874 9863"
  },
  {
    name: "JOEL STAHL",
    pic: contact9,
    mob: "0157 084 4693"
  },
  {
    name: "CLARA SCHMITZ",
    pic: contact10,
    mob: "0150 987 9763"
  },
  {
    name: "LENNY GARTNER",
    pic: contact11,
    mob: "0147 874 9863"
  },
  {
    name: "MILA BRAUN",
    pic: contact12,
    mob: "0157 084 4693"
  }
]

export const initialState = {
  contacts: contacts.map((x, i) => ({ ...x, index: i, favourite: false }))
}

type IState = typeof initialState

export interface IPncStore extends IState {
  swap: (fromIndex: number, toIndex: number) => void
  toggleFavourite: (index: number) => void
}

function createStore() {
  //@ts-ignore
  const Context = React.createContext<IPncStore>()

  function Provider({ children }: { children: React.ReactNode }) {
    const [state, set] = useImmer<IState>(initialState)

    const swap = (fromIndex: number, toIndex: number) => {}
    const toggleFavourite = (index: number) => {}

    const contextObject: IPncStore = {
      ...state,
      swap,
      toggleFavourite
    }

    return <Context.Provider value={contextObject}>{children}</Context.Provider>
  }

  const useStore = () => useContext<IPncStore>(Context)
  return { Provider, useStore }
}
const ContactsStore = createStore()

export default ContactsStore
