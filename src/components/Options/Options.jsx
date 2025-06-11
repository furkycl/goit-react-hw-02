import css from "./Options.module.css";

export default function Options({ onLeaveFeedback, totalFeedback, onReset }) {
  return (
    <div className={css.wrapper}>
      <button onClick={() => onLeaveFeedback("good")}>Good</button>
      <button onClick={() => onLeaveFeedback("neutral")}>Neutral</button>
      <button onClick={() => onLeaveFeedback("bad")}>Bad</button>

      {totalFeedback > 0 && (
        <button onClick={onReset} className={css.reset}>
          Reset
        </button>
      )}
    </div>
  );
}
