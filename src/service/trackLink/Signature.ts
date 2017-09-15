import Member from '../../utils/Member';

export interface Opts {
  readonly ipAddress?: string;
  readonly shortUrl: string;
}

export interface Result {
  readonly longUrl: string;
}

type Signature = Member<Opts, Result>;

export default Signature;
