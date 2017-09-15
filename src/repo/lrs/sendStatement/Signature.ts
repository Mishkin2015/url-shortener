import Member from '../../../utils/Member';

export interface Opts {
  readonly statement: any;
  readonly lrsEndpoint: string;
  readonly lrsKey: string;
  readonly lrsSecret: string;
}

type Signature = Member<Opts, void>;

export default Signature;
