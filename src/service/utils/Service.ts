import CommonSerice from 'jscommons/dist/serviceFactory/Service';
import CreateClientSignature from '../createClient/Signature';
import CreateLinkSignature from '../createLink/Signature';
import TrackLinkSignature from '../trackLink/Signature';

export default interface Service extends CommonSerice {
  readonly createClient: CreateClientSignature;
  readonly createLink: CreateLinkSignature;
  readonly trackLink: TrackLinkSignature;
}
