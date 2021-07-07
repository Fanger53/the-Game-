// import axios from "axios";

// class Api {
//   constructor(){
//     this.key = 'zAAwpVpa5tUR3vZNDfeY';
//     this.url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.key}/scores/`
//   }

//   async postScore(data = {}) {
//     const fullData = data;
//     try {
//       const response = await axios(this.url, {
//         method: 'POST',
//         mode: 'cors',
//         headers: {
//           'content-type': 'application/json; charset=UTF-8',
//         },
//       });
//       return response.json();
//     } catch (error) {
//       throw new Error(`Could not reach the API: ${error}`);
//     }
//   }

//   async getScore() {
//     try {
//       const scoreData = await axios(this.url);
//       return scoreData.json();
//     } catch (e) {
//       throw new Error(`Could not complete request: ${e}`);
//     }
//   }

// }


// const api = new Api();
// const data = data = {
//   "user": "John Doe",
// 	"score": 42
// }
// console.log(api.postScore(data));
// export default api;