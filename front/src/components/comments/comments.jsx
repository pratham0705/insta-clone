import { useContext } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/AuthContext";

const Comments = () => {
  const { user } = useContext(AuthContext);
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  //Temporary
  const comments = [
    {
      id: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "John Doe",
      userId: 1,
      profilePicture:
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "Jane Doe",
      userId: 2,
      profilePicture:
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];
  return (
    <div className="comments">
      <div className="write">
        <img src={PF+"pic/noAvatar.jpeg"} alt="" className="img"/>
        <input type="text" placeholder="write a comment" className="input"/>
        <button className="btn">Send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment">
            <img src={comment.profilePicture} alt="" className="img" />
            <div className="info">
                <p className="desc"> <span className="aloo">{comment.name}</span>  {comment.desc}</p>
            </div>
            <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;