### how to build to this step

        # ionic start
        ionic start ionic2-map-leaflet tabs --v2

        # --- commit ---

        # add leaflet lib
        mkdir src/assets/images/
        cp node_modules/leaflet/dist/leaflet.css src/assets
        cp node_modules/leaflet/dist/images/* src/assets/images

        # add page to show map
        ionic g page map
        # update 'src/pages/map/*'
        # update 'src/pages/tabs/*'
        # update declarations, entryComponents in 'app.module.ts'
        # include `external` leaflet.css from assets in 'index.html'

        # --- commit ---

##### Geolocation

        # see https://ionicframework.com/docs/native/geolocation/
        npm install --save-dev --save-exact @ionic/cli-plugin-cordova@latest
        ionic cordova plugin add cordova-plugin-geolocation
        npm install --save @ionic-native/geolocation
        # update 'src/app/app.module.ts'
        # update 'src/pages/map/map.ts'
