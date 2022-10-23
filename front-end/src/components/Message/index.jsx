import "./styles.css";

const Message = ({ messageInformation, index, myId }) => {
  return messageInformation.id !== myId ? (
    <div className='message-other' key={index}>
      <span className='message-other__name'>{messageInformation.name}</span>
      <p className='message-other__text'>{messageInformation.message}</p>
    </div>
  ) : (
    <div className='message-mine' key={index}>
      <span className='message-mine__name'>Eu</span>
      <p className='message-mine__text'>{messageInformation.message}</p>
    </div>
  );
};

export default Message;
