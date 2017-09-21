import catchErrors from 'jscommons/dist/expressPresenter/utils/catchErrors';
import { getClientIp } from 'request-ip';
import * as useragent from 'useragent';
import Config from '../utils/Config';
import { TEMPORARY_REDIRECT_307_HTTP_CODE } from '../utils/httpCodes';

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
    const shortUrl = req.params.shortUrl;
    const ipAddress = getClientIp(req);
    const userAgentHeader = req.header('user-agent');
    const userAgent = useragent.parse(userAgentHeader);
    const { longUrl } = await config.service.trackLink({ ipAddress, shortUrl, userAgent });
    res.redirect(TEMPORARY_REDIRECT_307_HTTP_CODE, longUrl);
  });
};
