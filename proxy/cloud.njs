const PAI_URL = 'https://pai.console.aliyun.com';
const LOCAL = 'http://localhost:3333';
const Extension_url = 'http://192.168.1.5:5000';

module.exports = {
  port: 8080,
  server_name: 'code.data.aliyun.com',
  websocket: {},
  // inject: `
  //   <script>
  //     window.ONECONSOLE_URL = "/data/api.json";
  //     _OneConsole_("", "${PAI_URL}");
  //   </script>
  // `,
  proxy: {
    '/dev': {
      target: Extension_url,
      pathRewrite: {
        '^/dev': ''
      }
    },
    '/mock': {
      target: LOCAL,
      pathRewrite: {
        '^/mock': ''
      }
    }
  },
};