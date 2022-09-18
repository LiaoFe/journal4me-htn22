
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
      authorization: "ec298ba669bd4ee88ec7ad7c46a803fd",
      "content-type": "RecordingPagelication/json",
      "transfer-encoding": "chunked",
    },
  })

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
  const [isLoading, setIsLoading] = useState(false)

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

        clearInterval(interval)
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
        console.log("sheesh");
    }
    else {
         stopRecording();
      submitTranscriptionHandler();
      submitTranscriptionHandler();
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
      <div>
        <div className="recording-container">
          <Link to='/'>homepage</Link>
          <Link to='/entries'>entries</Link>
          <Link to='/recordnow'>record now</Link>
        </div>
          <audio ref={audioPlayer} src={blobURL} controls='controls' /> 
          
          <div>
            <div className="btn-record">
              <button disabled={isRecording} onClick={startRecording}>
                START
              </button>
              <button disabled={!isRecording} onClick={stopRecording}>
                STOP
              </button>
              <button onClick={submitTranscriptionHandler}>SUBMIT</button>
            </div>

            <div className="row">
                    {/* <div className="bottom-btn">
                            <button onClick={playButton}>
                                <img src={play} alt="Play Button" height='50' width={'150'}/>
                            </button>
                        </div> */}
                {/*     <div className="bottom-btn">
                            <button onClick={submitTranscriptionHandler}>
                                <img src={play} alt="Play Button" height='50' width={'150'}/>
                            </button>
                        </div> */}
            </div>
          </div>
          
          {/* text being processed */}
          {transcriptData.status === "completed" ? (
            <p className="transcript">{transcript}</p>
          ) : (
            <p>{transcriptData.status}</p>
          )}
      </div>
    </div>
  )
}

export default RecordingPage


