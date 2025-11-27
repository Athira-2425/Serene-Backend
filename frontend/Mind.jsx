import React, { useState, useRef, useEffect,useContext } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaPlus, FaHeart, FaYoutube, FaBookReader, FaSpa, FaTimes, FaLeaf } from "react-icons/fa";

const Page = styled.div`
  font-family: "Poppins", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
    Arial;
  background: linear-gradient(180deg, #f6fbf9 0%, #f2f7fb 100%);
  color: #0a2342;
  min-height: 100vh;
  padding-bottom: 20px;
`;

/* HERO */
const Hero = styled.section`
  position: relative;
  /* CHANGED: Increased height for more impact */
  height: 700px; 
  background: url("https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg") center/cover no-repeat;
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
  box-shadow: inset 0 -40px 80px rgba(10, 35, 66, 0.25);
  display: flex;
  align-items: flex-end;
  padding: 40px; /* Increased padding */
  color: white;
`;

const HeroContent = styled.div`
  z-index: 2;
  max-width: 720px;
`;

const HeroTitle = styled.h1`
  margin: 0 0 8px 0;
  /* CHANGED: Increased font size */
  font-size: 2.8rem; 
  letter-spacing: -0.02em;
`;

const HeroSub = styled.p`
  margin: 0;
  opacity: 0.95;
  /* CHANGED: Increased font size */
  font-size: 1.2rem; 
`;

/* LAYOUT */
const Container = styled.div`
  max-width: 1200px;
  margin: 100px auto; 
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr; 
  gap: 28px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

/* SECTION CARD */
const SectionCard = styled(motion.section)`
  background: white;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 6px 20px rgba(12, 36, 54, 0.06);
  display: flex;
  flex-direction: column; 
  /* CHANGED: Set a minimum height to make all cards equal */
  min-height: 350px; 
`;

const SectionTitle = styled.h3`
    margin-top: 0;
    margin-bottom: 6px;
`;

const SectionSubtitle = styled.p`
    margin-top: 0;
    margin-bottom: 16px;
    color: #556;
`;

/* JOURNAL */
const JournalArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* CHANGED: Makes this area grow to fill available space */
  flex-grow: 1; 
`;

const JournalInput = styled.textarea`
  width: 100%;
  /* CHANGED: Makes textarea grow */
  flex-grow: 1; 
  min-height: 120px;
  border-radius: 10px;
  padding: 12px;
  resize: vertical;
  border: 1px solid #e6eef6;
  font-family: inherit;
  font-size: 0.95rem;
`;

const Row = styled.div`
  display:flex;
  gap:8px;
  align-items:center;
`;

/* Gratitude board */
const GratList = styled.ul`
  list-style:none;
  margin: 0;
  padding: 0;
  display:flex;
  flex-direction:column;
  gap:8px;
`;

const GratItem = styled.li`
  background: linear-gradient(90deg, #fff, #f8fdff);
  padding:10px;
  border-radius:8px;
  box-shadow: 0 4px 18px rgba(12,36,54,0.04);
  display:flex;
  justify-content:space-between;
  align-items:center;
`;

/* little helpers */
const SmallBtn = styled.button`
  border: none;
  background: #3a8df0;
  color: white;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const GhostBtn = styled.button`
  border: none;
  background: transparent;
  color: #3a8df0;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
`;

// --- MODAL STYLES ---
const ModalBackdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ModalContainer = styled(motion.div)`
  background: white;
  padding: 24px;
  border-radius: 16px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 12px;
    right: 12px;
    background: #f0f0f0;
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    cursor: pointer;
    display: grid;
    place-items: center;
    font-size: 1.2rem;
`;

const VideoWrapper = styled.div`
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
    border-radius: 12px;
    margin-bottom: 16px;

    iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;

const GuideSection = styled.div`
    margin-bottom: 24px;
    h4 {
        border-bottom: 2px solid #eef2f7;
        padding-bottom: 8px;
        margin-bottom: 12px;
    }
    p {
        line-height: 1.7;
        color: #334;
    }
`;


/* Motion presets */
const fadeInUp = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } };
const modalVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
};


/* Component */
const Mind = () => {
  /* state */
  const [journalText, setJournalText] = useState("");
  const [journalList, setJournalList] = useState([]);
  const [gratText, setGratText] = useState("");
  const [gratList, setGratList] = useState([]);
  const [modalContent, setModalContent] = useState(null); // 'ted', 'yoga', 'guides'
  const [sensoryStep, setSensoryStep] = useState(null);
  // const { markTaskComplete } = useContext(ProgressContext);//new added

  //   useEffect(() => {
  //   markTaskComplete("mind"); // ✅ Marks "Mind" as completed when visited
  // }, [markTaskComplete]);


  /* load saved data from localStorage */
  useEffect(() => {
    const savedJ = JSON.parse(localStorage.getItem("mind_journals") || "[]");
    const savedG = JSON.parse(localStorage.getItem("mind_grat") || "[]");
    setJournalList(savedJ);
    setGratList(savedG);
  }, []);

  useEffect(() => {
    localStorage.setItem("mind_journals", JSON.stringify(journalList));
  }, [journalList]);

  useEffect(() => {
    localStorage.setItem("mind_grat", JSON.stringify(gratList));
  }, [gratList]);


  /* journaling */
  const saveJournal = () => {
    if (!journalText.trim()) return;
    const entry = { id: Date.now(), text: journalText.trim(), createdAt: new Date().toISOString() };
    setJournalList([entry, ...journalList]);
    setJournalText("");
  };

  const removeJournal = (id) => setJournalList(journalList.filter((j) => j.id !== id));


  /* gratitude */
  const addGrat = () => {
    if (!gratText.trim()) return;
    const entry = { id: Date.now(), text: gratText.trim() };
    setGratList([entry, ...gratList]);
    setGratText("");
  };

  const removeGrat = (id) => setGratList(gratList.filter((g) => g.id !== id));

  /* sensory 5-4-3-2-1 method */
  const startSensory = () => setSensoryStep(0);
  const nextSensory = () => setSensoryStep((s) => (s === null ? 0 : s + 1));
  const resetSensory = () => setSensoryStep(null);

  const renderModalContent = () => {
    switch (modalContent) {
        case 'ted':
            return (
                <div>
                    <h3>TED Talks for Mindfulness</h3>
                    <VideoWrapper>
                        <iframe src="https://www.youtube.com/embed/inpok4MKVLM" title="TED Talk 1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </VideoWrapper>
                    <VideoWrapper>
                        <iframe src="https://www.youtube.com/embed/iCvmsMzlF7o" title="TED Talk 2" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </VideoWrapper>
                </div>
            );
        case 'yoga':
            return (
                <div>
                    <h3>Beginner Yoga & Movement</h3>
                     <VideoWrapper>
                        <iframe src="https://www.youtube.com/embed/v7AYKMP6rOE" title="Yoga Video 1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </VideoWrapper>
                    <VideoWrapper>
                        <iframe src="https://www.youtube.com/embed/8TuRYV71Ogo" title="Yoga Video 2" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </VideoWrapper>
                </div>
            );
        case 'guides':
            return (
                 <div>
                    <h3>Mindfulness Guides & Courses</h3>
                    <GuideSection>
                        <h4>What is Mindfulness?</h4>
                        <p>Mindfulness is the basic human ability to be fully present, aware of where we are and what we’re doing, and not overly reactive or overwhelmed by what’s going on around us. It's a quality every human being already possesses, it's not something you have to conjure up, you just have to learn how to access it.</p>
                    </GuideSection>
                    <GuideSection>
                        <h4>The Science Behind It</h4>
                        <p>Research has shown that mindfulness practices can lead to physical and mental health benefits by remodeling the physical structure of the brain. Neuroscientists have found that it can change brain regions associated with focus, stress, and empathy.</p>
                    </GuideSection>
                     <GuideSection>
                        <h4>Tips for a Consistent Practice</h4>
                        <p><b>Start Small:</b> Begin with just 5 minutes a day. <b>Be Kind to Yourself:</b> It's normal for your mind to wander. Gently guide it back. <b>Schedule It:</b> Practice at the same time each day to build a habit. <b>Find a Community:</b> Practicing with others can provide motivation and support.</p>
                    </GuideSection>
                    <GuideSection>
                        <h4>Themed Courses</h4>
                        <p><b>7-Day Intro to Mindfulness:</b> A structured program that guides you through the fundamentals over a week, perfect for beginners.</p>
                        <p><b>10-Day Course on Managing Stress:</b> Learn specific techniques to notice stress triggers and respond to them with calm and clarity.</p>
                    </GuideSection>
                </div>
            )
        default:
            return null;
    }
  }

  return (
    <Page>
      <Hero>
        <HeroContent as={motion.div} {...fadeInUp}>
          <HeroTitle>Mindfulness</HeroTitle>
          <HeroSub>Short practices, gentle movement, and tools to bring attention back to now.</HeroSub>
        </HeroContent>
      </Hero>

      <Container>
        <LeftCol>
          <SectionCard variants={fadeInUp} initial="initial" animate="animate">
            <SectionTitle>Mindful Journal</SectionTitle>
            <SectionSubtitle>A safe space to note what you noticed today.</SectionSubtitle>
            <JournalArea>
              <JournalInput
                placeholder="Write for a few minutes — what did you observe, feel, or let go of?"
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
              />
              <Row>
                <SmallBtn onClick={saveJournal}><FaPlus /> Save Entry</SmallBtn>
                <GhostBtn onClick={() => { setJournalText(""); }}>Clear</GhostBtn>
              </Row>
              <div style={{marginTop:12}}>
                {journalList.slice(0,3).map((j) => (
                  <div key={j.id} style={{marginBottom:8, display:"flex", justifyContent:"space-between", gap:12, alignItems:"center"}}>
                    <div style={{fontSize:13, color:"#334"}}>{new Date(j.createdAt).toLocaleString()} — {j.text.length > 80 ? j.text.slice(0,80) + "…" : j.text}</div>
                    <GhostBtn onClick={() => removeJournal(j.id)}>Remove</GhostBtn>
                  </div>
                ))}
                {journalList.length === 0 && <div style={{color:"#889", fontSize:13}}>No entries yet.</div>}
              </div>
            </JournalArea>
          </SectionCard>

          <SectionCard variants={fadeInUp} initial="initial" animate="animate">
            <SectionTitle>Learn & Explore</SectionTitle>
            <SectionSubtitle>Deepen your practice with guided videos and articles.</SectionSubtitle>
            <Row>
                <SmallBtn onClick={() => setModalContent('ted')}><FaYoutube /> TED Talks</SmallBtn>
                <SmallBtn onClick={() => setModalContent('yoga')}><FaSpa /> Yoga Videos</SmallBtn>
                <SmallBtn onClick={() => setModalContent('guides')}><FaBookReader /> Guides</SmallBtn>
            </Row>
          </SectionCard>
        </LeftCol>

        <RightCol>
          <SectionCard>
            <SectionTitle>Gratitude & Kindness</SectionTitle>
            <SectionSubtitle>Write something you're grateful for to build positivity.</SectionSubtitle>
            <div style={{display:"flex", gap:8, marginBottom: 12}}>
              <input
                value={gratText}
                onChange={(e) => setGratText(e.target.value)}
                placeholder="I am grateful for..."
                style={{flex:1, padding:8, borderRadius:8, border:"1px solid #e3eef9"}}
              />
              <SmallBtn onClick={addGrat}><FaHeart /></SmallBtn>
            </div>
            <GratList>
              {gratList.length === 0 && <div style={{color:"#889", fontSize:13}}>No notes yet.</div>}
              {gratList.slice(0, 5).map((g) => (
                <GratItem key={g.id}>
                  <div style={{fontSize:14}}>{g.text}</div>
                  <GhostBtn onClick={() => removeGrat(g.id)}>Remove</GhostBtn>
                </GratItem>
              ))}
            </GratList>
          </SectionCard>

          <SectionCard variants={fadeInUp} initial="initial" animate="animate">
            <SectionTitle>Sensory Awareness — 5-4-3-2-1</SectionTitle>
            <SectionSubtitle>A quick grounding exercise to bring you to the present.</SectionSubtitle>
            <div style={{display:"flex", gap:10, alignItems:"center", marginBottom:10}}>
              <SmallBtn onClick={startSensory}><FaLeaf />Start</SmallBtn>
              <GhostBtn onClick={resetSensory}>Reset</GhostBtn>
              <div style={{color:"#778", fontSize:13}}>{sensoryStep === null ? "Not started" : `Step ${sensoryStep + 1}/5`}</div>
            </div>
            <div style={{minHeight:100, display:"grid", placeItems:"center", flexGrow: 1, textAlign: 'center'}}>
              {sensoryStep === null && <div style={{color:"#889"}}>Press start and follow the prompts.</div>}
              {sensoryStep !== null && sensoryStep < 5 && (
                <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} style={{textAlign:"center"}}>
                  {sensoryStep === 0 && <div><strong>Look:</strong> Name 5 things you can see.</div>}
                  {sensoryStep === 1 && <div><strong>Touch:</strong> Name 4 things you can touch nearby.</div>}
                  {sensoryStep === 2 && <div><strong>Hear:</strong> Name 3 sounds.</div>}
                  {sensoryStep === 3 && <div><strong>Smell:</strong> Name 2 scents you notice.</div>}
                  {sensoryStep === 4 && <div><strong>Taste:</strong> Notice 1 taste in your mouth.</div>}
                  <div style={{marginTop:12}}>
                    <SmallBtn onClick={nextSensory}>Next</SmallBtn>
                  </div>
                </motion.div>
              )}
              {sensoryStep !== null && sensoryStep >= 5 && (
                <div style={{color:"#2a6", fontWeight:600}}>Well done — you’re back in the present.</div>
              )}
            </div>
          </SectionCard>
        </RightCol>
      </Container>

      <AnimatePresence>
        {modalContent && (
            <ModalBackdrop
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setModalContent(null)}
            >
                <ModalContainer
                    variants={modalVariant}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={(e) => e.stopPropagation()}
                >
                    <CloseButton onClick={() => setModalContent(null)}><FaTimes /></CloseButton>
                    {renderModalContent()}
                </ModalContainer>
            </ModalBackdrop>
        )}
      </AnimatePresence>
    </Page>
  );
};

export default Mind;














