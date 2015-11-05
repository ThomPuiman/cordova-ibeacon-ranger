(function (global) {
    var beacon = {
        log: function(msg) {
            cordova.plugins.locationManager.appendToDeviceLog(msg);

            //var e = document.createElement('label');
            //e.innerText = msg;

            //var br = document.createElement('br');
            //var br2 = document.createElement('br');
            //document.body.appendChild(e);
            //document.body.appendChild(br);
            //document.body.appendChild(br2);

            //window.scrollTo(0, window.document.height);
        },
        initRanging: function() {
            cordova.plugins.locationManager.setDelegate(beacon.getDelegate());

            // required in iOS 8+
            cordova.plugins.locationManager.requestWhenInUseAuthorization();
            // or cordova.plugins.locationManager.requestAlwaysAuthorization()

            cordova.plugins.locationManager.startRangingBeaconsInRegion(beacon.getBeacon())
                .fail(console.error)
                .done();
        },
        getBeacon: function() {
            var uuid = "B9407F30-F5F8-466E-AFF9-25556B57FE6D";
            var identifier = 'someRandomIdentifier';
            return new cordova.plugins.locationManager.BeaconRegion(identifier, uuid);
        },
        getDelegate: function() {
            var delegate = new cordova.plugins.locationManager.Delegate();

            delegate.didDetermineStateForRegion = beacon.didDetermineStateForRegion;
            delegate.didStartMonitoringForRegion = beacon.didStartMonitoringForRegion;
            delegate.didRangeBeaconsInRegion = beacon.didRangeBeaconsInRegion;

            return delegate;
        },
        didDetermineStateForRegion: function (pluginResult) {
            beacon.log('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
        },
        didStartMonitoringForRegion: function (pluginResult) {
            beacon.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
        },
        didRangeBeaconsInRegion: function (pluginResult) {
            beacon.log('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
        }

    };

    global.beacon = beacon;
})(window);