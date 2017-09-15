import * as btoa from 'btoa';
import fetch from 'node-fetch';
import Config from '../utils/FetchConfig';
import Signature from './Signature';

const OK_200_HTTP_CODE = 200;

export default (_config: Config): Signature => {
  return async ({ lrsEndpoint, lrsKey, lrsSecret, statement }) => {
    const base64Auth = btoa(`${lrsKey}:${lrsSecret}`);
    const res = await fetch(`${lrsEndpoint}/statements`, {
      body: JSON.stringify(statement),
      headers: {
        Authorization: `Basic ${base64Auth}`,
        'Content-Type': 'application/json; charset=utf-8',
        'X-EXPERIENCE-API-VERSION': '1.0.0',
      },
      method: 'POST',
    });

    /* istanbul ignore next */
    if (res.status !== OK_200_HTTP_CODE) {
      throw new Error('Failed to send statement');
    }
  };
};
