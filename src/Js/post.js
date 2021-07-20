const SubmitScore = (() => {
  const send = async (name, score) => {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/zAAwpVpa5tUR3vZNDfeY/scores/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: name,
        score,
      }),
    });
    const data = await response.json();
    return data;
  };
  return {
    send,
  };
})();

// eslint-disable-next-line import/prefer-default-export
export { SubmitScore };