const { createMocks } = require('node-mocks-http');
const { default: handler } = require('../src/pages/api/config');

jest.mock('../src/lib/notion', () => ({
  getNotionConfig: jest.fn().mockResolvedValue({}),
  getAutomationScripts: jest.fn().mockResolvedValue([
    {
      properties: {
        'Script Name': { title: [{ text: { content: 'Demo' } }] },
        'Script Type': { select: { name: 'Batch' } },
        'Frequency': { select: { name: 'Daily' } },
        'Language': { select: { name: 'Python' } }
      }
    }
  ])
}));

test('returns configuration object', async () => {
  const { req, res } = createMocks({ method: 'GET' });
  await handler(req, res);
  expect(res._getStatusCode()).toBe(200);
  const data = res._getJSONData();
  expect(data).toHaveProperty('platform');
  expect(Array.isArray(data.activeScripts)).toBe(true);
});
