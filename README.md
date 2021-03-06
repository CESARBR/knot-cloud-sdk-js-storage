# knot-cloud-sdk-js-storage

KNoT Cloud storage service JavaScript library

# Quickstart

## Install

```console
npm install --save @cesarbr/knot-cloud-sdk-js-storage
```

## Run

`KNoTCloudStorage` connects to &lt;protocol&gt;://&lt;hostname&gt;:&lt;port&gt; using user or gateway credentials (device owner). Replace this address with your storage instance and the credentials with valid ones.

```javascript
const KNoTCloudStorage = require('@cesarbr/knot-cloud-sdk-js-storage');
const client = new KNoTCloudStorage({
  protocol: 'https',
  hostname: 'data.knot.cloud',
  id: 'b1a1bd58-c3ef-4cb5-82cd-3a2e0b38dd21',
  token: '3185a6c9d64915f6b468ee8043df4af5f08e1933',
});
```

# Methods

## constructor(options)

Creates a new client storage instance so that you can operate on storage.

### Arguments
- `options` **Object** JSON object.
  * `protocol` **String** (Optional) Either `'http'` or `'https'`. Default: `'https'`.
  * `hostname` **String** KNoT Cloud storage instance host name.
  * `port` **Number** (Optional) KNoT Cloud storage instance port. Default: 443.
  * `pathname` **String** (Optional) Path name on the server.
  * `id` **String** Device owner ID.
  * `token` **Number** Device owner token.

### Example

```javascript
const KNoTCloudStorage = require('@cesarbr/knot-cloud-sdk-js-storage');
const client = new KNoTCloudStorage({
  protocol: 'https',
  hostname: 'data.knot.cloud',
  id: 'b1a1bd58-c3ef-4cb5-82cd-3a2e0b38dd21',
  token: '3185a6c9d64915f6b468ee8043df4af5f08e1933',
});
```

## listData(query): &lt;Array&gt;

Get all the device data messages.

### Arguments
- `query` **Object** Optional properties used to filter data.
  * `orderBy` **String** The field used to order.
  * `order` **Number** Ascending (1) or descending (-1) order, default=1.
  * `skip` **Number** The number of data to skip (returns skip + 1), default=0.
  * `take` **Number** The maximum number of data that you want from skip + 1 (the number is limited to 100), default=10.
  * `startDate` **String** The start date that you want your set of data (format=YYYY-MM-DD HH:MM:SS).
  * `endDate` **String** The finish date that you want your set of data (format=YYYY-MM-DD HH:MM:SS).

### Result
- `messages` **Array** JSON object containing device data messages.

### Example

```javascript
const KNoTCloudStorage = require('@cesarbr/knot-cloud-sdk-js-storage');

async function main() {
    const client = new KNoTCloudStorage({
      protocol: 'https',
      hostname: 'data.knot.cloud',
      id: 'b1a1bd58-c3ef-4cb5-82cd-3a2e0b38dd21',
      token: '3185a6c9d64915f6b468ee8043df4af5f08e1933',
    });

    try {
      console.log(await client.listData());
    } catch (err) {
      if (err.response) {
        console.error(err.response.data.message);
        return;
      }
      console.error(err);
    }
}
main();

// [{
//   from: '188824f0-28c4-475b-ab36-2505402bebcb',
//   payload: {
//       sensorId: 2,
//       value: 234,
//   },
//   timestamp: '2019-03-18T12:48:05.569Z',
// },
// {
//   from: '188824f0-28c4-475b-ab36-2505402bebcb',
//   payload: {
//       sensorId: 1,
//       value: true,
//   },
//   timestamp: '2019-03-18T14:42:03.192Z',
// }]
```

## listDataByDevice(id, query): &lt;Array&gt;

Get the messages sent by a specific device.

### Arguments
- `id` **String** Device ID.
- `query` **Object** Optional properties used to filter data.
  * `orderBy` **String** The field used to order.
  * `order` **Number** Ascending (1) or descending (-1) order, default=1.
  * `skip` **Number** The number of data to skip (returns skip + 1), default=0.
  * `take` **Number** The maximum number of data that you want from skip + 1 (the number is limited to 100), default=10.
  * `startDate` **String** The start date that you want your set of data (format=YYYY-MM-DD HH:MM:SS).
  * `endDate` **String** The finish date that you want your set of data (format=YYYY-MM-DD HH:MM:SS).


### Result
- `messages` **Array** JSON object containing device data messages.

### Example

```javascript
const KNoTCloudStorage = require('@cesarbr/knot-cloud-sdk-js-storage');

async function main() {
    const client = new KNoTCloudStorage({
      protocol: 'https',
      hostname: 'data.knot.cloud',
      id: 'b1a1bd58-c3ef-4cb5-82cd-3a2e0b38dd21',
      token: '3185a6c9d64915f6b468ee8043df4af5f08e1933',
    });

    try {
      console.log(await client.listDataByDevice('4dd0db709e111465'));
    } catch (err) {
      if (err.response) {
        console.error(err.response.data.message);
        return;
      }
      console.error(err);
    }
}
main();

// [ { from: '4dd0db709e111465',
//     payload: { sensorId: 1, value: true },
//     timestamp: '2019-06-06T20:58:55.112Z' },
//   { from: '4dd0db709e111465',
//     payload: { sensorId: 1, value: true },
//     timestamp: '2019-06-12T15:54:54.762Z' },
//   { from: '4dd0db709e111465',
//     payload: { sensorId: 1, value: true },
//     timestamp: '2019-06-13T16:47:57.280Z' } ]
```

## listDataBySensor(deviceId, sensorId, query): &lt;Array&gt;

Get the messages sent by a specific device's sensor.

### Arguments
- `deviceId` **String** Device ID.
- `sensorId` **Number** Sensor ID.
- `query` **Object** Optional properties used to filter data.
  * `orderBy` **String** The field used to order.
  * `order` **Number** Ascending (1) or descending (-1) order, default=1.
  * `skip` **Number** The number of data to skip (returns skip + 1), default=0.
  * `take` **Number** The maximum number of data that you want from skip + 1 (the number is limited to 100), default=10.
  * `startDate` **String** The start date that you want your set of data (format=YYYY-MM-DD HH:MM:SS).
  * `endDate` **String** The finish date that you want your set of data (format=YYYY-MM-DD HH:MM:SS).

### Result
- `messages` **Array** JSON object containing device's sensor data messages.

### Example

```javascript
const KNoTCloudStorage = require('@cesarbr/knot-cloud-sdk-js-storage');

async function main() {
    const client = new KNoTCloudStorage({
      protocol: 'https',
      hostname: 'data.knot.cloud',
      id: 'b1a1bd58-c3ef-4cb5-82cd-3a2e0b38dd21',
      token: '3185a6c9d64915f6b468ee8043df4af5f08e1933',
    });

    try {
      console.log(await client.listDataBySensor('4dd0db709e111465', 1));
    } catch (err) {
      if (err.response) {
        console.error(err.response.data.message);
        return;
      }
      console.error(err);
    }
}
main();

// [ { from: '4dd0db709e111465',
//     payload: { sensorId: 1, value: true },
//     timestamp: '2019-06-06T20:58:55.112Z' },
//   { from: '4dd0db709e111465',
//     payload: { sensorId: 1, value: true },
//     timestamp: '2019-06-12T15:54:54.762Z' },
//   { from: '4dd0db709e111465',
//     payload: { sensorId: 1, value: true },
//     timestamp: '2019-06-13T16:47:57.280Z' } ]
```