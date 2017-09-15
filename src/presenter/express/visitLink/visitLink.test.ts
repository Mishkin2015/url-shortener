import { TEMPORARY_REDIRECT_307_HTTP_CODE } from '../utils/httpCodes';
import setupTests from '../utils/setupTests';

describe(__filename, () => {
  const { service, supertest } = setupTests();

  it('should return a 307 when visiting an existing short url', async () => {
    const shortUrl = 'test_short_url';
    const { id: clientId } = await service.createClient({
      lrsEndpoint: 'http://devv2.learninglocker.net/data/xAPI',
      lrsKey: '77a26a0be679a55d29e40203b1e10088c8986ce6',
      lrsSecret: 'f3c9e544128390af43b8baa80b24b4cabfe9aee6',
      name: 'test_client',
    });
    await service.createLink({
      clientId,
      longUrl: 'http://www.example.org',
      shortUrl,
    });
    await supertest
      .get(`/${shortUrl}`)
      .expect(TEMPORARY_REDIRECT_307_HTTP_CODE);
  });
});
