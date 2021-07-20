const GetScore = (() => {
  const all = async () => {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/zAAwpVpa5tUR3vZNDfeY/scores/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    return data;
  };
  return {
    all,
  };
})();

// eslint-disable-next-line import/prefer-default-export
export { GetScore };