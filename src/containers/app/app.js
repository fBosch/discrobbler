import Vue from 'vue'
import store from '../../store'
import router, { views } from '../../router'
import Component from 'vue-class-component'
import get from 'lodash.get'
import { Watch } from 'vue-property-decorator'
import * as pageActions from '../../store/actions/page.actions'

@Component
export default class App extends Vue {
    avatar = null
    discogsName = null
    discogsUsername = null
    lastfmUsername = null
    toolbarColor = null
    discogsAuthenticated = false

    created() {
        const initialDiscogsUserState = store.getState().discogs.user
        if (initialDiscogsUserState && router.currentRoute.path === '/') {
            router.push(views.dashboard)
        }
    }

    mounted() {
        this.updateViewStateFromStore()
        this.beforeDestroy = store.subscribe(this.updateViewStateFromStore)
    }

    get currentRouteName() {
        return router.currentRoute.name
    }

    static proccessScrobbleQueue() {

    }

    updateViewStateFromStore() {
        const currentDiscogsUserState = store.getState().discogs.user
        if (currentDiscogsUserState) {
            if (this.avatar !== currentDiscogsUserState.avatar_url) {
                this.avatar = currentDiscogsUserState.avatar_url
                this.discogsName = currentDiscogsUserState.name
                this.discogsUsername = currentDiscogsUserState.username
            }
        }
        if (store.getState().discogs.authenticated !== this.discogsAuthenticated) {
            this.discogsAuthenticated = store.getState().discogs.authenticated
        }

        const currentLastfmWebsession = store.getState().lastfm.session 
        if (currentLastfmWebsession) {
            this.lastfmUsername = currentLastfmWebsession.name
        } else {
            this.lastfmUsername = null
        }
        
        if ((!this.discogsAuthenticated || !currentLastfmWebsession) && router.currentRoute.name !== 'authenticate') {
            router.push(views.login)
        }

        const toolbarColor = store.getState().page.toolbarColor
        if (toolbarColor !== this.toolbarColor) {
            this.toolbarColor = toolbarColor
        }
    }

    toggleLeftSidenav() {
        this.$refs.leftSidenav.toggle()
    }

    openDiscogsProfile() {
        window.open(`https://www.discogs.com/user/${this.discogsUsername}`, '_blank').focus()
   }

   openLastfmProfile() {
       window.open(`https://www.last.fm/user/${this.lastfmUsername}`, '_blank').focus()
   }
}