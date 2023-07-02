import React, { useState, useEffect } from "react";
import { render } from "react-dom";

const TerminalSimulator = () => {
  const introductionText = `Hello,
      
      Welcome to our manifestation portal, here you can materialize
      anything you want to create, simply by willing it into action.
      
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
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let currentIdea = currentIndex % ideas.length;
    let fullText = introductionText + ideas[currentIdea];
    let timeoutLength = isDeleting ? 10 : 30; // Speed up when deleting

    const timerId = setTimeout(() => {
      if (!isDeleting && typedText === fullText) {
        // If we're not currently deleting and the full text has been typed out, start deleting
        setIsDeleting(true);
      } else if (isDeleting && typedText === introductionText) {
        // If we're currently deleting and all characters have been deleted, move to the next text and start typing
        setIsDeleting(false);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        // Type or delete characters
        setTypedText((prevText) =>
          isDeleting
            ? prevText.slice(0, prevText.length - 1)
            : prevText + fullText[prevText.length]
        );
      }
    }, timeoutLength);

    return () => clearTimeout(timerId); // Clear timeout on unmount
  }, [typedText, isDeleting, introductionText, ideas, currentIndex]);

  const renderText = typedText.split("\n").map((item, key) => {
    return (
      <span key={key}>
        {item}
        <br />
      </span>
    );
  });

  return (
    <div className="bg-black text-white rounded w-[400px] p-8 max-w-11/12 font-mono">
      <p>{renderText}</p>
      <p className="text-green-400">_</p>
    </div>
  );
};

export default TerminalSimulator;
