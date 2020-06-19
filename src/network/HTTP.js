import axios from 'axios';

export default class HTTP {
  constructor({
    protocol = 'https',
    hostname = 'storage.knot.cloud',
    port = 443,
    pathname = '',
    token,
  }) {
    if (protocol !== 'http' && protocol !== 'https') {
      throw new Error("invalid protocol: must be either 'https' or 'http'");
    }

    if (!token) {
      throw new Error('access token not provided');
    }

    this.baseUrl = `${protocol}://${hostname}:${port}${pathname}`;
    this.header = {
      auth_token: token,
    };
  }

  async get(path, data) {
    const config = {
      url: `${this.baseUrl}${path}`,
      method: 'GET',
      headers: this.header,
      params: data,
    };

    return axios(config)
      .then((res) => res.data || JSON.parse(res.config.data))
      .catch((err) => this.handleError(err));
  }

  async handleError(r) {
    /*
     * Reject with a detailed error if the response was correctly received.
     * Otherwise, reject with an unexpected error.
     */
    const props = r.response
      ? { message: r.response.data.message, code: r.response.status }
      : { message: r.message, code: 500 };
    const error = Error(props.message);
    error.code = props.code;
    return Promise.reject(error);
  }
}
