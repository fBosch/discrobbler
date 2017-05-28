import Vue from 'vue'
import store from '../../store'
import { Component, Watch } from 'vue-property-decorator'
import { fetchUser } from '../../store/actions/discogs.actions'
import router, { views } from '../../router'
import get from 'lodash.get'
import keys from '../../keys'
import lastfm from '../../api/lastfm'
import { setLastfmAuthenticationToken, getWebSession } from '../../store/actions/lastfm.actions'
import queryString from 'query-string'

@Component
export default class Login extends Vue {
    discogsUsername = null
    lastfmSession = store.getState().lastfm.websession

    mounted() {
        const parsedQueryString = queryString.parse(location.search)
        if (router.currentRoute.name === 'authenticate' && parsedQueryString.token !== null) {
            switch (router.currentRoute.params.auth) {
                case 'lastfm':
                    store.dispatch(setLastfmAuthenticationToken(parsedQueryString.token))
                    window.location = location.origin + '/login'
                    break;
            }
        }

        const lastfmToken = store.getState().lastfm.authenticationToken
        const lastfmSession = store.getState().lastfm.websession
        if (lastfmToken && !lastfmSession) store.dispatch(getWebSession(lastfmToken))

        let currentDiscogsUserValue = store.getState().discogs.user
        const observer = () => {
            let previousUserValue = currentDiscogsUserValue
            currentDiscogsUserValue = store.getState().discogs.user

            if (previousUserValue !== currentDiscogsUserValue && currentDiscogsUserValue !== null) {
                router.push(views.dashboard)
            }
            this.lastfmSession = store.getState().lastfm.websession
        }
        this.beforeDestroy = store.subscribe(observer)
    }

    authorizeLastfm() {
        lastfm.authenticateUser()
    }

    getUser() {
        store.dispatch(fetchUser(this.discogsUsername))
    }

}
