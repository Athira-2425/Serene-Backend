import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext"; // ✅ import your AuthContext

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const { user } = useAuth(); // ✅ assume AuthContext gives current user
  const [completedTasks, setCompletedTasks] = useState([]);

  // Load saved progress when user changes
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`progress_${user.username || user.email}`);
      if (saved) {
        setCompletedTasks(JSON.parse(saved));
      } else {
        setCompletedTasks([]); // reset if new user
      }
    }
  }, [user]);

  // Save progress whenever tasks change
  useEffect(() => {
    if (user) {
      localStorage.setItem(
        `progress_${user.username || user.email}`,
        JSON.stringify(completedTasks)
      );
    }
  }, [completedTasks, user]);

  const markComplete = (taskName) => {
    setCompletedTasks((prev) => {
      if (prev.includes(taskName)) return prev; // avoid duplicates
      return [...prev, taskName];
    });
  };

  return (
    <ProgressContext.Provider value={{ completedTasks, markComplete }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);





