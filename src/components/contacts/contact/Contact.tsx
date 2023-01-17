import React from "react"
import Avatar from "react-avatar"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"

interface IContact {
  name: string
  mob: string
  pic: string
  isFavourite: boolean
  index: number
  setFavourite: (index: number) => void
}
const AvatarB = Avatar as any
const Contact: React.FC<IContact> = ({ name, mob, pic, setFavourite, isFavourite, index }) => {
  return (
    <div className="contact-card">
      <div className="contact-card-top-row" onClick={() => setFavourite(index)}>
        {isFavourite ? <AiFillStar /> : <AiOutlineStar />}
      </div>
      <div className="contact-card-main-row">
        <div>
          <p className="contact-card-main-row-name">{name}</p>
          <p className="contact-card-main-row-mob">{mob}</p>
        </div>
        <AvatarB src={pic} size="60" round={true} />
      </div>
    </div>
  )
}

export default Contact
