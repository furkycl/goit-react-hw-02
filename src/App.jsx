import { useEffect, useState } from "react";
import Section from "./components/Section/Section";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";

const FEEDBACK_KEY = "feedback-data";

function App() {
  const [feedback, setFeedback] = useState(() => {
    const storedData = localStorage.getItem(FEEDBACK_KEY);
    return storedData
      ? JSON.parse(storedData)
      : { good: 0, neutral: 0, bad: 0 };
  });

  useEffect(() => {
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (type) => {
    setFeedback((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positivePercentage = totalFeedback
    ? Math.round((feedback.good / totalFeedback) * 100)
    : 0;

  return (
    <main className="center">
      <h1>Sip Happens Café</h1>

      <Section title="Please leave your feedback about our service by selecting one of the options below.">
        <Options
          onLeaveFeedback={updateFeedback}
          totalFeedback={totalFeedback}
          onReset={resetFeedback}
        />
      </Section>

      <Section title="Statistics">
        {totalFeedback > 0 ? (
          <Feedback
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={totalFeedback}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback yet." />
        )}
      </Section>
    </main>
  );
}

export default App;
