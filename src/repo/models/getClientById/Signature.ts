import Member from '../../../utils/Member';

export interface Opts {
  readonly id: string;
}

export interface Result {
  readonly lrsEndpoint: string;
  readonly lrsKey: string;
  readonly lrsSecret: string;
}

type Signature = Member<Opts, Result>;

export default Signature;
