import { StoreOptions } from 'vuex';
import { makeDefaultApiClone, ApiSettingsType } from '../settings/default';
import { accountModule } from './stores/account.store';
import { appsModule } from './stores/apps.store';
import { registrationModule } from './stores/registration.store';
import { connectToGaiaHub } from 'blockstack';
import { GaiaHubConfig } from 'blockstack/storage';
import { StateType } from './stores/types/state';
import { identityModule } from './stores/identity.store';

function makeState(): StateType {
  return {
    sanity: {
      coreApiRunning: true,
      coreApiPasswordValid: true
    },
    settings: {
      api: makeDefaultApiClone()
    },
    meta: {
      logoutReason: ''
    }
  };
}

export const initialStore: StoreOptions<StateType> = {
  modules: {
    account: accountModule,
    apps: appsModule,
    registration: registrationModule,
    identity: identityModule
  },
  state: makeState(),
  mutations: {
    updateApi(state, newApi: Partial<ApiSettingsType>) {
      state.settings.api = Object.assign({}, state.settings.api, newApi);
    },
    setLogoutReason(state, newReason: string) {
      state.meta.logoutReason = newReason || '';
    }
  },
  actions: {
    logout({ dispatch, commit }, reason?: string) {
      commit('setLogoutReason', reason || '');
      return Promise.all([
        dispatch('account/reset'),
        dispatch('registration/reset'),
        dispatch('identity/reset'),
        dispatch('apps/reset', { justUserdata: true }),
        dispatch('resetApi')
      ]);
    },
    resetApi({ commit }) {
      // const def = makeDefaultApiClone();
      commit('updateApi', {
        gaiaHubConfig: null, // def.gaiaHubConfig,
        storageConnected: false
      });
    },
    async connectSharedService({ commit, state, getters }) {
      if(!getters['account/isLoggedIn']) throw new Error('Not logged in!');
      if(state.settings.api.storageConnected &&
        state.settings.api.gaiaHubConfig) return; // already connected
      const provider = state.settings.api.gaiaHubUrl;
      const signer = state.identity.identities[0].keyPair.key; // identityKeypairs
      return connectToGaiaHub(provider, signer).then((gaiaHubConfig: GaiaHubConfig) => {
        commit('updateApi', {
          gaiaHubConfig,
          storageConnected: true
        });
      });
    }
  },
  plugins: []
};

export default initialStore;
