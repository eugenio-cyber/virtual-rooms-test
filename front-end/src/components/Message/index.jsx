import "./styles.css";

const Message = ({ name, text, index, id, myId }) => {
  return id !== myId ? (
    <div className='message-other' key={index}>
      <span className='message-other__name'>{name}</span>
      <p className='message-other__text'>{text}</p>
    </div>
  ) : (
    <div className='message-mine' key={index}>
      <span className='message-mine__name'>Eu</span>
      <p className='message-mine__text'>{text}</p>
    </div>
  );
};

export default Message;
