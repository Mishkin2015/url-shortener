import Member from '../../../utils/Member';

export interface Opts {
  readonly lrsEndpoint: string;
  readonly lrsKey: string;
  readonly lrsSecret: string;
  readonly name: string;
}

export interface Result {
  readonly id: string;
}

type Signature = Member<Opts, Result>;

export default Signature;
