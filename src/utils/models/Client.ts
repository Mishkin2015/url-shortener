export default interface Client {
  readonly id: string;
  readonly name: string;
  readonly lrsEndpoint: string;
  readonly lrsKey: string;
  readonly lrsSecret: string;
}
