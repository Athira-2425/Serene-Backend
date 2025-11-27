import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaPlay, FaPause } from "react-icons/fa";
import { useProgress } from "../context/ProgressContext";

// --- Styled Components ---
const PageContainer = styled.div`
  background: #f4f8fb;
  font-family: 'Poppins', sans-serif;
  padding-bottom: 60px;
`;

const HeaderSection = styled.div`
  position: relative;
  height: 1000px;
  background: url("https://images.pexels.com/photos/3571551/pexels-photo-3571551.jpeg") center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: 0px 2px 6px rgba(0,0,0,0.4);
`;

const HeaderOverlay = styled.div`
  background: rgba(0,0,0,0.4);
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
`;

const HeaderText = styled.div`
  z-index: 1;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
`;

const TabNav = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  margin: 40px 0;
`;

const TabButton = styled.button`
  padding: 12px 28px;
  font-size: 1rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  background: ${(props) =>
    props.$active ? "linear-gradient(90deg, #6bc1ff, #3a68c2)" : "#e2e8f0"};
  color: ${(props) => (props.$active ? "#fff" : "#2c3e50")};
`;

const Section = styled.div`
  padding: 30px 50px;
`;

const BreathingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BreathingCircle = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.6), rgba(173,216,230,0.6));
  animation: breathe 8s infinite ease-in-out;

  @keyframes breathe {
    0%,100% { transform: scale(1); background: radial-gradient(circle, rgba(255,255,255,0.6), rgba(173,216,230,0.6)); }
    25% { transform: scale(1.2); background: radial-gradient(circle, rgba(255,255,255,0.8), rgba(135,206,250,0.7)); }
    50% { transform: scale(1.3); background: radial-gradient(circle, rgba(255,255,255,0.9), rgba(70,130,180,0.7)); }
    75% { transform: scale(1.2); background: radial-gradient(circle, rgba(255,255,255,0.8), rgba(135,206,250,0.7)); }
  }
`;

const BreathingText = styled.h3`
  margin-top: 20px;
  font-size: 1.5rem;
  color: #2c3e50;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  height: 250px;
  cursor: pointer;
  background: url(${props => props.$bg}) center/cover no-repeat;
  display: flex;
  align-items: flex-end;
  color: white;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

const CardOverlay = styled.div`
  background: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0));
  padding: 20px 15px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  margin-left: 10px;
`;

const MoodTracker = styled.div`
  background: url("https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg") center/cover no-repeat;
  border-radius: 15px;
  padding: 50px;
  min-height: 300px;
  color: black;
  text-align: center;
`;

const JournalWrapper = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 15px;
`;

const JournalEntry = styled.div`
  margin-top: 15px;
  background: #f1f1f1;
  padding: 10px;
  border-radius: 10px;
`;

// --- Main Component ---
const Stress = () => {
  const { markComplete } = useProgress(); // ✅ Using the custom hook
  const [activeTab, setActiveTab] = useState("breathing");
  const [mood, setMood] = useState(5);
  const [breathingPhase, setBreathingPhase] = useState("Breathe In");
  const [journal, setJournal] = useState("");
  const [savedJournals, setSavedJournals] = useState([]);
  const [audioSrc, setAudioSrc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Load journals from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("journals")) || [];
    setSavedJournals(stored);
  }, []);

  // Breathing animation phases
  useEffect(() => {
    const phases = ["Breathe In", "Hold", "Breathe Out", "Hold"];
    let i = 0;
    const interval = setInterval(() => {
      setBreathingPhase(phases[i]);
      i = (i + 1) % phases.length;
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Audio play/pause
  const handlePlayPause = (url) => {
    if (isPlaying && audioSrc === url) {
      audioRef.current.pause();
    } else {
      if (audioSrc !== url) setAudioSrc(url);
      else audioRef.current.play();
    }
  };

  useEffect(() => {
    if (audioSrc && audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  }, [audioSrc]);

  // Save journal entry
  const saveJournal = () => {
    if (!journal.trim()) return;
    const entry = { date: new Date().toLocaleDateString(), text: journal };
    const updated = [entry, ...savedJournals];
    setSavedJournals(updated);
    localStorage.setItem("journals", JSON.stringify(updated));
    setJournal("");
    markComplete("Stress Journal"); // mark task complete
  };

  // Meditation cards
  const meditationTracks = [
    { title: "Morning Calm", bg: "https://images.pexels.com/photos/3759653/pexels-photo-3759653.jpeg", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "Ocean Waves", bg: "https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
    { title: "Night Wind", bg: "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  ];

  return (
    <PageContainer>
      <audio
        ref={audioRef}
        src={audioSrc}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      <HeaderSection>
        <HeaderOverlay />
        <HeaderText>
          <Title>Find Your Calm</Title>
          <Subtitle>Relax your mind, ease your stress, and feel lighter.</Subtitle>
        </HeaderText>
      </HeaderSection>

      <TabNav>
        {["breathing","meditation","tips","mood","journal"].map(tab => (
          <TabButton
            key={tab}
            $active={activeTab===tab}
            onClick={()=>setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase()+tab.slice(1)}
          </TabButton>
        ))}
      </TabNav>

      <Section>
        {activeTab==="breathing" && (
          <BreathingWrapper>
            <BreathingCircle />
            <BreathingText>{breathingPhase}</BreathingText>
          </BreathingWrapper>
        )}

        {activeTab==="meditation" && (
          <CardGrid>
            {meditationTracks.map(track=>(
              <Card key={track.title} $bg={track.bg} onClick={()=>handlePlayPause(track.url)}>
                <CardOverlay>
                  {isPlaying && audioSrc===track.url ? <FaPause /> : <FaPlay />}
                  <CardTitle>{track.title}</CardTitle>
                </CardOverlay>
              </Card>
            ))}
          </CardGrid>
        )}

        {activeTab==="tips" && (
          <CardGrid>
            {[
              { title:"Take a short walk", bg:"https://images.pexels.com/photos/3769748/pexels-photo-3769748.jpeg" },
              { title:"Practice gratitude", bg:"https://images.pexels.com/photos/268917/pexels-photo-268917.jpeg" },
              { title:"Drink water", bg:"https://images.pexels.com/photos/3755449/pexels-photo-3755449.jpeg" }
            ].map(tip=>(
              <Card key={tip.title} $bg={tip.bg}>
                <CardOverlay>
                  <CardTitle>{tip.title}</CardTitle>
                </CardOverlay>
              </Card>
            ))}
          </CardGrid>
        )}

        {activeTab==="mood" && (
          <MoodTracker>
            <h2>Rate Your Stress</h2>
            <input type="range" min="1" max="10" value={mood} onChange={e=>setMood(parseInt(e.target.value))}/>
            <p>{mood}/10</p>
            <p>{mood<5?"😊 Low stress — keep up your healthy habits!":mood<=7?"😌 Moderate stress — take short breaks and practice mindfulness.":"😟 High stress — try breathing exercises or guided meditation."}</p>
          </MoodTracker>
        )}
{/* 
        {activeTab==="journal" && (
          <JournalWrapper>
            <h2>Daily Journal</h2>
            <textarea value={journal} onChange={e=>setJournal(e.target.value)} placeholder="Write your thoughts..." rows="4" style={{width:"100%",padding:"10px",borderRadius:"10px"}} />
            <button onClick={saveJournal} style={{marginTop:"10px",padding:"8px 15px",border:"none",background:"#3a68c2",color:"#fff",borderRadius:"5px"}}>Save</button>
            {savedJournals.map((entry,index)=>(
              <JournalEntry key={index}>
                <strong>{entry.date}</strong>
                <p>{entry.text}</p>
              </JournalEntry>
            ))}
          </JournalWrapper> */}
        {/* )} */}
        {activeTab==="journal" && (
          <JournalWrapper>
            <h2>Daily Journal</h2>
            <textarea
              value={journal}
              onChange={e => setJournal(e.target.value)}
              placeholder="Write your thoughts..."
              rows="4"
              style={{ width:"100%", padding:"10px", borderRadius:"10px" }}
            />
            <button
              onClick={saveJournal}
              style={{
                marginTop:"10px",
                padding:"8px 15px",
                border:"none",
                background:"#3a68c2",
                color:"#fff",
                borderRadius:"5px"
              }}
            >
              Save
            </button>

            {savedJournals.map((entry,index)=>(
              <JournalEntry key={index} style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div>
                  <strong>{entry.date}</strong>
                  <p>{entry.text}</p>
                </div>
                <button
                  onClick={() => {
                    const updated = savedJournals.filter((_, i) => i !== index);
                    setSavedJournals(updated);
                    localStorage.setItem("journals", JSON.stringify(updated));
                  }}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    cursor: "pointer",
                    marginLeft: "10px",
                    height: "fit-content"
                  }}
                >
                  Remove
                </button>
              </JournalEntry>
            ))}
          </JournalWrapper>
        )}

      </Section>
    </PageContainer>
  );
};

export default Stress;
























