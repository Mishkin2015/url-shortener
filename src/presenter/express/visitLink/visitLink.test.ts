import {
  NOT_FOUND_404_HTTP_CODE,
  TEMPORARY_REDIRECT_307_HTTP_CODE,
} from '../utils/httpCodes';
import setupTests from '../utils/setupTests';

const TEST_SHORT_URL = 'test_short_url';

describe(__filename, () => {
  const { service, supertest } = setupTests();

  it('should return a 307 when visiting an existing short url', async () => {
    const { id: clientId } = await service.createClient({
      lrsEndpoint: 'test_endpoint',
      lrsKey: 'test_key',
      lrsSecret: 'test_secret',
      name: 'test_client',
    });
    await service.createLink({
      clientId,
      longUrl: 'http://www.example.org',
      shortUrl: TEST_SHORT_URL,
    });
    await supertest
      .get(`/${TEST_SHORT_URL}`)
      .expect(TEMPORARY_REDIRECT_307_HTTP_CODE);
  });

  it('should return a 404 when the short URL does not exist', async () => {
    await supertest
      .get(`/${TEST_SHORT_URL}`)
      .expect(NOT_FOUND_404_HTTP_CODE);
  });
});
