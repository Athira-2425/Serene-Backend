
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";
// Make sure to have a placeholder image or the actual one at this path
import BabySleepingImage from "../asset/images/kid.png";

const PageContainer = styled.div`
  background: #f9f9f9;
  padding-bottom: 3px;(changed to reduce padding under contentData)
`;

const PageHeader = styled.div`
  display: flex;
  align-items: stretch;
  gap: 0; 
  background: #fff;
  height: 100vh;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 0 80px 0; /added new

  @media (max-width: 900px) {
    flex-direction: column-reverse;
    height: auto;
    text-align: center;
  }
`;

const HeaderTextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 50px;
  /* CHANGE: This makes sure the text section takes up half the space */
  width: 50%;

  @media (max-width: 900px) {
    width: 100%;
    padding: 40px 25px;
  }
`;

const HeaderImageContainer = styled.div`
  flex: 1;
  /* CHANGE: This makes sure the image section takes up the other half */
  width: 40%;
  height: 100%; /* Ensure container fills the header height */

  @media (max-width: 900px) {
    width: 100%;
    max-height: 250px;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: #0a2342;
  margin-bottom: 20px;
  line-height: 1.2;
  max-width: 15ch;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #2c3e50;
  line-height: 1.7;
  max-width: 500px;
`;

const HeaderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentArea = styled.div`
  /* CHANGE: Increased top padding to 40px to add space between header and content */
  padding: 60px 50px;
`;

const TabNav = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 50px;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  padding: 12px 28px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) =>
    props.$active
      ? "linear-gradient(90deg, #3a68c2, #0a2342)"
      : "#e2e8f0"};
  color: ${(props) => (props.$active ? "#fff" : "#2c3e50")};
  box-shadow: ${(props) =>
    props.$active ? "0 5px 15px rgba(58, 104, 194, 0.4)" : "none"};
`;

const RailContainer = styled.div`
  margin-bottom: 50px;
  position: relative;
`;

const RailTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #0a2342;
  margin-bottom: 25px;
  text-align: left;
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  color: #333;
  opacity: 0;
  transition: opacity 0.2s ease;

  ${RailContainer}:hover & {
    opacity: 1;
  }

  &.left {
    left: -20px;
  }
  &.right {
    right: -20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ScrollWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 22%;
  overflow-x: auto;
  gap: 25px;
  padding-bottom: 20px;
  scrollbar-width: none;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1200px) {
    grid-auto-columns: 30%;
  }
  @media (max-width: 768px) {
    grid-auto-columns: 45%;
  }
  @media (max-width: 480px) {
    grid-auto-columns: 65%;
  }
`;

const AppleMusicCard = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

const ArtworkWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
`;

const PlayButtonOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  font-size: 3rem;
  color: #fff;
`;

const AppleMusicCardHover = styled(AppleMusicCard)`
  &:hover ${PlayButtonOverlay} {
    opacity: 1;
  }
  &:hover ${CardImage} {
    transform: scale(1.05);
  }
`;

const CardInfo = styled.div`
  text-align: left;
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #0a2342;
  margin: 0 0 4px 0;
`;

const CardAuthor = styled.p`
  font-size: 0.9rem;
  color: #5a677d;
  margin: 0;
`;

const contentData = {
    stories: [
        {
          title: "The Little Star",
          author: "A Gentle Narration",
          img: "https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg",
          audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        },
        // ... other stories
      ],
      meditations: [
        {
          title: "Deep Sleep Relaxation",
          author: "Guided Meditation",
          img: "https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg",
          audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        },
         // ... other meditations
      ],
      music: [
        {
          title: "Peaceful Piano",
          author: "Relaxing Music",
          img: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg",
          audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        },
        {
            title: "Calm Ambient Music",
            author: "Relaxing Music",
            img: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg",
            audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
          },
          {
            title: "Soft Acoustic Guitar",
            author: "Relaxing Music",
            img: "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg",
            audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
          },
          {
            title: "Meditative Ambient",
            author: "Relaxing Music",
            img: "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg",
            audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          },
          {
            title: "Relaxing Instrumental",
            author: "Relaxing Music",
            img: "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg",
            audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          },
        // ... other music
      ],
      soundscapes: [
        {
          title: "Gentle Rain",
          author: "Nature Sounds",
          img: "https://images.pexels.com/photos/7919/pexels-photo.jpg",
          audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
        },
        // ... other soundscapes
      ],
  };

const SleepPage = () => {
  const [activeTab, setActiveTab] = useState("stories");
  const { playTrack } = useAuth();
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
        const scrollAmount = scrollRef.current.offsetWidth * 0.8;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth"
        });
    }
  };


  const renderContentRail = () => {
    const railTitles = {
      stories: "Popular Stories",
      meditations: "Sleep Meditations",
      music: "Sleep Music",
      soundscapes: "Relaxing Soundscapes",
    };
    const currentItems = contentData[activeTab] || [];

    return (
      <RailContainer>
        <RailTitle>{railTitles[activeTab]}</RailTitle>
        <ScrollButton className="left" onClick={() => handleScroll('left')}><FaChevronLeft /></ScrollButton>
        <ScrollWrapper ref={scrollRef}>
          {currentItems.map((item, index) => (
            <AppleMusicCardHover key={index} onClick={() => playTrack(item)}>
              <ArtworkWrapper>
                <CardImage src={item.img} alt={item.title} />
                <PlayButtonOverlay>
                  <FaPlay />
                </PlayButtonOverlay>
              </ArtworkWrapper>
              <CardInfo>
                <CardTitle>{item.title}</CardTitle>
                <CardAuthor>{item.author}</CardAuthor>
              </CardInfo>
            </AppleMusicCardHover>
          ))}
        </ScrollWrapper>
        <ScrollButton className="right" onClick={() => handleScroll('right')}><FaChevronRight /></ScrollButton>
      </RailContainer>
    );
  };

  return (
    <PageContainer>
      <PageHeader>
        <HeaderTextContent>
          <Title>Find Your Way to Restful Sleep</Title>
          <Subtitle>
            Sleep Stories, sleep meditations, music and soundscapes for your
            dreamiest sleep yet. Just press play and drift away.
          </Subtitle>
        </HeaderTextContent>
        <HeaderImageContainer>
          <HeaderImage
            src={BabySleepingImage}
            alt="A peaceful baby sleeping soundly."
          />
        </HeaderImageContainer>
      </PageHeader>
      <ContentArea>
        <TabNav>
          <TabButton
            $active={activeTab === "stories"}
            onClick={() => setActiveTab("stories")}
          >
            Sleep Stories
          </TabButton>
          <TabButton
            $active={activeTab === "meditations"}
            onClick={() => setActiveTab("meditations")}
          >
            Sleep Meditations
          </TabButton>
          <TabButton
            $active={activeTab === "music"}
            onClick={() => setActiveTab("music")}
          >
            Music
          </TabButton>
          <TabButton
            $active={activeTab === "soundscapes"}
            onClick={() => setActiveTab("soundscapes")}
          >
            Soundscapes
          </TabButton>
        </TabNav>
        {renderContentRail()}
      </ContentArea>
    </PageContainer>
  );
};

export default SleepPage;





























