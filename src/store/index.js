import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    features: [],
    featuresTitle: '',
    load: false,
  },
  getters: {
    features: t => t.features,
    featuresTitle: t => t.featuresTitle,
    load: t => t.load
  },
  mutations: {
    SET_FEATURES(state, features) {
      this.state.features = features
    },
    SET_FEATURES_TITLE(state, title) {
      this.state.featuresTitle = title
    },
    CHANGE_FEATURES(state, feature) {
      this.state.features.forEach(el => {
        if (el.sorting >= 1) {
          el.sorting += 1
        }
      });

      this.state.features.push(feature)
      this.state.features.sort((a, b) => a.sorting - b.sorting)
    },
    LOAD(state, load) {
      this.state.load = load
    }
  },
  actions: {
    async getFeatures({commit}) {
      try {
        commit('LOAD', true)
        const response = await axios.post('https://test-task-frontend-2023.slava.digital') 
        
        if (response.status === 200) {
          const features = response.data.features.filter(el => el.model_name === 'Figaro' && el.description && el.image).sort((a, b) => a.sorting - b.sorting)
          const featuresTitle =  response.data.block_heading
          
          setTimeout(()=> {
            commit('SET_FEATURES', features)
            commit('SET_FEATURES_TITLE', featuresTitle)
            commit('LOAD', false)
          }, 500)
        }
      } catch (error) {
        console.log('error', error)
        commit('LOAD', false)
      }
    },
    addFeature({commit}, feature) {
      commit('CHANGE_FEATURES', feature)
    }
  }
})
