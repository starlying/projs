import * as http from '../http'
import * as models from '../models'

export default class Private {
    private request: http.APIRequest

    constructor(request: http.APIRequest) {
        this.request = request
    }

    webApps(username: string, appname: string, pagename: string, cb?: (err: models.Error, res: {
        user: models.User
        app: models.App
        starred: boolean
        readme: string
        sites: Array<models.Site>
        stargazers: Array<models.User>
    }) => void) {
        this.request.get('/private/web/apps/' + username + '/' + appname + '/' + pagename, null, cb)
    }

    webStars(username: string, cb?: (err: models.Error, res: {
        user: models.User
        apps: Array<models.App>
    }) => void) {
        this.request.get('/private/web/stars/' + username, null, cb)
    }

    webUsers(username: string, cb?: (err: models.Error, res: {
        user: models.User
        apps: Array<models.App>
    }) => void) {
        this.request.get('/private/web/users/' + username, null, cb)
    }

    getUploadAvatarUrl(username: string): string {
      return this.request.getURL('/private/actions/upload_avatar/' + username)
    }
}
