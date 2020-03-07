/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1582980507110_7562';

  // add your middleware config here
  config.middleware = [];

  config.mysql = {
    // database configuration 
    client: {
      // host
      host: 'localhost', 
      // port
      port: '3306',
      // username 
      user: 'root',
      // password
      password: 'gaowei110',
      // database
      database: 'react_blog',  
    }, 
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  // config.session = {  
  //   key: 'EGG_SESS',
  //   maxAge:  1000, // 1 天  
  //   httpOnly: true, 
  //   encrypt: true,
  // };
  config.security = { 
    　　　　csrf: {enable: false},
    　　　　domainWhiteList: [ '*' ]
    　　};
  config.cors = {
    origin: 'http://localhost:3000', 
    credentials: true, 
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  }; 
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
