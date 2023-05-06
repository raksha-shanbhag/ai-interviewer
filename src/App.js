import { useCallback, useMemo, useState } from "react";
import ChatHistory from "./components/chatHistory";

const API_URL = 'http://localhost:8000/completions';

const App = () => {
  const [value, setValue] = useState(null);
  const [chatNum, setChatnum] = useState(0)
  const [response, setResponse] = useState("Type in your work experience");
  const [previousChats, setPreviousChats] = useState([])
  const [expand, setExpand] = useState(false);

  const getMessages = async() => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value
      }), 
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
      const response = await fetch(API_URL, options);
      const data = await response.json();
      setResponse(data.choices[0].message.content);
      setPreviousChats((prevChats)=> 
        [
          ...prevChats,
          {
            role: "user",
            content: value,
            session: chatNum + 1
          },
          { ...data.choices[0].message,
            session: chatNum + 1
          }
        ]
      );
      setChatnum((prevChatNum) => prevChatNum+1);
      setExpand(true);
    } catch(error){
      console.log(error)
    }
  }

  const clearResponse = () => {
    setResponse('');
    setValue('');
  }

  const chatHistory = useMemo(() => {
    const chats = previousChats.sort((a,b) => {return b.session - a.session })
    return (
      <div className="whole-chat">
        {chats.map((chat)=>{
          return chat.role === 'user' ? 
            (
              <div className="user-question message">
                <p className='message-title'>User: </p>
                <p className='message-content'>{chat.content}</p>
              </div>
            ) : (
              <div className="system-response message">
                <p className='message-title'>System:</p>
                <p className='message-content'>{chat.content}</p>
              </div>
            );
        })}
      </div>
    )
  }, [previousChats])

  return (
    <div className="app">
      {/* <section className='side-bar'>
        <button> + New Chat</button>
        <ul className='history'> History</ul>
        <nav>
          <p> Made by Raksha</p>
        </nav>
      </section> */}
      <section className='content'>
        <div className="title"> Interview Assistant</div>
        <div className="bottom-section">
          <ChatHistory children={chatHistory} defaultExpanded={expand}/>
          <div className="input-container">
            <div className="input-title">Interview questions regarding your job description</div>
            <ul className="history">

            </ul>
            <textarea className="input-area" placeholder="Place your job description here" rows={5} value={value} onChange={(e)=> setValue(e.target.value)}/>
            <div className="response-display">
              <b className="response-title">{'Interviewer:\n'}</b>
              {response}
            </div>
            <div className="action-buttons">
              <button className="submit ac-button" onClick={getMessages}>Submit</button>
              <button className="another ac-button" onClick={clearResponse}>Clear</button>
            </div>
          </div>
        </div>
        <p className="info">
          Made by Raksha Shanbhag
        </p>
      </section>
    </div>
  );
}

export default App;
