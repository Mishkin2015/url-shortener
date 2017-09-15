import CommonRepo from 'jscommons/dist/repoFactory/Repo';
import SendStatementSignature from '../lrs/sendStatement/Signature';
import CreateClientSignature from '../models/createClient/Signature';
import CreateLinkSignature from '../models/createLink/Signature';
import GetClientByIdSignature from '../models/getClientById/Signature';
import GetLinkByShortUrlSignature from '../models/getLinkByShortUrl/Signature';

export default interface Repo extends CommonRepo {
  readonly createClient: CreateClientSignature;
  readonly createLink: CreateLinkSignature;
  readonly getLinkByShortUrl: GetLinkByShortUrlSignature;
  readonly getClientById: GetClientByIdSignature;
  readonly sendStatement: SendStatementSignature;
}
