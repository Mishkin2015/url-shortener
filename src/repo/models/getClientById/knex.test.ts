import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import setupTests from '../../utils/setupTests';

describe(__filename, () => {
  const { repo } = setupTests();

  it('should return an error when getting a non-existing client', async () => {
    await assertError(NoModel, repo.getClientById({ id: '1' }));
  });
});
