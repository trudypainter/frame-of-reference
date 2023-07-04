import React, { useState, useEffect, useRef } from "react";
import { render } from "react-dom";

const TerminalSimulator = ({ step, setStep }) => {
  const introductionText = `Hello,
      
      Welcome to our manifestation portal, here you can materialize anything you want to create, simply by willing it into action.
      
      Product, Service, API, invention, global / local solution.
      
      Take a moment. Visualize your idea with all 5 senses and take it to the source.
      
      `;

  const ideas = [
    "Recycling infrastructure in Guadalajara",
    "Pacific Islander Venture Fund",
    "A new app or software tool to help people manage their finances",
    "A design for a new product, such as a piece of furniture or a piece of jewelry",
    "A new social media platform that connects people with similar interests",
    "A service that helps people with home organization and decluttering",
    "An API that allows businesses to integrate with a popular third-party tool",
    "A solution for reducing plastic waste in the environment",
    "A local solution for improving transportation in a specific city or town",
    "A global solution for addressing climate change.",
    "A mobile app that helps people track their water intake throughout the day",
    "A recipe for a vegan and gluten-free chocolate cake that doesn't sacrifice taste",
    "A proposal for a startup that provides affordable, healthy meal delivery to college campuses",
    "A design for a new ergonomic office chair that improves posture and reduces back pain",
    "A social media platform that focuses on connecting pet owners with each other and with pet-friendly businesses",
    "A service that helps busy parents organize their family schedules and tasks",
    "An API that allows businesses to access real-time data on weather patterns and climate conditions in their area",
    "A solution for turning plastic waste into eco-friendly building materials",
    "A local solution for improving bike infrastructure in a specific neighborhood or district",
    "A global solution for reducing food waste by optimizing supply chains and reducing spoilage during transportation.",
  ];

  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let currentIdea = currentIndex % ideas.length;
    let fullText = introductionText + ideas[currentIdea];

    if (isWaiting) return; // Don't do anything if we're waiting after typing out a text

    let timeoutLength = isDeleting ? 10 : 30; // Speed up when deleting

    const timerId = setTimeout(() => {
      if (!isDeleting && typedText === fullText) {
        setIsWaiting(true);
        setTimeout(() => {
          setIsWaiting(false);
          setIsDeleting(true);
        }, 2000);
      } else if (isDeleting && typedText === introductionText) {
        setIsDeleting(false);
        if (currentIdea === 0) {
          setButtonVisible(true); // Set the button as visible
        }
        if (currentIdea < ideas.length - 1) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }
      } else {
        setTypedText((prevText) =>
          isDeleting
            ? prevText.slice(0, prevText.length - 1)
            : prevText + fullText[prevText.length]
        );
      }
    }, timeoutLength);

    return () => clearTimeout(timerId); // Clear timeout on unmount
  }, [typedText, isDeleting, isWaiting, introductionText, ideas, currentIndex]);

  const renderText = typedText.split("\n").map((item, key) => {
    // if its an idea, make it green
    if (key > 6) {
      return (
        <span key={key}>
          <span className="text-gray-500">{item}</span>
          <br />
        </span>
      );
    }
    return (
      <span key={key}>
        {item}
        <br />
      </span>
    );
  });

  // handle proceed clicked, set proceedClicked to true
  const handleProceedClicked = () => {
    setIsVisible(false);

    // after 1.5 seconds, set step to 1
    setTimeout(() => {
      setStep(1);
    }, 1500);
  };

  const [scrollPosition, setScrollPosition] = useState(1);
  const [images, setImages] = useState([]);
  const [windowHeight, setWindowHeight] = useState(0);

  const imgRef = useRef(); // Reference to the image element

  const totalImages = 637;
  const sampledImages = Math.floor(totalImages / 4);
  const scrollAmountPerImage = 10; // adjust this to the desired scroll amount per image
  const stepSize = Math.floor(totalImages / sampledImages);

  // Load and preload your images
  useEffect(() => {
    let loadedImages = [];
    for (let i = 1; i <= totalImages; i += stepSize) {
      let paddedIndex = String(i).padStart(3, "0"); // pad the index with leading zeros
      let imagePath = `/640x360/A_${paddedIndex}.png`;
      loadedImages.push(imagePath);

      // Preload the image
      let img = new Image();
      img.src = imagePath;
    }
    setImages(loadedImages);
  }, []);

  // Event listener for scroll events
  useEffect(() => {
    const onScroll = () => {
      let newPosition = window.pageYOffset;
      let index = Math.ceil(newPosition / scrollAmountPerImage);
      index = Math.min(sampledImages - 1, Math.max(0, index)); // Ensure index is within the range

      // if the final index, set step to 1
      if (index === sampledImages - 1) {
        setStep(1);
      }

      setScrollPosition(index);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Effect to update the image src when scrollPosition changes
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.src = images[scrollPosition];
    }
  }, [scrollPosition, images]);

  // Calculate opacity based on scroll position
  const opacity = 1 - scrollPosition / (sampledImages - 1);

  return (
    <>
      {step === 0 && (
        <>
          <div
            style={{
              height: `${totalImages * sampledImages}px`,
            }}
          />{" "}
          {/* spacer div */}
          <div className="fixed w-screen h-screen z-20 text-white overflow-hidden">
            {/* <div className="fixed top-0 z-90 text-red-300">
              {images[scrollPosition]}
            </div> */}
            <img
              ref={imgRef}
              alt="Animated frame"
              className="object-cover object-center w-full h-full"
            />
          </div>
          <div
            style={{ opacity: opacity }}
            className={`fixed h-screen w-full p-12 flex justify-center `}
          >
            <div className="bg-black text-white w-[400px] pt-8 max-w-11/12 font-mono">
              <p>{renderText}</p>
              <p className="text-green-400">_</p>
            </div>

            <div className="absolute phone:bottom-24 bottom-12   flex justify-center">
              <div
                className={`mt-4 p-4 border-white border-2 font-mono transition-opacity duration-3000 ${
                  buttonVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                Scroll to Proceed
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TerminalSimulator;
