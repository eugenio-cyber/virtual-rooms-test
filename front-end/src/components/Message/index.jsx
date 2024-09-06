import "./styles.css";

const Message = ({ messageInfo, myId }) => {
  return messageInfo.user_id !== myId ? (
    <div className='message-other'>
      <span className='message-other__name'>{messageInfo.username}</span>
      <p className='message-other__text'>{messageInfo.message}</p>
    </div>
  ) : (
    <div className='message-mine'>
      <span className='message-mine__name'>Eu</span>
      <p className='message-mine__text'>{messageInfo.message}</p>
    </div>
  );
};

export default Message;
