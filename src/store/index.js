import Vue from 'vue';
import Vuex from 'vuex';
import camelCase from 'lodash/camelCase';

Vue.use(Vuex);

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
  });

  const requiredModules = require.context('.', true, /module-[\w-]+$/);
  requiredModules.keys().forEach((modulePath) => {
    const name = camelCase(modulePath.replace(/\.\/module-/, ''));
    const moduleObj = requiredModules(modulePath).default;
    Store.registerModule(name, moduleObj);
  });

  return Store;
}
