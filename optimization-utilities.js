/*!
 * Site Optimization Utilities - 2/9/20
 */

require(["lodash"], function(_) {
  _.set(window, "bsb.optutils", {

    /* ----- cleaning utilities ----- */
    convertJqueryElementNumber: function($elementToNumberify) {
      var output = 0;
      var numberString = $elementToNumberify.text().split("$")[1];
      if (numberString) {
        if (numberString.indexOf(",") > -1) {
          numberString = numberString.replace(",", "");
          output = Number(numberString);
        } else {
          output = Number(numberString);
        }
      }
      return output;
    },

    properName: function() {
      var str = utag_data.cust_name;
      var str = str
        .toLowerCase()
        .split(" ")
        .map(function(word) {
          if (word !== "") {
            return word.replace(word[0], word[0].toUpperCase());
          }
          return word;
        })
        .join(" ");

      str = str
        .split("-")
        .map(function(word) {
          if (word !== "") {
            return word.replace(word[0], word[0].toUpperCase());
          }
          return word;
        })
        .join("-");

      return str;
    },

    /* ----- cookie utilities ----- */
    //setCookie
    //$.cookie('bcp_active__scheduled_payment_enabled', 'Y', { expires: 60, path: '/' });

    forceEntryCookie: function(cname, cvalue) {
      if ($.cookie(cname) !== cvalue) {
        $.cookie(cname, cvalue, { expires: 14, path: "/" });
        if ($.cookie(cname)) {
          location.reload();
        }
      }
    },

    /* ----- DOM and timing utilities ----- */
    elementCheck: function(n) {
      return new Promise(function(e, r) {
        var t = 0,
          a = setInterval(function() {
            t < 21 ? $(n).length && (e(), clearInterval(a)) : (r(), clearInterval(a)), t++;
          }, 500);
      });
    },

    notEmpty: function(element) {
      return new Promise(function(resolve, reject) {
        var timesRun = 0;
        var intervalId = setInterval(function() {
          if (timesRun < 40) {
            if ($.trim($(element).html()) !== "") {
              clearInterval(intervalId);
              resolve();
            }
          } else {
            clearInterval(intervalId);
            reject();
          }
          timesRun++;
        }, 500);
      });
    },
    
    /* ----- misc utilities ----- */    
    detectBrowser: function() {
      var ua = navigator.userAgent,
        tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
      if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return "IE " + (tem[1] || "");
      }
      if (M[1] === "Chrome") {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null)
          return tem
            .slice(1)
            .join(" ")
            .replace("OPR", "Opera");
      }
      M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
      if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
      return M.join(" ");
    }
  });
});
