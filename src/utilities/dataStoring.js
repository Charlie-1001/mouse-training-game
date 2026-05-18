const maxHistoryEntries = 10;

export function getHistory(historyKey) {
  try {
    return JSON.parse(localStorage.getItem(historyKey)) || [];
  } catch {
    return [];
  }
}

export function saveHistory(historyKey, history) {
  try {
    localStorage.setItem(historyKey, JSON.stringify(history));
  } catch(error) {
    console.warn('Failed to save history:', error);
  }
}

export function addScore({historyKey, score, wave, accuracy}) {
  const history = getHistory(historyKey);

  const newScore = {
    time: new Date().toLocaleString('en-US'),
    score: score,
    wave: wave,
    accuracy: accuracy,
  }

  history.unshift(newScore);
  if (history.length > maxHistoryEntries) {
    history.pop();
  }

  saveHistory(historyKey, history);
}

export function getTop3Scores(history) {
  return history
    .slice()
    .sort((a, b) => {
      if (a.wave !== b.wave) return b.wave - a.wave;
      return b.score - a.score;
    }).slice(0, 3);
}
