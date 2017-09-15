import Member from '../../../utils/Member';

export interface Opts {
  readonly shortUrl: string;
}

export interface Result {
  readonly clientId: string;
  readonly longUrl: string;
}

type Signature = Member<Opts, Result>;

export default Signature;
