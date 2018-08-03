const assert = require('chai').assert;
const device = require('./lib/device');
const Browser = require('./lib/browser');

// const url = 'app://test/';
const url = 'exploreapp://venue/5b4cbb151afc8600147fef47';
const path = url.split(/:\/\/(.+)/)[1];
const fallback = 'https://vandelay.com/';
const androidPackageName = 'ind.vandelay.art';
const iosStoreLink = 'https://itunes.apple.com/us/app/art-vandelay/id556462755?mt=8&uo=4';

describe('android', () => {
  let browser;

  beforeEach(() => {
    browser = Browser(device.android);
  });

  afterEach(() => {
    browser.close();
  });

  it('should return intent on android device', done => {
    browser.go(
      url,
      {
        fallback: 'https://www.exploreapp.ca',
        android_package_name: 'com.melosh.exploreto'
      },
      res => {
        assert.equal(res, 'intent://test/#Intent;scheme=app;package=ind.vandelay.art;end;');
        done();
      }
    );
  });

  it('should return the fallback url when no package name defined in android', done => {
    browser.go(
      url,
      {
        fallback: fallback
      },
      res => {
        console.log(res);
        assert.equal(res, fallback + '/' + path);
        done();
      }
    );
  });
});

// describe('android', () => {
//   let browser;

//   beforeEach(() => {
//     browser = Browser(device.android);
//   });

//   afterEach(() => {
//     browser.close();
//   });

//   it('should return intent on android device', done => {
//     browser.go(
//       url,
//       {
//         fallback: fallback,
//         android_package_name: androidPackageName
//       },
//       res => {
//         assert.equal(
//           res,
//           'intent://test/#Intent;scheme=app;package=ind.vandelay.art;end;'
//         );
//         done();
//       }
//     );
//   });

//   it('should return the fallback url when no package name defined in android', done => {
//     browser.go(
//       url,
//       {
//         fallback: fallback
//       },
//       res => {
//         console.log(res);
//         assert.equal(res, fallback + '/' + path);
//         done();
//       }
//     );
//   });
// });

// describe('ios', () => {
//   let browser;

//   beforeEach(() => {
//     browser = Browser(device.ios);
//   });

//   afterEach(() => {
//     browser.close();
//   });

//   it('should return deeplink url on ios device', done => {
//     browser.go(
//       url,
//       {
//         fallback: fallback,
//         ios_store_link: iosStoreLink
//       },
//       res => {
//         assert.equal(res, url);
//         done();
//       }
//     );
//   });

//   it('should return the fallback url when no ios store link defined in ios', done => {
//     browser.go(
//       url,
//       {
//         fallback: fallback
//       },
//       res => {
//         assert.equal(res, fallback + '/' + path);
//         done();
//       }
//     );
//   });
// });

// describe('general', () => {
//   let browser;

//   beforeEach(() => {
//     browser = Browser();
//   });

//   afterEach(() => {
//     browser.close();
//   });

//   it('should go to fallback url on an unsupported device', done => {
//     browser.go(
//       url,
//       {
//         fallback: fallback,
//         ios_store_link: iosStoreLink,
//         android_package_name: androidPackageName
//       },
//       res => {
//         assert.equal(res, fallback + '/' + path);
//         done();
//       }
//     );
//   });
// });
