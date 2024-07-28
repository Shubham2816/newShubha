import React from 'react' 
import './Main.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { useState } from 'react'

import { Context } from '../../context/context'

const Main = () => {

const{onSent,recentPrompt,showResult,loading, resultData,setInput,input,nightMode, toggleNightMode}=useContext(Context)
const [isRecording, setIsRecording] = useState(false);


const handleCardClick = (topic) => {
    setInput(topic)
    onSent(topic)
  };



  const handleRecordButtonClick = () => {
    if (isRecording) {
        stopRecording();
    } else {
        startRecording();
    }
};

const startRecording = () => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        alert('Speech Recognition API not supported in this browser.');
        return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        onSent(transcript);
        stopRecording(); // Automatically stop recording after getting the result
    };

    recognition.onerror = (event) => {
        console.error('Speech Recognition error', event.error);
    };

    recognition.onend = () => {
        setIsRecording(false);
    };

    recognition.start();
    setIsRecording(true);
};

const stopRecording = () => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.stop();
    }
    setIsRecording(false);
};



  return (

    <div className={`main ${nightMode ? 'night-mode' : ''}`}>
            <div className="nav">
                <p>Shubh</p>
                <img src={assets.user_icon} alt="" />
          {/* <button onClick={toggleNightMode}> */}
                {/* {nightMode ? '🌞' : '🌙'} Toggle icon based on nightMode</button> */}
            </div>





    {/* // <div className="main">
    //     <div className="nav">
    //         <p>Shubh</p>
    //         <img src={assets.user_icon} alt="" />
    //     </div>  */}


{!showResult
?<> 
<div className="main-container">
<div className="greet">
                <p><span>Hello,leader.</span></p>
                <p>How can I help you today?</p>
            </div>

            <div className="cards">
                <div className="card" onClick={() => handleCardClick('Suggest beautiful places to see on an upcoming road trip')}>
                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>

                <div className="card" onClick={() => handleCardClick('Briefly summarize this concept: urban planning')}>
                    <p>Briefly summarize this concept: urban planning</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>

                <div className="card"  onClick={() => handleCardClick('Brainstorm team bonding activities for our work retreat')}>
                    <p>Brainstorm team bonding activities for our work retreat</p>
                    <img src={assets.message_icon} alt="" />
                </div>

                <div className="card" onClick={() => handleCardClick('Tell me about React js and React native')}>
                    <p>Tell me about React js and React native</p>
                    <img src={assets.code_icon} alt="" />
                </div>

            </div>
            </div>

</>
:
<div className="result">
    <div className="result-title">
        <img src={assets.user_icon} alt="" />
        <p>{recentPrompt}</p>
    </div>

    <div className="result-data">
        <img src={assets.gemini_icon} alt="" />

{loading
? 
<div className="loader">
<hr />
<hr />
<hr />
</div>
:  <p dangerouslySetInnerHTML={{__html:resultData}}></p>
}

      
    </div>
</div>
}


        <div className="main-container">
           



            <div className="main-bottom">
                <div className="search-box">
                    <input  onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter your prompt here' />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" onClick={handleRecordButtonClick} style={{ cursor: 'pointer' }}/>
                       {input? <img  onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
                    </div>
                </div>


                <p className='bottom-info'>Shubh may display inaccurate info, including about people, so double-check its responses.   <a href="https://shubhamdrizzy-portfolio.netlify.app/" className="impo">Check important info.</a></p>
            </div>
        </div>
    {/* </div> */}
    </div>
  )
}

export default Main