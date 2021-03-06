import { SubmitScore } from '../Js/post';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({ scores: { user: 'Leo', score: 100 } }),
}));

beforeAll(() => {
  global.fetch = () => Promise.resolve({
    json: () => Promise.resolve('Leaderboard score created correctly.'),
  });
});

it('submits the player score to the leaderboard', () => {
  SubmitScore.send('PlayerOne', 0)
    .then((response) => {
      expect(response).toBe('Leaderboard score created correctly.');
    });
});