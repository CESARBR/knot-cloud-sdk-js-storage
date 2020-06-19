import HTTP from './network/HTTP';

export default class Client {
  constructor(config) {
    this.http = new HTTP(config);
  }

  async listData(query) {
    return this.http.get('/data', query);
  }

  async listDataByDevice(thingId, query) {
    return this.http.get(`/data/${thingId}`, query);
  }

  async listDataBySensor(thingId, sensorId, query) {
    return this.http.get(`/data/${thingId}/sensor/${sensorId}`, query);
  }
}
