describe('initial score must be 0', () => {
  const score = 0;
  test('score equal to 0', () => {
    expect(score).toBe(0);
  });
});

describe('initial score must not be 0', () => {
  const score = 100;
  test('score not equal to 0', () => {
    expect(score).not.toBe(0);
  });
});