var StorageManager = function() {


    // cookies storage implementation
    cookieStorage = function () {
         this.getItem = function (sKey, callback) {  
            if (!sKey || !this.hasItem(sKey)) { return null; }  
            callback(unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1")));  
          },  
          /** 
          * docCookies.setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) 
          * 
          * @argument sKey (String): the name of the cookie; 
          * @argument sValue (String): the value of the cookie; 
          * @optional argument vEnd (Number, String, Date Object or null): the max-age in seconds (e.g., 31536e3 for a year) or the 
          *  expires date in GMTString format or in Date Object format; if not specified it will expire at the end of session;  
          * @optional argument sPath (String or null): e.g., "/", "/mydir"; if not specified, defaults to the current path of the current document location; 
          * @optional argument sDomain (String or null): e.g., "example.com", ".example.com" (includes all subdomains) or "subdomain.example.com"; if not 
          * specified, defaults to the host portion of the current document location; 
          * @optional argument bSecure (Boolean or null): cookie will be transmitted only over secure protocol as https; 
          * @return undefined; 
          **/  
          this.setItem = function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {  
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/.test(sKey)) { return; }  
            var sExpires = "";  
            if (vEnd) {  
              switch (typeof vEnd) {  
                case "number": sExpires = "; max-age=" + vEnd; break;  
                case "string": sExpires = "; expires=" + vEnd; break;  
                case "object": if (vEnd.hasOwnProperty("toGMTString")) { sExpires = "; expires=" + vEnd.toGMTString(); } break;  
              }  
            }  
            document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");  
          },  
          this.removeItem = function (sKey) {  
            if (!sKey || !this.hasItem(sKey)) { return; }  
            var oExpDate = new Date();  
            oExpDate.setDate(oExpDate.getDate() - 1);  
            document.cookie = escape(sKey) + "=; expires=" + oExpDate.toGMTString() + "; path=/";  
          },  
          this.hasItem = function (sKey) { return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie); }  

    };

    // HTML5 storage implementation 
    html5Storage = function () {
        this.setItem = function(key, value) {
            localStorage.setItem(key, value);
        };

        this.getItem = function(key, callback) {
            var value = localStorage.getItem(key);
            callback(value);
        };
        this.removeItem = function (key) {
            localStorage.removeItem(key);
        }
    }

    // chrome storage implementation 
    chromeAppStorage = function () {
        this.getItem = function(item, callback) {
            chrome.storage.local.get(item, function(obj) { callback(obj); });
        };
        this.setItem = function(item, value) {
            chrome.storage.local.set({item : value}, function() { });
        };
        this.removeItem = function(item) {
            chrome.storage.local.remove(item, function() {
            });
        };        
    }


    this.html5StorageSupported =  false; 
    this.chromeStorageSupported =  false; 
    try {
        this.html5StorageSupported = 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        this.html5StorageSupported = false;
    }

    try {
        this.chromeStorageSupported = chrome != null && chrome.storage != null && chrome.storage.local != nlll;
    } catch (e) {
        this.chromeStorageSupported = false;
    }

    this.storageImplementation = null;
    if (this.chromeStorageSupported)
        this.storageImplementation = new chromeAppStorage();
    else if (this.html5StorageSupported)
        this.storageImplementation = new html5Storage();
    else 
        this.storageImplementation = new cookieStorage();


    this.set = function(obj) {
        for (var key in obj) {
            this.storageImplementation.setItem(key, obj[key]);
        }
    };

    this.get = function(item, callback) {
        this.storageImplementation.getItem(item, function (value) {
            var obj = {};
            if (value != null)
                obj[item] = value;
            callback(obj);
        });
    };

    this.remove = function(item) {
        this.storageImplementation.removeItem(item);
    };    
};
