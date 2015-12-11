(function() {

    YPLog.setProject('双十二返场狂减151207');

    var config;
    var agentType;
    var token;
    var from = window.location.search ? getParams(window.location.search.split("?")[1]).from : "";

    if (/O2O/.test(navigator.userAgent)) {
        agentType = "milife";
        addMiuiJSSDK();
    } else {
        agentType = "yellowpage";
    }

    function getParams(paramString) {
        var param = {};
        if (paramString.length > 0) {
            paramString = paramString.split("&");
            paramString.forEach(function(item) {
                param[item.split("=")[0]] = decodeURIComponent(item.split("=")[1]);
            })
        }
        return param;
    }

    function addMiuiJSSDK() {
        config = {
            debug: false,
            vendor: "shenghuo_xiaomi_com",
            sync: true,
            signature: "csMJwX8TiZWhtXTXuCGn3n6IKzvBORTsDMu1ZOOZ0GKsYWV1lew9bLxdTuH8GDJs5zi06Gmg+SOdjESqLnZsVNxf/Jnvxwf+Yo0qS1sY8Ts1k5q91g1X3w/kdbIGP8A98z7GsII0QHLe7QL9LXe4aIX+WUVqI3sIsTfGpl7ThVCX1/6HwFgiQtDQd15w2XK1guj/CJKNhiIC9xYG3XCplqNUZSTOKLDVY32zXOldR/EJ7NvgFRlHxHpAmwK9kZ+ybWMf2G2zcvTnbm4i6nA+OpvVgXMFdNrJDl/7k9yiTmfyDiAISmMM4jx+wd32QAifFJk8IEBHTzbITzjg4A4lNrMoz6mN4rBAT+YDKteWGL1FRiDuADMg+7sNt6cN8kNczJiEpfPqnJABma9CTIXHxjbILyGg71VCHGKZcbIo3OrlVWc4mJrZK4m6hFWlO4Dg6BLi0UiPKxTMQiqdWeaomi/2dt39DlD/YoW92RJbKwNSX31uDzalCeon92qMRuvdqe7280C0HHhV4DhH0q2d25ErNCMUhEhhqn4Tamw2dVXdvumWCyhfhhbySo5C3ykqyYV3mlM7/7/O9ztBOJUUL/KFb9ZLsC/qJwTNvJc8v7bJMMPWHHMyiRpoJvfuIYD95N6x9LnpPVFe/0V/2r6qCDwb6hkkAwuI/MH5QUzxP9g=",
            timestamp: 1534229952238,
            features: [{
                name: "callModule"
            }, {
                name: 'getLocation'
            }, {
                name: 'getToken'
            }, {
                name: 'islogin'
            }, {
                name: 'login'
            }, {
                name: 'getDeviceInfo'
            }],
            permissions: [{
                origin: "http://shenghuo.xiaomi.com"
            }, {
                origin: "https://shenghuo.xiaomi.com"
            }]
        };
        miui.config(config);
    }

    var trackMilife = function(action) {
        miui.ready(function(api) {
            token = token ? token : JSON.parse(api.getToken()).content;
            $.ajax({
                url: "/o2o/tracks",
                data: {
                    'action': action,
                    'token': token,
                },
                type: "GET",
                success: function(res) {
                    console.log('打点成功');
                }
            });
        })
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments,
                callNow = immediate && !timeout;
            var later = function() {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    }

    function callModule(type, url, title) {
        var jsonstr;
        if (type == "callThirdApp") {
            jsonstr = JSON.stringify({
                "moduleTplId": 0,
                "actions": [{
                    "actionName": "callThirdApp",
                    "actionParams": {
                        "action": "android.intent.action.VIEW",
                        "data": url
                    }
                }, {
                    "actionName": "callWebView",
                    "actionParams": {
                        "url": "http://m.app.mi.com/detail/62289?ref=yellowpage"
                    }
                }]
            });
        } else if (type == "callWebView") {
            jsonstr = JSON.stringify({
                "moduleTplId": 0,
                "actions": [{
                    "actionName": "callWebView",
                    "actionParams": {
                        "url": url
                    }
                }]
            });
        }
        try {
            ypApi.callModule({
                "jsonstr": jsonstr,
                "title": title
            })
        } catch (e) {}
    }

    $('.btns').on('click', debounce(function(e) {
        e.preventDefault();
        var $item = $(this);
        var title = $item.data("title");
        var type = $item.data("type");
        var url = $item.data("href");

        YPLog.getTrack(from + "-" + title)
        agentType == "milife" && trackMilife('click_ShuangShiEr_' + title + '_' + from);

        if (/partner.html/.test(url) && agentType == "milife") {
            miui.ready(function(api) {
                token = token ? token : JSON.parse(api.getToken()).content;
                api.getLocation({
                    success: function(data) {
                        var geolocation = JSON.parse(JSON.parse(data).content);
                        url = $item.data("url");
                        url = url + "&city=" + encodeURIComponent(geolocation.selectedCity) + "&locId=" + encodeURIComponent(geolocation.locatedLocid) + "&longitude=" + encodeURIComponent(geolocation.longitude) + "&latitude=" + encodeURIComponent(geolocation.latitude) + "&token=" + encodeURIComponent(token) + "&version=" + encodeURIComponent(JSON.parse(api.getDeviceInfo()).content.version);
                        callModule("callWebView", url, title);
                    }
                });
            });
        } else {
            callModule(type, url, title);
        }
    }, 500, true));

    ypApi.ready(function(api) {
        api.setTitle({
            title: '双十二返场狂减'
        });
        MiuiYellowPageApi.call('disablePullToRefresh');
        YPLog.getTrack('load_' + from);
        agentType == "milife" && trackMilife('load_ShuangShiEr_' + from);
    })

}());