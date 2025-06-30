import handler from '../src/pages/api/config';
import * as notion from '../src/lib/notion';

describe('Config API', () => {
  const createMockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('returns 405 on POST', async () => {
    const req = { method: 'POST' };
    const res = createMockRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ message: 'Method not allowed' });
  });

  test('returns 500 when getNotionConfig fails', async () => {
    const req = { method: 'GET' };
    const res = createMockRes();

    jest.spyOn(notion, 'getNotionConfig').mockRejectedValue(new Error('fail'));
    jest.spyOn(notion, 'getAutomationScripts').mockResolvedValue([]);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: 'Failed to fetch configuration',
      notionSync: 'error',
    }));
  });
});
