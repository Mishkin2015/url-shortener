import Member from '../../utils/Member';

export interface Opts {
  readonly clientId: string;
  readonly longUrl: string;
  readonly shortUrl: string;
}

type Signature = Member<Opts, void>;

export default Signature;
