it('环境测试', () => {
  expect(Game).toBeDefined();
  expect(_).toBeDefined();
  expect(Memory).toMatchObject({ rooms: {}, creeps: {} });
});
