
import MicRecorder from "mic-recorder-to-mp3"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import play from "../homepage/play.svg"
import { Link } from 'react-router-dom';
import './recordingPage.css';

  



  // Set AssemblyAI Axios Header
  const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: "c001e8182c2c4da59fd93830ebf22965",
        "content-type": "application/json",
    },
});
assembly
    .post("/transcript", {
        audio_url: "https://bit.ly/3rBnQ8i",
       
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));

const RecordingPage = () => {
  // Mic-Recorder-To-MP3
  const recorder = useRef(null) //Recorder
  const audioPlayer = useRef(null) //Ref for the HTML Audio Tag
  const [blobURL, setBlobUrl] = useState(null)
  const [audioFile, setAudioFile] = useState(null)
  const [isRecording, setIsRecording] = useState(null)

  useEffect(() => {
    //Declares the recorder object and stores it inside of ref
    recorder.current = new MicRecorder({ bitRate: 128 })
  }, [])

  const startRecording = () => {
    // Check if recording isn't blocked by browser
    recorder.current.start().then(() => {
      setIsRecording(true)
    })
  }

  const stopRecording = () => {
    recorder.current
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, "audio.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        })
        const newBlobUrl = URL.createObjectURL(blob)
        setBlobUrl(newBlobUrl)
        setIsRecording(false)
        setAudioFile(file)
      })
      .catch((e) => console.log(e))
  }

  // AssemblyAI API

  // State variables
  const [uploadURL, setUploadURL] = useState("")
  const [transcriptID, setTranscriptID] = useState("")
  const [transcriptData, setTranscriptData] = useState("")
  const [transcript, setTranscript] = useState("")
  const [summary, setSummary] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const update =  async () => {

    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/sheesh',
      data: {
        transcript: transcript,
        summary: 'hi'
      }
    });

}

  // Upload the Audio File and retrieve the Upload URL
  useEffect(() => {
    if (audioFile) {
      assembly
        .post("/upload", audioFile)
        .then((res) => setUploadURL(res.data.upload_url))
        .catch((err) => console.error(err))
    }
  }, [audioFile])

  // Submit the Upload URL to AssemblyAI and retrieve the Transcript ID
  const submitTranscriptionHandler = () => {
    assembly
      .post("/transcript", {
        audio_url: uploadURL,
      })
      .then((res) => {
        setTranscriptID(res.data.id)

        checkStatusHandler()
      })
      .catch((err) => console.error(err))
      console.log("submitted");
  }

  // Check the status of the Transcript
  const checkStatusHandler = async () => {
    setIsLoading(true)
    try {
      await assembly.get(`/transcript/${transcriptID}`).then((res) => {
        setTranscriptData(res.data)
      })
    } catch (err) {
      console.error(err)
    }
  }

  // Periodically check the status of the Transcript
  useEffect(() => {
    const interval = setInterval(() => {
      if (transcriptData.status !== "completed" && isLoading) {
        checkStatusHandler()
      } else {
        setIsLoading(false)
        setTranscript(transcriptData.text)
        setSummary(transcriptData.chapters)
        clearInterval(interval)
        update()
      }
    }, 1000)
    return () => clearInterval(interval)
  },)

  useEffect(() => {
    const interval = setInterval(() => {
      if (transcriptData.status !== "completed" && isLoading) {
        checkStatusHandler()
      } else {
        setIsLoading(false)
        setTranscript(transcriptData.text)

        clearInterval(interval)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, )

  const playButton = async () => {
    if (!isRecording){
        startRecording();
    }
    else {
         stopRecording();
   
      console.log(transcript.data);
     /*    
        
         try{
            return await stopRecording().then((res) => {submitTranscriptionHandler();});        

        }
        catch (error){
            console.log(error);
        } */
    }
  
}

  return (
    <div className="recording-body">
      <div className="recording-container">
        <Link to='/'>homepage</Link>
        <Link to='/entries'>entries</Link>
        <Link to='/recordnow'>record now</Link>
        {/* <Link to='/resources'>resources</Link> */}
      </div>

      <div className="audio">
        <audio ref={audioPlayer} src={blobURL} controls='controls' /> 
      </div>

      <div className="z-index">
        <div className="btn-record">
          <button id={!isRecording ? "start" : "start-alt"} disabled={isRecording} onClick={startRecording}>
            START
          </button>
          <button id={isRecording ? "end" : "end-alt"} disabled={!isRecording} onClick={stopRecording}>
            STOP
          </button>
          <button id="sub" onClick={submitTranscriptionHandler}>SUBMIT</button>
        </div>
      </div>
        
      {/* text being processed */}
      {transcriptData.status === "completed" ? (
        <p className="transcript">{transcript}</p>
      ) : (
        <p className="processing">{transcriptData.status}</p>
      )}
      <div className="waves1">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
      </div>
    </div>
  )
  
}

export default RecordingPage


