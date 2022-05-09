import React, { useState } from "react"
import Avatar from "react-avatar"
import { AiOutlineStar, AiFillStar } from "react-icons/ai"
interface IContact {
  name: string
  mob: string
  pic: string
}
const Contact: React.FC<IContact> = ({ name, mob, pic }) => {
  const [clicked, setClicked] = useState(false)
  return (
    <div
      className="my_com"
      style={{
        // width: "50px",
        // height: "50px",
        borderRadius: "1rem",
        boxSizing: "border-box",
        backgroundColor: "white",
        // display: "flex",
        // justifyContent: "space-between",
        // flexDirection: "row-reverse",
        padding: ".6rem"
        // alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row-reverse" }} onClick={() => setClicked((prev) => !prev)}>
        {clicked ? <AiFillStar style={{ alignSelf: "center" }} /> : <AiOutlineStar style={{ alignSelf: "center" }} />}
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0rem 1rem",
          boxSizing: "border-box"
        }}
      >
        <div>
          <p style={{ fontSize: ".8rem", fontWeight: "600" }}>{name}</p>
          <p style={{ fontSize: "1.3rem", fontWeight: "500", color: "gray" }}>{mob}</p>
        </div>
        <Avatar src={pic} size="60" round={true} />
      </div>
    </div>
  )
}

export default Contact
