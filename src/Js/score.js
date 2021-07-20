

export default class Api {
  constructor(){
    this.key = 'zAAwpVpa5tUR3vZNDfeY';
    this.url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.key}/scores/`
  }

  async getScores() {
    const url = `${this.url}`;

    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    };
    try {
      const data = await fetch(url, options);
      const { result: scores } = await data.json();

      return scores;
    } catch (e) {
      return e;
    }
  }

  async saveScore(username, score) {
    const url = `${this.url}`;
    const scoreData = {
      user: username,
      score,
    };
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(scoreData),
    };
    try {
      const data = await fetch(url, options);
      const response = await data.json();

      return response;
    } catch (e) {
      return e;
    }
  }

}

const api = new Api();

export{api};