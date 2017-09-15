import { TEMPORARY_REDIRECT_307_HTTP_CODE } from '../utils/httpCodes';
import setupTests from '../utils/setupTests';

describe(__filename, () => {
  const { service, supertest } = setupTests();

  it('should return a 307 when visiting an existing short url', async () => {
    const shortUrl = 'test_short_url';
    const { id: clientId } = await service.createClient({
      lrsEndpoint: 'test_endpoint',
      lrsKey: 'test_key',
      lrsSecret: 'test_secret',
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
