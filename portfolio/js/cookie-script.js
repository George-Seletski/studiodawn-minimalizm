/*@cc_on;document.querySelectorAll||(document.querySelectorAll=function(e){var t,c=document.createElement('style'),i=[];for(document.documentElement.firstChild.appendChild(c),document._qsa=[],c.styleSheet.cssText=e+'{x-qsa:expression(document._qsa && document._qsa.push(this))}',window.scrollBy(0,0),c.parentNode.removeChild(c);document._qsa.length;)(t=document._qsa.shift()).style.removeAttribute('x-qsa'),i.push(t);return document._qsa=null,i}),document.querySelector||(document.querySelector=function(e){var c=document.querySelectorAll(e);return c.length?c[0]:null});@*/ !(function() {
    var c = function(e) {
            return e.replace(/^\s+|\s+$/g, "");
        },
        t = function(e) {
            return new RegExp("(^|\\s+)" + e + "(\\s+|$)");
        },
        i = function(e, c, t) {
            for (var i = 0; i < e.length; i++) c.call(t, e[i]);
        };

    function e(e) {
        this.element = e;
    }
    (e.prototype = {
        add: function() {
            i(
                arguments,
                function(e) {
                    this.contains(e) ||
                        (this.element.className = c(this.element.className + " " + e));
                },
                this
            );
        },
        remove: function() {
            i(
                arguments,
                function(e) {
                    this.element.className = c(this.element.className.replace(t(e), " "));
                },
                this
            );
        },
        toggle: function(e) {
            return this.contains(e) ? (this.remove(e), !1) : (this.add(e), !0);
        },
        contains: function(e) {
            return t(e).test(this.element.className);
        },
        item: function(e) {
            return this.element.className.split(/\s+/)[e] || null;
        },
        replace: function(e, c) {
            this.remove(e), this.add(c);
        },
    }),
    "classList" in Element.prototype ||
        Object.defineProperty(Element.prototype, "classList", {
            get: function() {
                return new e(this);
            },
        }),
        window.DOMTokenList &&
        !DOMTokenList.prototype.replace &&
        (DOMTokenList.prototype.replace = e.prototype.replace);
})();
Array.prototype.indexOf ||
    (Array.prototype.indexOf = function(e, c) {
        "use strict";
        var t;
        if (null == this) throw new TypeError('"this" is null or not defined');
        var o = Object(this),
            n = o.length >>> 0;
        if (0 === n) return -1;
        var i = 0 | c;
        if (i >= n) return -1;
        for (t = Math.max(i >= 0 ? i : n - Math.abs(i), 0); t < n; t++)
            if (t in o && o[t] === e) return t;
        return -1;
    });
if (!(!!CookieScript && !!CookieScript.instance)) {
    var CookieScript = function() {
        this.version = "20211221";
        this.onAcceptAll = function() {};
        this.onAccept = function() {};
        this.onReject = function() {};
        this.onClose = function() {};
        this.currentState = function() {
            var e = { action: r("action") };
            var c = r("key");
            if (c) {
                e.key = c;
            }
            e.categories = y();
            return e;
        };
        this.expireDays = function() {
            return fe;
        };
        this.hash = function() {
            return he;
        };
        this.show = function() {
            L();
        };
        this.hide = function() {
            l();
            m();
        };
        this.categories = function() {
            return i;
        };
        this.getCookieValueForQueryArg = function() {
            var e = b(),
                t = c.get(e);
            if (t) {
                return e + "=" + encodeURIComponent(t);
            }
            return "";
        };
        this.dispatchEventNames = [];
        this.currentLang = null;
        this.iabCMP = null;
        this.getCMPId = function() {
            return Number(ue);
        };
        this.getIABSdkUrl = function() {
            return ke;
        };
        this.getIABText = function() {
            return be;
        };
        this.getIABTextTranslations = function() {
            return we;
        };
        this.showIABSpecificTab = function(e) {
            return !1;
        };
        this.setCMPCookie = function(e) {
            n("CMP", e);
        };
        this.getCMPCookie = function() {
            return r("CMP");
        };
        this.forceDispatchCSLoadEvent = function() {
            d("CookieScriptLoaded");
        };
        this.applyTranslation = function(e) {
            z(e);
        };
        this.applyCurrentCookiesState = function() {
            q();
        };
        this.applyTranslationByCode = function(e, c) {
            if (c === undefined) {
                c = {
                    rebuildIab: !!document.querySelector(
                        'div[data-cs-maintab-content="setting_advertising"]'
                    ),
                };
            }
            xe(e, c);
        };
        this.acceptAllAction = function() {
            te(!0);
            var c = "acceptall",
                e = N(i);
            l();
            n("action", "accept");
            p();
            I(i);
            C(i);
            n("categories", JSON.stringify(e));
            k(!0);
            u(!0);
            A("accept", e.join(","));
            h(c, "");
            v(!0);
            m();
            oc();
            O();
            E();
            R("selectAll");
        };
        this.acceptAction = function(e) {
            var c;
            if (typeof e === "undefined") {
                c = cc();
                I(c);
            } else {
                if (X) {
                    e.push("strict");
                }
                c = f(e);
                ie(c);
            }
            var t = N(c);
            if (c.length === i.length) {
                p();
                k(!0);
                u(!0);
            } else {
                p(c);
                k(!0, c);
                u(!0, c);
            }
            C(c);
            g(c);
            if (t.length > 0) {
                n("action", "accept");
                n("categories", JSON.stringify(t));
                A("accept", t.join(","));
                h("accept", t.join(","));
            } else {
                n("action", "reject");
                n("categories", []);
                A("reject", "");
                h("reject", "");
            }
            R("setOnlyChecked");
            l();
            v(c.length === i.length);
            m();
            rc(c);
            O();
            E();
        };
        this.rejectAllAction = function() {
            te(!1);
            I([]);
            h("reject", "");
            n("action", "reject");
            n("categories", JSON.stringify([]));
            A("reject", "");
            g();
            l();
            v(!1);
            m();
            sc();
            O();
            E();
            k(!1);
            u(!1);
            R("rejectAll");
        };
        this.demoLoadView = function() {
            a("Warning is real site script");
        };
        var t = this,
            xc =
            "\n    <style data-type=\"cookiescriptstyles\">\n      #cookiescript_injected {\r\n    background-color: #131314;\r\n    z-index: 999997;\r\n    opacity: 0.95;\r\n    font-size: 14px;\r\n    font-weight: normal;\r\n    font-family: 'Open Sans', Arial, 'Trebuchet MS', 'Segoe UI', 'Helvetica', sans-serif;\r\n    box-shadow: 1px 2px 8px 0 rgba(0, 0, 0, 0.35);\r\n    color: #ffffff;\r\n    box-sizing: border-box;\r\n}\r\n.cookiescript_checkbox_label {\r\n    cursor: pointer;\r\n    display: flex;\r\n    align-items: center;\r\n    padding:0 4px;\r\n    line-height: 1.5;\r\n    margin:0;\r\n\ttext-align: left;\r\n}\r\n#cookiescript_close {\r\n    position: absolute;\r\n    top: 10px;\r\n    right: 10px;\r\n    font-size: 29px;\r\n    line-height: 13px;\r\n    cursor: pointer;\r\n    color: #ffffff;\r\n    height: 15px;\r\n    width: 15px;\r\n    margin: 0;\r\n    padding: 0;\r\n    overflow: hidden;\r\n    letter-spacing: 0;\r\n    font-family: 'Trebuchet MS', 'Arial', sans-serif;\r\n    font-weight: 100;\r\n    opacity: 0.85;\r\n    z-index: 999999;\r\n}\r\n\r\n#cookiescript_buttons {\r\n    display: flex;\r\n    flex-direction: row;\r\n    font-weight: 700;\r\n}\r\n#cookiescript_manage_wrap {\r\n    text-transform: uppercase;\r\n    text-align: center;\r\n    font-size: 11px;\r\n    letter-spacing: 0.1px;\r\n    font-weight: 500;\r\n}\r\n#cookiescript_manage {\r\n    display: inline;\r\n    cursor: pointer;\r\n    color: #ffffff;\r\n    opacity:0.85;\r\n}\r\n#cookiescript_manage #cookiescript_manageicon .cookiescript_gear {\r\n    fill: #ffffff;\r\n}\r\n#cookiescript_manage:hover #cookiescript_manageicon .cookiescript_gear {\r\n    fill: #d6ff6f;;\r\n}\r\n\r\nsvg#cookiescript_manageicon {\r\n    width: 15px;\r\n    height: 15px;\r\n    display: inline;\r\n    margin: 0 5px 0 0;\r\n    padding: 0;\r\n    position: relative;\r\n    top: 3px;\r\n    vertical-align: baseline;\r\n}\r\n#cookiescript_header {\r\n    background-color: transparent;\r\n    z-index: 999998;\r\n    color: #ffffff;\r\n    font-size: 17px;\r\n    line-height: 1.3;\r\n    font-weight: 600;\r\n    letter-spacing: 0.4px;\r\n    opacity:1;\r\n}\r\n.cookiescript_checkbox {\r\n    display: flex;\r\n    flex-direction: row;\r\n}\r\ninput.cookiescript_checkbox_input {\r\n}\r\nspan.cookiescript_checkbox_text {\r\n    display: inline-block;\r\n    font-size: 11px;\r\n    margin: 0;\r\n    text-transform: uppercase;\r\n    font-weight: 500;\r\n    color: #ffffff;\r\n}\r\n\r\n#cookiescript_save {\r\n    border: 0;\r\n    transition: all 0.25s ease 0s;\r\n    background-color: #d6ff6f;\r\n    color: #131314;\r\n    text-transform: uppercase;\r\n    font-size: 11px;\r\n    text-align: center;\r\n    line-height: 3.2;\r\n    letter-spacing: 0.4px;\r\n}\r\n/*IE 9 fixes*/\r\n@media screen and (min-width:0\\0) and (min-resolution: .001dpcm) {\r\n    .cookiescript_checkbox_label {\r\n        position: relative;\r\n        top:-10px;\r\n    }\r\n    #cookiescript_accept, #cookiescript_reject, #cookiescript_save{\r\n    \tdisplay: inline-block;\r\n    }\r\n    #cookiescript_buttons{\r\n    \ttext-align:center;\r\n    }\r\n}\r\n#cookiescript_save{\r\n}\r\n#cookiescript_reject {\r\n    border: 1px solid #ffffff;\r\n    text-align: center;\r\n    line-height: 3;\r\n    font-size: 11px;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.4px;\r\n    color: #ffffff;\r\n    background: #131314;\r\n}\r\n#cookiescript_accept {\r\n\ttransition: all 0.25s ease 0s;\r\n\ttext-transform: uppercase;\r\n\tfont-size: 11px;\r\n\ttext-align: center;\r\n\tletter-spacing: 0.4px;\r\n\tborder: 0;\r\n\tbackground-color: #d6ff6f;\r\n\tcolor: #131314;\r\n\tline-height: 3.2;\r\n}\r\n\r\n#cookiescript_accept, #cookiescript_reject, #cookiescript_save {\r\n    font-weight: 500;\r\n    cursor: pointer;\r\n    white-space: nowrap;\r\n    transition-duration: 100ms;\r\n    transition-timing-function: ease-in-out;\r\n    min-width: 103px;\r\n}\r\n.cookiescript_bigger {\r\n    transform: scale(1.1);\r\n}\r\n#cookiescript_link {\r\n    text-decoration: none;\r\n    color: #ffffff;\r\n    font-size: 9px;\r\n    text-align: center;\r\n    font-weight: 400;\r\n    text-transform: uppercase;\r\n    opacity: 0.8;\r\n\tdisplay:inline !important;\r\n}\r\n\r\n#cookiescript_readmore,\r\n#cookiescript_reportlink,\r\n#cookiescript_cookiescriptlink {\r\n    border: 0;\r\n    padding: 0;\r\n    cursor: pointer;\r\n    margin: 0;\r\n    transition: all 100ms ease 0s;\r\n    background-color: transparent;\r\n    color: #ffffff;\r\n    display: inline;\r\n    font-size: 11px;\r\n}\r\n\r\n#cookiescript_description {\r\n    color: #ffffff;\r\n    font-size: 12px;\r\n    letter-spacing: 0.3px;\r\n    line-height: 1.7;\r\n    font-weight: 400;\r\n    opacity: 0.85;\r\n}\r\n#cookiescript_checkboxs {\r\ndisplay:none !important;}\r\n#cookiescript_close:hover,\r\n#cookiescript_manage:hover,\r\n#cookiescript_link:hover\r\n{\r\n    opacity: 1;\r\n}\r\n\r\n#cookiescript_reject:hover {\r\n    background-color: #262627;\r\n}\r\n\r\n#cookiescript_accept:hover{\r\n\tbackground-color: #c6ec67;\r\n}\r\n#cookiescript_save:hover {\r\n    background-color: #c6ec67;\r\n}\r\n\r\n#cookiescript_readmore:hover,\r\n#cookiescript_reportlink:hover,\r\n#cookiescript_cookiescriptlink:hover\r\n{\r\n    color: #d6ff6f;\r\n}\r\n\r\n@media print{\r\n    #cookiescript_injected{\r\n        display:none;\r\n    }\r\n}\r\n\r\n\r\n\r\n\r\n\r\n.cookiescript_rtl {\r\n    direction:rtl;\r\n}\r\n\r\n\r\n/*Start Checkboxes*/\r\n#cookiescript_injected_fsd .mdc-checkbox,\r\n#cookiescript_injected .mdc-checkbox {\r\n    box-sizing: content-box !important;\r\n}\r\n#cookiescript_injected_fsd .mdc-checkbox__native-control,\r\n#cookiescript_injected .mdc-checkbox__native-control {\r\n    display: block;\r\n    z-index: 1;\r\n}\r\n#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__native-control:focus~.mdc-checkbox__background::before, \r\n#cookiescript_injected .mdc-checkbox .mdc-checkbox__native-control:focus~.mdc-checkbox__background::before, \r\n#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before,\r\n#cookiescript_injected .mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before {\r\n    background-color: #FFFFFF;\r\n}\r\n\r\n#cookiescript_injected .mdc-checkbox,#cookiescript_injected_fsd .mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom;padding:11px}#cookiescript_injected .mdc-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background::before,#cookiescript_injected .mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before,#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background::before,#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before{background-color:#ffffff}@supports not (-ms-ime-align:auto){#cookiescript_injected .mdc-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background::before,#cookiescript_injected .mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before,#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background::before,#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before{background-color:var(--mdc-theme-secondary, #ffffff)}}#cookiescript_injected .mdc-checkbox .mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__background{top:11px;left:11px}#cookiescript_injected .mdc-checkbox .mdc-checkbox__background::before,#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__background::before{top:-13px;left:-13px;width:40px;height:40px}#cookiescript_injected .mdc-checkbox .mdc-checkbox__native-control,#cookiescript_injected_fsd .mdc-checkbox .mdc-checkbox__native-control{top:0;right:0;left:0;width:40px;height:40px}#cookiescript_injected .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate)~.mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate)~.mdc-checkbox__background{border-color:#ffffff;background-color:transparent}#cookiescript_injected .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,#cookiescript_injected .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background{border-color:#ffffff;background-color:#ffffff}#cookiescript_injected .mdc-checkbox__native-control[disabled]:not(:checked):not(:indeterminate)~.mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__native-control[disabled]:not(:checked):not(:indeterminate)~.mdc-checkbox__background{border-color:rgba(255,255,255,0.26);background-color:transparent}#cookiescript_injected .mdc-checkbox__native-control[disabled]:checked~.mdc-checkbox__background,#cookiescript_injected .mdc-checkbox__native-control[disabled]:indeterminate~.mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__native-control[disabled]:checked~.mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__native-control[disabled]:indeterminate~.mdc-checkbox__background{border-color:transparent;background-color:rgba(255,255,255,0.26)}#cookiescript_injected .mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__checkmark,#cookiescript_injected_fsd .mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:#131314}#cookiescript_injected .mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__checkmark,#cookiescript_injected_fsd .mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:#131314}#cookiescript_injected .mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid #ffffff;border-radius:2px;background-color:transparent;pointer-events:none;will-change:background-color,border-color;transition:background-color 90ms 0s cubic-bezier(.4,0,.6,1),border-color 90ms 0s cubic-bezier(.4,0,.6,1)}#cookiescript_injected .mdc-checkbox__background .mdc-checkbox__background::before,#cookiescript_injected_fsd .mdc-checkbox__background .mdc-checkbox__background::before{background-color:#000}@supports not (-ms-ime-align:auto){#cookiescript_injected .mdc-checkbox__checkmark,#cookiescript_injected_fsd .mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0;transition:opacity 180ms 0s cubic-bezier(.4,0,.6,1)}#cookiescript_injected .mdc-checkbox__checkmark-path,#cookiescript_injected_fsd .mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms 0s cubic-bezier(.4,0,.6,1);stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}#cookiescript_injected .mdc-checkbox__native-control:checked~.mdc-checkbox__background,#cookiescript_injected .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__native-control:checked~.mdc-checkbox__background,#cookiescript_injected_fsd .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background{transition:border-color 90ms 0s cubic-bezier(0,0,.2,1),background-color 90ms 0s cubic-bezier(0,0,.2,1)}#cookiescript_injected .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,#cookiescript_injected .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path,#cookiescript_injected_fsd .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,#cookiescript_injected_fsd .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}#cookiescript_injected .mdc-checkbox__background::before,#cookiescript_injected_fsd .mdc-checkbox__background::before{position:absolute;-webkit-transform:scale(0,0);transform:scale(0,0);border-radius:50%;opacity:0;pointer-events:none;content:\"\";will-change:opacity,transform;transition:opacity 90ms 0s cubic-bezier(.4,0,.6,1),-webkit-transform 90ms 0s cubic-bezier(.4,0,.6,1);transition:opacity 90ms 0s cubic-bezier(.4,0,.6,1),transform 90ms 0s cubic-bezier(.4,0,.6,1);transition:opacity 90ms 0s cubic-bezier(.4,0,.6,1),transform 90ms 0s cubic-bezier(.4,0,.6,1),-webkit-transform 90ms 0s cubic-bezier(.4,0,.6,1)}#cookiescript_injected .mdc-checkbox__native-control:focus~.mdc-checkbox__background::before,#cookiescript_injected_fsd .mdc-checkbox__native-control:focus~.mdc-checkbox__background::before{-webkit-transform:scale(1);transform:scale(1);opacity:.12;transition:opacity 80ms 0s cubic-bezier(0,0,.2,1),-webkit-transform 80ms 0s cubic-bezier(0,0,.2,1);transition:opacity 80ms 0s cubic-bezier(0,0,.2,1),transform 80ms 0s cubic-bezier(0,0,.2,1);transition:opacity 80ms 0s cubic-bezier(0,0,.2,1),transform 80ms 0s cubic-bezier(0,0,.2,1),-webkit-transform 80ms 0s cubic-bezier(0,0,.2,1)}#cookiescript_injected .mdc-checkbox__native-control,#cookiescript_injected_fsd .mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit}#cookiescript_injected .mdc-checkbox__native-control:disabled,#cookiescript_injected_fsd .mdc-checkbox__native-control:disabled{cursor:default;pointer-events:none}#cookiescript_injected .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark,#cookiescript_injected_fsd .mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms 0s cubic-bezier(0,0,.2,1),-webkit-transform 180ms 0s cubic-bezier(0,0,.2,1);transition:opacity 180ms 0s cubic-bezier(0,0,.2,1),transform 180ms 0s cubic-bezier(0,0,.2,1);transition:opacity 180ms 0s cubic-bezier(0,0,.2,1),transform 180ms 0s cubic-bezier(0,0,.2,1),-webkit-transform 180ms 0s cubic-bezier(0,0,.2,1);opacity:1}#cookiescript_injected .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark,#cookiescript_injected_fsd .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark{-webkit-transform:rotate(45deg);transform:rotate(45deg);opacity:0;transition:opacity 90ms 0s cubic-bezier(.4,0,.6,1),-webkit-transform 90ms 0s cubic-bezier(.4,0,.6,1);transition:opacity 90ms 0s cubic-bezier(.4,0,.6,1),transform 90ms 0s cubic-bezier(.4,0,.6,1);transition:opacity 90ms 0s cubic-bezier(.4,0,.6,1),transform 90ms 0s cubic-bezier(.4,0,.6,1),-webkit-transform 90ms 0s cubic-bezier(.4,0,.6,1)}#cookiescript_injected .mdc-checkbox,#cookiescript_injected_fsd .mdc-checkbox{-webkit-tap-highlight-color:transparent}}\r\n/*End Checkboxes*/\r\n\r\n\r\n/*Start Toggle*/\r\n\r\n#cookiescript_injected .mdc-elevation-overlay,#cookiescript_injected_fsd .mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity 280ms cubic-bezier(.4,0,.2,1);background-color:#fff}#cookiescript_injected .mdc-switch,#cookiescript_injected_fsd .mdc-switch{align-items:center;background:0 0;border:none;cursor:pointer;display:inline-flex;flex-shrink:0;margin:0;outline:0;overflow:visible;padding:0;position:relative}#cookiescript_injected .mdc-switch:disabled,#cookiescript_injected_fsd .mdc-switch:disabled{cursor:default;pointer-events:none}#cookiescript_injected .mdc-switch input[type=checkbox],#cookiescript_injected_fsd .mdc-switch input[type=checkbox]{display:none;visibility:hidden}#cookiescript_injected .mdc-switch__track,#cookiescript_injected_fsd .mdc-switch__track{overflow:hidden;position:relative;width:100%}#cookiescript_injected .mdc-switch__track::after,#cookiescript_injected .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch__track::after,#cookiescript_injected_fsd .mdc-switch__track::before{border:1px solid transparent;border-radius:inherit;box-sizing:border-box;content:\"\";height:100%;left:0;position:absolute;width:100%}#cookiescript_injected .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch__track::before{transition:-webkit-transform 75ms 0s cubic-bezier(0,0,.2,1);transition:transform 75ms 0s cubic-bezier(0,0,.2,1);-webkit-transform:translateX(0);transform:translateX(0)}#cookiescript_injected .mdc-switch__track::after,#cookiescript_injected_fsd .mdc-switch__track::after{transition:-webkit-transform 75ms 0s cubic-bezier(.4,0,.6,1);transition:transform 75ms 0s cubic-bezier(.4,0,.6,1);-webkit-transform:translateX(-100%);transform:translateX(-100%)}#cookiescript_injected .mdc-switch__track[dir=rtl]::after,#cookiescript_injected [dir=rtl] .mdc-switch__track::after,#cookiescript_injected_fsd .mdc-switch__track[dir=rtl]::after,#cookiescript_injected_fsd [dir=rtl] .mdc-switch__track::after{-webkit-transform:translateX(100%);transform:translateX(100%)}#cookiescript_injected .mdc-switch--selected .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch--selected .mdc-switch__track::before{transition:-webkit-transform 75ms 0s cubic-bezier(.4,0,.6,1);transition:transform 75ms 0s cubic-bezier(.4,0,.6,1);-webkit-transform:translateX(100%);transform:translateX(100%)}#cookiescript_injected .mdc-switch--selected .mdc-switch__track[dir=rtl]::before,#cookiescript_injected [dir=rtl] .mdc-switch--selected .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch--selected .mdc-switch__track[dir=rtl]::before,#cookiescript_injected_fsd [dir=rtl] .mdc-switch--selected .mdc-switch__track::before{-webkit-transform:translateX(-100%);transform:translateX(-100%)}#cookiescript_injected .mdc-switch--selected .mdc-switch__track::after,#cookiescript_injected_fsd .mdc-switch--selected .mdc-switch__track::after{transition:-webkit-transform 75ms 0s cubic-bezier(0,0,.2,1);transition:transform 75ms 0s cubic-bezier(0,0,.2,1);-webkit-transform:translateX(0);transform:translateX(0)}#cookiescript_injected .mdc-switch__handle-track,#cookiescript_injected_fsd .mdc-switch__handle-track{height:100%;pointer-events:none;position:absolute;top:0;transition:-webkit-transform 75ms 0s cubic-bezier(.4,0,.2,1);transition:transform 75ms 0s cubic-bezier(.4,0,.2,1);left:0;right:auto;-webkit-transform:translateX(0);transform:translateX(0)}#cookiescript_injected .mdc-switch__handle-track[dir=rtl],#cookiescript_injected [dir=rtl] .mdc-switch__handle-track,#cookiescript_injected_fsd .mdc-switch__handle-track[dir=rtl],#cookiescript_injected_fsd [dir=rtl] .mdc-switch__handle-track{left:auto;right:0}#cookiescript_injected .mdc-switch--selected .mdc-switch__handle-track,#cookiescript_injected_fsd .mdc-switch--selected .mdc-switch__handle-track{-webkit-transform:translateX(100%);transform:translateX(100%)}#cookiescript_injected .mdc-switch--selected .mdc-switch__handle-track[dir=rtl],#cookiescript_injected [dir=rtl] .mdc-switch--selected .mdc-switch__handle-track,#cookiescript_injected_fsd .mdc-switch--selected .mdc-switch__handle-track[dir=rtl],#cookiescript_injected_fsd [dir=rtl] .mdc-switch--selected .mdc-switch__handle-track{-webkit-transform:translateX(-100%);transform:translateX(-100%)}#cookiescript_injected .mdc-switch__handle,#cookiescript_injected_fsd .mdc-switch__handle{display:flex;pointer-events:auto;position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);left:0;right:auto}#cookiescript_injected .mdc-switch__handle[dir=rtl],#cookiescript_injected [dir=rtl] .mdc-switch__handle,#cookiescript_injected_fsd .mdc-switch__handle[dir=rtl],#cookiescript_injected_fsd [dir=rtl] .mdc-switch__handle{left:auto;right:0}#cookiescript_injected .mdc-switch__handle::after,#cookiescript_injected .mdc-switch__handle::before,#cookiescript_injected_fsd .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch__handle::before{border:1px solid transparent;border-radius:inherit;box-sizing:border-box;content:\"\";width:100%;height:100%;left:0;position:absolute;top:0;transition:background-color 75ms 0s cubic-bezier(.4,0,.2,1),border-color 75ms 0s cubic-bezier(.4,0,.2,1);z-index:-1}#cookiescript_injected .mdc-switch__shadow,#cookiescript_injected_fsd .mdc-switch__shadow{border-radius:inherit;bottom:0;left:0;position:absolute;right:0;top:0}#cookiescript_injected .mdc-elevation-overlay,#cookiescript_injected_fsd .mdc-elevation-overlay{bottom:0;left:0;right:0;top:0}#cookiescript_injected .mdc-switch__ripple,#cookiescript_injected_fsd .mdc-switch__ripple{left:50%;position:absolute;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);z-index:-1}#cookiescript_injected .mdc-switch:disabled .mdc-switch__ripple,#cookiescript_injected_fsd .mdc-switch:disabled .mdc-switch__ripple{display:none}#cookiescript_injected .mdc-switch__icons,#cookiescript_injected_fsd .mdc-switch__icons{height:100%;position:relative;width:100%;z-index:1}#cookiescript_injected .mdc-switch__icon,#cookiescript_injected_fsd .mdc-switch__icon{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;opacity:0;transition:opacity 30ms 0s cubic-bezier(.4,0,1,1)}#cookiescript_injected .mdc-switch--selected .mdc-switch__icon--on,#cookiescript_injected .mdc-switch--unselected .mdc-switch__icon--off,#cookiescript_injected_fsd .mdc-switch--selected .mdc-switch__icon--on,#cookiescript_injected_fsd .mdc-switch--unselected .mdc-switch__icon--off{opacity:1;transition:opacity 45ms 30ms cubic-bezier(0,0,.2,1)}#cookiescript_injected .mdc-switch,#cookiescript_injected_fsd .mdc-switch{will-change:transform,opacity}@-webkit-keyframes mdc-ripple-fg-radius-in{from{-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transform:translate(0) scale(1);transform:translate(0) scale(1)}to{-webkit-transform:translate(0) scale(1);transform:translate(0) scale(1)}}@keyframes mdc-ripple-fg-radius-in{from{-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transform:translate(0) scale(1);transform:translate(0) scale(1)}to{-webkit-transform:translate(0) scale(1);transform:translate(0) scale(1)}}@-webkit-keyframes mdc-ripple-fg-opacity-in{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:.1}}@keyframes mdc-ripple-fg-opacity-in{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:.1}}@-webkit-keyframes mdc-ripple-fg-opacity-out{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:.1}to{opacity:0}}@keyframes mdc-ripple-fg-opacity-out{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:.1}to{opacity:0}}#cookiescript_injected .mdc-switch .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch .mdc-switch__ripple::before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}#cookiescript_injected .mdc-switch .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch .mdc-switch__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}#cookiescript_injected .mdc-switch .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch .mdc-switch__ripple::after{z-index:0}#cookiescript_injected .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::before{-webkit-transform:scale(1);transform:scale(1)}#cookiescript_injected .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}#cookiescript_injected .mdc-switch.mdc-ripple-upgraded--unbounded .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-ripple-upgraded--unbounded .mdc-switch__ripple::after{top:0;left:0}#cookiescript_injected .mdc-switch.mdc-ripple-upgraded--foreground-activation .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-ripple-upgraded--foreground-activation .mdc-switch__ripple::after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}#cookiescript_injected .mdc-switch.mdc-ripple-upgraded--foreground-deactivation .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-ripple-upgraded--foreground-deactivation .mdc-switch__ripple::after{-webkit-animation:mdc-ripple-fg-opacity-out 150ms;animation:mdc-ripple-fg-opacity-out 150ms;-webkit-transform:translate(0) scale(1);transform:translate(0) scale(1)}#cookiescript_injected .mdc-switch .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch .mdc-switch__ripple::before{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}#cookiescript_injected .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::before{top:0;left:0;width:0;height:0}#cookiescript_injected .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-ripple-upgraded .mdc-switch__ripple::after{width:0;height:0}#cookiescript_injected .mdc-switch,#cookiescript_injected_fsd .mdc-switch{width:36px}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled .mdc-switch__handle::after{background:}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after{background:}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__handle::after{background:}#cookiescript_injected .mdc-switch.mdc-switch--selected:disabled .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:disabled .mdc-switch__handle::after{background:#424242}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled .mdc-switch__handle::after{background:#616161}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:#212121}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after{background:#212121}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__handle::after{background:#212121}#cookiescript_injected .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__handle::after{background:#424242}#cookiescript_injected .mdc-switch .mdc-switch__handle::before,#cookiescript_injected_fsd .mdc-switch .mdc-switch__handle::before{background:#fff}#cookiescript_injected .mdc-switch:enabled .mdc-switch__shadow,#cookiescript_injected_fsd .mdc-switch:enabled .mdc-switch__shadow{box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);--mdc-elevation-box-shadow-for-gss:0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0, 0, 0, 0.12)}#cookiescript_injected .mdc-switch:disabled .mdc-switch__shadow,#cookiescript_injected_fsd .mdc-switch:disabled .mdc-switch__shadow{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12);--mdc-elevation-box-shadow-for-gss:0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0, 0, 0, 0.12)}#cookiescript_injected .mdc-switch .mdc-switch__handle,#cookiescript_injected_fsd .mdc-switch .mdc-switch__handle{height:20px}#cookiescript_injected .mdc-switch:disabled .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch:disabled .mdc-switch__handle::after{opacity:.38}#cookiescript_injected .mdc-switch .mdc-switch__handle,#cookiescript_injected_fsd .mdc-switch .mdc-switch__handle{border-radius:10px}#cookiescript_injected .mdc-switch .mdc-switch__handle,#cookiescript_injected_fsd .mdc-switch .mdc-switch__handle{width:20px}#cookiescript_injected .mdc-switch .mdc-switch__handle-track,#cookiescript_injected_fsd .mdc-switch .mdc-switch__handle-track{width:calc(100% - 20px)}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled .mdc-switch__icon,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled .mdc-switch__icon{fill:#fff}#cookiescript_injected .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icon,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icon{fill:#fff}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled .mdc-switch__icon,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled .mdc-switch__icon{fill:#fff}#cookiescript_injected .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icon,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icon{fill:#fff}#cookiescript_injected .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icons,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icons{opacity:.38}#cookiescript_injected .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icons,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icons{opacity:.38}#cookiescript_injected .mdc-switch.mdc-switch--selected .mdc-switch__icon,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected .mdc-switch__icon{width:18px;height:18px}#cookiescript_injected .mdc-switch.mdc-switch--unselected .mdc-switch__icon,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected .mdc-switch__icon{width:18px;height:18px}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::before{background-color:}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:focus .mdc-switch__ripple::before{background-color:}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:active .mdc-switch__ripple::before{background-color:}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::before{background-color:#424242}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::before{background-color:#424242}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after,#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:active .mdc-switch__ripple::before{background-color:#424242}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before,#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before{opacity:.04}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before{transition-duration:75ms;opacity:.12}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after{transition:opacity 150ms linear}#cookiescript_injected .mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after{transition-duration:75ms;opacity:.1}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before,#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus).mdc-ripple-surface--hover .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:hover:not(:focus):hover .mdc-switch__ripple::before{opacity:.04}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:focus.mdc-ripple-upgraded--background-focused .mdc-switch__ripple::before,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:focus:not(.mdc-ripple-upgraded):focus .mdc-switch__ripple::before{transition-duration:75ms;opacity:.12}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded) .mdc-switch__ripple::after{transition:opacity 150ms linear}#cookiescript_injected .mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:enabled:active:not(.mdc-ripple-upgraded):active .mdc-switch__ripple::after{transition-duration:75ms;opacity:.1}#cookiescript_injected .mdc-switch .mdc-switch__ripple,#cookiescript_injected_fsd .mdc-switch .mdc-switch__ripple{height:48px;width:48px}#cookiescript_injected .mdc-switch .mdc-switch__track,#cookiescript_injected_fsd .mdc-switch .mdc-switch__track{height:14px}#cookiescript_injected .mdc-switch:disabled .mdc-switch__track,#cookiescript_injected_fsd .mdc-switch:disabled .mdc-switch__track{opacity:.12}#cookiescript_injected .mdc-switch:enabled .mdc-switch__track::after{background:;opacity:0.3}#cookiescript_injected .mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after{background:;opacity:0.3}#cookiescript_injected .mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after{background:;opacity:0.3}#cookiescript_injected .mdc-switch:enabled:active .mdc-switch__track::after{background:;opacity:0.3}#cookiescript_injected .mdc-switch:disabled .mdc-switch__track::after,#cookiescript_injected_fsd .mdc-switch:disabled .mdc-switch__track::after{background:#424242}#cookiescript_injected .mdc-switch:enabled .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch:enabled .mdc-switch__track::before{background:#e0e0e0}#cookiescript_injected .mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before{background:#e0e0e0}#cookiescript_injected .mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before{background:#e0e0e0}#cookiescript_injected .mdc-switch:enabled:active .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch:enabled:active .mdc-switch__track::before{background:#e0e0e0}#cookiescript_injected .mdc-switch:disabled .mdc-switch__track::before,#cookiescript_injected_fsd .mdc-switch:disabled .mdc-switch__track::before{background:#424242}#cookiescript_injected .mdc-switch .mdc-switch__track,#cookiescript_injected_fsd .mdc-switch .mdc-switch__track{border-radius:7px}@media screen and (forced-colors:active),(-ms-high-contrast:active){#cookiescript_injected .mdc-switch:disabled .mdc-switch__handle::after,#cookiescript_injected_fsd .mdc-switch:disabled .mdc-switch__handle::after{opacity:1}#cookiescript_injected .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icons,#cookiescript_injected_fsd .mdc-switch.mdc-switch--selected:disabled .mdc-switch__icons{opacity:1}#cookiescript_injected .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icons,#cookiescript_injected_fsd .mdc-switch.mdc-switch--unselected:disabled .mdc-switch__icons{opacity:1}#cookiescript_injected .mdc-switch:disabled .mdc-switch__track,#cookiescript_injected_fsd .mdc-switch:disabled .mdc-switch__track{opacity:1}}\r\n/*End Toggle*/\r\n\r\n#cookiescript_injected {\r\nbottom: 20px;\r\nright: 20px;\r\n    position: fixed;\r\n    padding: 15px 20px 15px 20px;\r\n    width: 300px;\r\n    text-align: left;\r\n    max-height: 85%;\r\n    overflow-y: auto;\r\n    max-width: calc(100% - 40px);\r\n}\r\n#cookiescript_copyright {\r\n    line-height: 1;\r\n    text-align: center;\r\n}\r\n#cookiescript_buttons {\r\n    justify-content: space-between;\r\n    margin: 0 -5px 0 -5px;\r\n    flex-wrap: wrap;\r\n}\r\n#cookiescript_manage_wrap {\r\n    margin: 0 0 11px 0;\r\n}\r\n#cookiescript_header {\r\n    padding: 14px 0 12px;\r\n    text-align: left;\r\n    margin: 0;\r\n}\r\n#cookiescript_checkboxs {\r\n    margin: -6px 0 18px -11px;\r\n}\r\n.cookiescript_checkbox {\r\n    margin: 0 0 -10px 0;\r\n}\r\n#cookiescript_accept,\r\n#cookiescript_save,\r\n#cookiescript_reject {\r\n    flex-grow: 1;\r\n    padding: 0 7px;\r\n    margin: 0 5px 10px 5px;\r\n}\r\n#cookiescript_description {\r\n    margin: 0 0 12px;\r\n}\r\n\r\n.cookiescript_checkbox_label{\r\n    padding: 0;\r\n    margin: 0 10px 0 -2px;\r\n}\r\n\r\n#cookiescript_injected{\r\n    transition: width 200ms 600ms;\r\n}\r\n\r\n#cookiescript_injected.hascookiereport{\r\n    width:600px;\r\n    transition: width 200ms 0ms;\r\n}\r\n#cookiescript_cookietablewrap {\r\n    transition: height 300ms 200ms, min-height 300ms 200ms, max-height 300ms 200ms, opacity 200ms 300ms;\r\n}\r\n#cookiescript_cookietablewrap.cookiescript_hidden {\r\n    transition: height 300ms 200ms, min-height 300ms 200ms, max-height 300ms 200ms, opacity 200ms 0ms;\r\n}\r\n\r\n#cookiescript_accept, #cookiescript_reject, #cookiescript_save {\r\n\tborder-radius: 20px;\r\n}\r\n\r\n#cookiescript_injected {\r\n\tborder-radius: 10px;\r\n}\r\n\r\n@media only screen and (max-width: 414px) {\r\n    #cookiescript_injected{\r\n    bottom: 0;\r\n    right: 0;\r\n        width: 100%;\r\n        padding: 15px;\r\n        border-radius:0;\r\n\t\tmax-width: 100%;\r\n    }\r\n    #cookiescript_description,\r\n    #cookiescript_buttons,\r\n    #cookiescript_manage_wrap,\r\n    #cookiescript_checkboxs\r\n    {\r\n        margin-bottom: 8px;\r\n    }\r\n    #cookiescript_header{\r\n        padding-top:5px;\r\n    }\r\n    #cookiescript_checkboxs {\r\n        display: flex;\r\n        flex-wrap: wrap;\r\n    }\r\n    #cookiescript_injected {\r\n\t\tmax-height: 100%;\r\n\t}\r\n}\r\n\r\n#cookiescript_injected {\r\n     font-family: 'Roboto Regular';\r\nbox-shadow: none;\r\nborder: 2px solid #131314;\r\nborder-radius: 25px;\r\n}\r\n\r\n#cookiescript_description {\r\nline-height: 1.25;\r\nfont-size: 14px;\r\n}\r\n\r\n#cookiescript_readmore, #cookiescript_reportlink, #cookiescript_cookiescriptlink {\r\nfont-size: 14px;\r\n}\n    </style>\n  ",
            yc =
            '<div id="cookiescript_injected" tabindex="0" role="alert" aria-live="assertive" data-nosnippet class="">\n    <div id="cookiescript_header" data-cs-i18n-text="{&quot;en&quot;&quotThis website  uses cookies&quot;}">\n    This website  uses cookies  </div>\n  <div id="cookiescript_description">\n\t    <span data-cs-desc-box="true" data-cs-i18n-text="{&quot;en&quot;:&quot;This website uses cookies to improve the user experience. By using our website you consent consent to all cookies in accordance with our cookie policy.&quot;}" data-cs-i18n-read="This website uses cookies to improve the user experience. By using our website you consent consent to all cookies in accordance with our cookie policy.">\n      This website uses cookies to improve the user experience. By using our website you consent consent to all cookies in accordance with our cookie policy.  </span>\n\n    \n      \n      <a\n        id="cookiescript_readmore"\n        data-cs-i18n-text="{&quot;en&quot;:&quot;Read more}"\n        data-cs-i18n-url="{&quot;en&quot;:&quot;\\/privacy policy&quot;}"\n        href="/privacy policy"\n        target="_self"\n      >\n       Read more     </a>\n\n      </div>\n  <div id="cookiescript_checkboxs">\n          \n            <div class="cookiescript_checkbox">\n        <div class="mdc-checkbox">\n          <input\n            id="cookiescript_category_strict"\n            data-cookiescript="checkbox-input"\n            type="checkbox"\n            class="mdc-checkbox__native-control cookiescript_checkbox_input"\n            value="strict"\n            disabled checked          />\n          <div class="mdc-checkbox__background">\n            <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">\n              <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"/>\n            </svg>\n          </div>\n        </div>\n        <label class="cookiescript_checkbox_label" for="cookiescript_category_strict">\n          <span\n            class="cookiescript_checkbox_text"\n            data-cs-i18n-text="{&quot;sv&quot;:&quot;Strictly\u00f6ne\u00cessary&quot;}"\n          >\n           Strictly\u00f6ne\u00cessary          </span>\n        </label>\n      </div>\n\n                \n            <div class="cookiescript_checkbox">\n        <div class="mdc-checkbox">\n          <input\n            id="cookiescript_category_targeting"\n            data-cookiescript="checkbox-input"\n            type="checkbox"\n            class="mdc-checkbox__native-control cookiescript_checkbox_input"\n            value="targeting"\n                      />\n          <div class="mdc-checkbox__background">\n            <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">\n              <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"/>\n            </svg>\n          </div>\n        </div>\n        <label class="cookiescript_checkbox_label" for="cookiescript_category_targeting">\n          <span\n            class="cookiescript_checkbox_text"\n            data-cs-i18n-text="{&quot;sv&quot;:&quot;Targeting&quot;}"\n          >\n            Targeting          </span>\n        </label>\n      </div>\n\n          \n            <div class="cookiescript_checkbox">\n        <div class="mdc-checkbox">\n          <input\n            id="cookiescript_category_functionality"\n            data-cookiescript="checkbox-input"\n            type="checkbox"\n            class="mdc-checkbox__native-control cookiescript_checkbox_input"\n            value="functionality"\n                      />\n          <div class="mdc-checkbox__background">\n            <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">\n              <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"/>\n            </svg>\n          </div>\n        </div>\n        <label class="cookiescript_checkbox_label" for="cookiescript_category_functionality">\n          <span\n            class="cookiescript_checkbox_text"\n            data-cs-i18n-text="{&quot;sv&quot;:&quot;Features&quot;}"\n          >\n            Features          </span>\n        </label>\n      </div>\n\n            </div>\n  <div id="cookiescript_buttons">\n              <div id="cookiescript_accept" tabindex="0" role="button" data-cs-i18n-text="{&quot;sv&quot;:&quot;Accept all&quot;}">\n        Accept all     </div>\n          </div>\n\n\n</div>\n',
            me = "",
            Uc = "",
            jc = "CookieScriptConsent",
            fe = 30,
            Ac = window.location.href,
            he = "718eab40eeb41dc3d507c59b372b490c",
            Pc = !1,
            Sc = {
                strict: ["__cf_bm", "CookieScriptConsent"],
                targeting: ["CLID", "SM", "MUID", "MUID", "SRM_B", "MR"],
                functionality: ["vuid"],
            };
        var Oc = [],
            Xc = [
                "__cf_bm",
                "CLID",
                "SM",
                "MUID",
                "MUID",
                "SRM_B",
                "CookieScriptConsent",
                "vuid",
                "MR",
            ],
            i = ["strict", "targeting", "functionality"],
            X = 1,
            wc = "habitat.se",
            Fc = "",
            gc = [],
            vc = {};
        var F = !1,
            U = !1,
            ue = "0",
            ke = "",
            be = null,
            we = null,
            P = !1,
            qc = [],
            Ec = !1,
            J = !1,
            o = "sv",
            zc = !1,
            w = Number(0),
            b = function() {
                var e = document.querySelector("script[data-cs-cookiename]");
                if (e) {
                    return e.getAttribute("data-cs-cookiename");
                }
                return jc;
            },
            ge = function() {
                return !1;
            },
            S = function(e) {
                if (!F) {
                    if (e) {
                        u(!0, e);
                    } else {
                        u(!0);
                    }
                    if (window.gtag) {
                        F = !0;
                    }
                }
                if (!U) {
                    if (e) {
                        k(!0, e);
                    } else {
                        k(!0);
                        if (window.fbq) {
                            U = !0;
                        }
                    }
                }
            },
            H = function() {
                q();
                var e = w === 0 || w > 500 ? 500 : w;
                setTimeout(function() {
                    q();
                }, e);
            },
            q = function() {
                var t = function(e) {
                        var c = typeof e === "undefined" ? i : e;
                        if (c.length === i.length) {
                            p();
                            S();
                        } else {
                            p(c);
                            S(c);
                        }
                        for (var t = 0; t < c.length; t++) {
                            s(c[t]);
                        }
                        g(c);
                    },
                    e = function() {
                        g();
                        p(["strict"]);
                    };
                ge();
                if (ce()) {
                    W();
                    return !0;
                }
                if (T()) {
                    if (ee()) {
                        var c = y();
                        t(c);
                        return !0;
                    } else {
                        e();
                        s("strict");
                        return !0;
                    }
                } else {
                    e();
                    return !0;
                }
            },
            E = function() {
                return !1;
            },
            ve = function(e) {
                return !1;
            },
            xe = function(e, c) {
                if (c === undefined) {
                    c = {};
                }
                var r = e;
                if (e === "def_cookie_lang") {
                    r = o;
                }
                var h = c["nodeScope"] ?
                    c["nodeScope"].querySelectorAll("[data-cs-i18n-text]") :
                    document.querySelectorAll("[data-cs-i18n-text]"),
                    u = c["nodeScope"] ?
                    c["nodeScope"].querySelectorAll("[data-cs-i18n-url]") :
                    document.querySelectorAll("[data-cs-i18n-url]"),
                    m,
                    f;
                if (typeof h !== "undefined") {
                    m = Array.prototype.slice.call(h);
                    for (var l = 0; l < m.length; l++) {
                        var d = m[l];
                        try {
                            var i = JSON.parse(d.getAttribute("data-cs-i18n-text"));
                            if (i && i[r] && i[r].length > 0) {
                                d.innerHTML = i[r];
                                if (d.getAttribute("data-cs-i18n-read")) {
                                    d.setAttribute("data-cs-i18n-read", i[r]);
                                }
                            } else if (i && i[o] && i[o].length > 0) {
                                d.innerHTML = i[o];
                                if (d.getAttribute("data-cs-i18n-read")) {
                                    d.setAttribute("data-cs-i18n-read", i[o]);
                                }
                            }
                        } catch (n) {}
                    }
                }
                if (typeof u !== "undefined") {
                    f = Array.prototype.slice.call(u);
                    for (var p = 0; p < f.length; p++) {
                        var a = f[p];
                        try {
                            var s = JSON.parse(a.getAttribute("data-cs-i18n-url"));
                            if (s && s[r] && s[r].length > 0) {
                                a.setAttribute("href", s[r]);
                            } else if (s && s[o] && s[o].length > 0) {
                                a.setAttribute("href", s[o]);
                            }
                        } catch (n) {}
                    }
                }
                if (c["rebuildIab"] && c["rebuildIab"] === !0) {
                    Q();
                }
                ve(e);
                t.currentLang = r;
            },
            z = function(e) {
                t.currentLang = "sv";
                return !1;
            },
            ye = function() {
                var e = document.querySelectorAll(
                    'table[data-cs-table-report="cookiescript"]'
                );
                Array.prototype.slice.call(e).forEach(function(e) {
                    var i = e.querySelectorAll("thead th"),
                        c = [];
                    Array.prototype.slice.call(i).forEach(function(e) {
                        c.push(e.innerText);
                    });
                    var t = e.querySelectorAll("tbody tr");
                    Array.prototype.slice.call(t).forEach(function(e) {
                        Array.prototype.slice.call(e.children).forEach(function(e, t) {
                            e.setAttribute("label", c[t]);
                        });
                    });
                });
            },
            p = function(e) {
                var c =
                    e && e.length > 0 ?
                    '[data-cookiescript="accepted"][data-cookiecategory]' :
                    '[data-cookiescript="accepted"]';
                Ae(c, e);
                Se(c, e);
                qe(c, e);
                Ee(c, e);
                ze(c, e);
                Ce(c, e);
                je(e);
            },
            g = function(e) {
                var s = c.get();
                for (var t in s) {
                    if (t === b() || Ye(t) || Ge(t, e) || Ve(t)) {
                        continue;
                    }
                    gc.push(t);
                    vc[t] = s[t];
                    c.remove(t);
                    if (c.get(t) !== "undefined") {
                        var r = window.location.hostname.split(".");
                        while (r.length > 0 && c.get(t) !== "undefined") {
                            var n = r.join("."),
                                o = location.pathname.split("/"),
                                i = "/";
                            c.remove(t, { path: i, domain: "" });
                            c.remove(t, { path: i, domain: n });
                            c.remove(t, { path: i, domain: "." + n });
                            while (o.length > 0 && c.get(t) !== "undefined") {
                                i = o.join("/");
                                c.remove(t, { path: i, domain: "" });
                                c.remove(t, { path: i, domain: n });
                                c.remove(t, { path: i, domain: "." + n });
                                o.pop();
                            }
                            r.shift();
                        }
                    }
                }
            },
            C = function(e) {
                return !1;
            },
            W = function(e) {
                if (e === undefined) {
                    e = { console: !0 };
                }
                var t = [
                    "strict",
                    "performance",
                    "targeting",
                    "functionality",
                    "unclassified",
                ];
                n("action", "accept");
                var o = N(i);
                n("categories", JSON.stringify(o));
                p();
                C();
                S();
                for (var c = 0; c < t.length; c++) {
                    s(t[c]);
                }
                s("all");
                if (e.console) {
                    a("_forceAllow - TRUE");
                }
            },
            je = function(e) {
                var n = document.querySelectorAll("[data-cookienotice]");
                for (var t = 0; t < n.length; t++) {
                    var i = n[t];
                    if (e && e.length > 0) {
                        var c = i.getAttribute("data-cookienotice");
                        if (c) {
                            e.forEach(function(e) {
                                c = c.replace(e, "").trim();
                            });
                            if (c.length > 0) {
                                continue;
                            }
                        }
                    }
                    i.style.display = "none";
                }
            },
            Ae = function(e, c) {
                var o = document.querySelectorAll("img" + e);
                if (o) {
                    for (var n = 0; n < o.length; n++) {
                        var i = o[n];
                        if (c && c.length > 0) {
                            var t = i.getAttribute("data-cookiecategory");
                            if (t) {
                                c.forEach(function(e) {
                                    t = t.replace(e, "").trim();
                                });
                                if (t.length > 0) {
                                    continue;
                                }
                            }
                        }
                        i.setAttribute("src", i.getAttribute("data-src"));
                        i.removeAttribute("data-cookiescript");
                    }
                }
            },
            Se = function(e, c) {
                var s = !1,
                    r = document.querySelectorAll('script[type="text/plain"]' + e);
                if (r) {
                    for (var o = 0; o < r.length; o++) {
                        var i = r[o];
                        if (c && c.length > 0) {
                            var n = i.getAttribute("data-cookiecategory");
                            if (n) {
                                c.forEach(function(e) {
                                    n = n.replace(e, "").trim();
                                });
                                if (n.length > 0) {
                                    continue;
                                }
                            }
                        }
                        if (i.getAttribute("data-reload") === "true") {
                            s = !0;
                        }
                        var t = document.createElement("script");
                        t.innerHTML = i.innerHTML;
                        var d = Array.prototype.slice.call(i.attributes);
                        d.forEach(function(e) {
                            t.setAttribute(e.name, e.value);
                        });
                        t.setAttribute("type", "text/javascript");
                        t.removeAttribute("data-cookiescript");
                        ac(i, t);
                    }
                }
                if (s) {
                    nc();
                }
            },
            qe = function(e, c) {
                var o = document.querySelectorAll("iframe" + e);
                if (o) {
                    for (var n = 0; n < o.length; n++) {
                        var i = o[n];
                        if (c && c.length > 0) {
                            var t = i.getAttribute("data-cookiecategory");
                            if (t) {
                                c.forEach(function(e) {
                                    t = t.replace(e, "").trim();
                                });
                                if (t.length > 0) {
                                    continue;
                                }
                            }
                        }
                        i.setAttribute("src", i.getAttribute("data-src"));
                        i.removeAttribute("data-cookiescript");
                    }
                }
            },
            Ee = function(e, c) {
                var o = document.querySelectorAll("embed" + e);
                if (o) {
                    for (var n = 0; n < o.length; n++) {
                        var t = o[n];
                        if (c && c.length > 0) {
                            var i = t.getAttribute("data-cookiecategory");
                            if (i) {
                                c.forEach(function(e) {
                                    i = i.replace(e, "").trim();
                                });
                                if (i.length > 0) {
                                    continue;
                                }
                            }
                        }
                        t.setAttribute("src", t.getAttribute("data-src"));
                        t.removeAttribute("data-cookiescript");
                        var r = t.outerHTML;
                        ae(t, r);
                    }
                }
            },
            ze = function(e, c) {
                var o = document.querySelectorAll("object" + e);
                if (o) {
                    for (var n = 0; n < o.length; n++) {
                        var t = o[n];
                        if (c && c.length > 0) {
                            var i = t.getAttribute("data-cookiecategory");
                            if (i) {
                                c.forEach(function(e) {
                                    i = i.replace(e, "").trim();
                                });
                                if (i.length > 0) {
                                    continue;
                                }
                            }
                        }
                        t.setAttribute("data", t.getAttribute("data-data"));
                        t.removeAttribute("data-cookiescript");
                        var r = t.outerHTML;
                        ae(t, r);
                    }
                }
            },
            Ce = function(e, c) {
                var o = document.querySelectorAll("link" + e);
                if (o) {
                    for (var n = 0; n < o.length; n++) {
                        var i = o[n];
                        if (c && c.length > 0) {
                            var t = i.getAttribute("data-cookiecategory");
                            if (t) {
                                c.forEach(function(e) {
                                    t = t.replace(e, "").trim();
                                });
                                if (t.length > 0) {
                                    continue;
                                }
                            }
                        }
                        i.setAttribute("href", i.getAttribute("data-href"));
                        i.removeAttribute("data-cookiescript");
                    }
                }
            },
            Y = function() {
                document.addEventListener(
                    "focusin",
                    function(e) {
                        var c = document.getElementById("cookiescript_injected");
                        if (c) {
                            e.preventDefault();
                            e.stopPropagation();
                            c.focus();
                        }
                    }, { once: !0 }
                );
            },
            Cc = function(e) {
                return !1;
            },
            Le = function() {
                return !1;
            },
            G = function() {
                return !1;
            },
            Te = function() {
                if (ee()) {
                    var e = y();
                    ie(e);
                }
            },
            L = function() {
                Ne();
                var e = document.getElementById("cookiescript_injected");
                if (e) {
                    setTimeout(function() {
                        M(e, 200, Y);
                    }, 200);
                    Le();
                } else {
                    setTimeout(function() {
                        K();
                    }, 150);
                }
            },
            l = function(e) {
                var t = document.getElementById("cookiescript_injected"),
                    c = document.getElementById("cookiescript_injected_fsd");
                if (t) {
                    de(t, e || 200);
                    Ie();
                }
                if (c) {
                    de(c, 200, function() {
                        c.parentNode.removeChild(c);
                    });
                }
                G();
            },
            m = function() {
                return !1;
            },
            Ne = function(e) {
                return !1;
            },
            Lc = function() {
                return !1;
            },
            Ie = function() {
                return !1;
            },
            Tc = function(e) {
                return !1;
            },
            De = function(e, c, t) {
                var p = e.target || e.srcElement,
                    d = p.getAttribute(c);
                if (d && d.length > 0) {
                    var s = document.querySelectorAll("div[" + t + "]");
                    if (s) {
                        for (var r = 0; r < s.length; r++) {
                            var i = s[r],
                                n = i.getAttribute(t),
                                a = n && n === d,
                                o = document.querySelector("div[" + c + '="' + n + '"]');
                            if (o) {
                                o.classList.remove("cookiescript_active");
                                a && o.classList.add("cookiescript_active");
                            }
                            i.classList.add("cookiescript_hidden");
                            a && i.classList.remove("cookiescript_hidden");
                        }
                    }
                }
            },
            V = function() {
                var c = document.querySelector(
                        '[data-cs-consent-key-box="cookie-script"]'
                    ),
                    t = document.querySelector('[data-cs-consent-key="cookie-script"]');
                if (c && t) {
                    var e = r("key");
                    if (e && typeof e === "string" && e.length > 0) {
                        t.innerText = e;
                        c.style.display = "";
                    }
                }
            },
            Nc = function() {
                return !1;
            },
            Me = function() {
                var c = ec(),
                    t = function(e) {
                        e.classList.remove("mdc-switch--unselected");
                        e.classList.add("mdc-switch--selected");
                    },
                    i = function(e) {
                        e.classList.remove("mdc-switch--selected");
                        e.classList.add("mdc-switch--unselected");
                    };
                e(
                    c,
                    "click",
                    function(e) {
                        var c = e.currentTarget,
                            n,
                            r = c.getAttribute("data-cs-switch");
                        if (c.classList.contains("mdc-switch--selected")) {
                            i(c);
                            n = !1;
                        } else {
                            t(c);
                            n = !0;
                        }
                        var o = document.querySelector(
                            'input[data-cookiescript="checkbox-input"][value="' + r + '"]'
                        );
                        if (r === "strict") {
                            o.checked = !0;
                        } else {
                            o.checked = n;
                        }
                    }, !0
                );
                var n = x();
                e(
                    n,
                    "change",
                    function(e) {
                        var n = e.currentTarget;
                        c.forEach(function(e) {
                            if (n.value === e.getAttribute("data-cs-switch")) {
                                if (n.checked) {
                                    t(e);
                                } else {
                                    i(e);
                                }
                            }
                        });
                    }, !0
                );
            },
            Be = function() {
                var c = document.getElementById("cookiescript_save"),
                    i = document.getElementById("cookiescript_accept"),
                    n = document.getElementById("cookiescript_reject"),
                    o = document.getElementById("cookiescript_close");
                e(c, "click", function() {
                    t.acceptAction();
                });
                e(c, "keydown", function(e) {
                    if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
                        e.preventDefault();
                        c.click();
                    }
                });
                e(i, "click", function() {
                    t.acceptAllAction();
                });
                e(i, "keydown", function(e) {
                    if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
                        e.preventDefault();
                        i.click();
                    }
                });
                e(n, "click", function() {
                    t.rejectAllAction();
                });
                e(n, "keydown", function(e) {
                    if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
                        e.preventDefault();
                        n.click();
                    }
                });
                e(
                    document.getElementById("cookiescript_readmore"),
                    "click",
                    function() {
                        h("readmore", "");
                    }
                );
                e(o, "click", function() {
                    l();
                    m();
                    h("close", "");
                    dc();
                });
                e(o, "keydown", function(e) {
                    if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
                        e.preventDefault();
                        o.click();
                    }
                });
                e(
                    document.querySelectorAll(
                        'div[data-cs-maintabs="cookiescript"] > div'
                    ),
                    "click",
                    function(e) {
                        De(e, "data-cs-maintab", "data-cs-maintab-content");
                    }, !0
                );
                V();
                window.addEventListener("CookieScriptConsentKeyUpdate", V);
            },
            Re = function() {},
            Ic = function() {
                Me();
                e(
                    document.querySelectorAll("[data-cs-cookies-info-control]"),
                    "click",
                    function(e) {
                        var c = e.currentTarget,
                            i = c.getAttribute("data-cs-cookies-info-control"),
                            t = document.querySelector('[data-cs-cookies-info="' + i + '"]');
                        if (c.classList.contains("active")) {
                            t.classList.add("cookiescript_hidden");
                            c.querySelector("[data-cs-cookies-open-text]").classList.remove(
                                "cookiescript_hidden"
                            );
                            c.querySelector("[data-cs-cookies-close-text]").classList.add(
                                "cookiescript_hidden"
                            );
                            c.classList.remove("active");
                        } else {
                            t.classList.remove("cookiescript_hidden");
                            c.querySelector("[data-cs-cookies-open-text]").classList.add(
                                "cookiescript_hidden"
                            );
                            c.querySelector("[data-cs-cookies-close-text]").classList.remove(
                                "cookiescript_hidden"
                            );
                            c.classList.add("active");
                        }
                    }, !0
                );
                if (!J) {
                    Q();
                    J = !0;
                }
            },
            Dc = function() {
                return !1;
            },
            K = function() {
                B(document.body, yc);
                z();
                ye();
                var e = document.getElementById("cookiescript_injected");
                M(e, 200, Y);
                Be();
                Re();
                Te();
            },
            Oe = function() {
                if (me.length > 0) {
                    B(document.body, me);
                    var c = document.getElementById("cookiescript_badge");
                    setTimeout(function() {
                        z(c);
                        M(c, 200);
                    }, 200);
                    e(c, "click", function() {
                        L();
                    });
                    e(c, "keydown", function(e) {
                        if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
                            e.preventDefault();
                            c.click();
                        }
                    });
                }
            },
            Q = function() {
                return !1;
            },
            Xe = function() {
                var e = document.querySelector('style[data-type="cookiescriptstyles"]'),
                    c = document.getElementById("cookiescript_injected"),
                    t = document.getElementById("cookiescript_badge");
                if (c) {
                    c.parentNode.removeChild(c);
                }
                if (t) {
                    t.parentNode.removeChild(t);
                }
                if (e) {
                    e.parentNode.removeChild(e);
                }
                G();
            },
            Fe = function() {
                var s = document.querySelectorAll(
                        'iframe[data-cookiescript="accepted"]'
                    ),
                    i = Array.prototype.slice.call(s);
                if (i.length > 0) {
                    for (var t = 0; t < i.length; t++) {
                        var e = i[t];
                        if (!e.getAttribute("src")) {
                            var n = e.getAttribute("alt") || "",
                                o = e.getAttribute("data-alt-img"),
                                r = n;
                            if (o) {
                                r = '<img alt="' + n + '" src="' + o + '" />';
                            }
                            var c = e.contentWindow ?
                                e.contentWindow :
                                e.contentDocument.document ?
                                e.contentDocument.document :
                                e.contentDocument;
                            c.document.open();
                            c.document.write(r);
                            c.document.close();
                        }
                    }
                }
            },
            v = function(e) {
                var c = document.getElementById("csconsentcheckbox");
                if (c) {
                    c.checked = e;
                }
            },
            Ue = function() {
                var i = document.getElementById("csconsentcheckbox");
                e(i, "change", function(e) {
                    var c = e.target || e.srcElement;
                    if (c.checked) {
                        t.acceptAllAction();
                    } else {
                        t.rejectAllAction();
                    }
                });
                var c = document.getElementById("csconsentlink");
                e(c, "click", function() {
                    L();
                });
            },
            Pe = function() {
                return !1;
            },
            Mc = function() {
                return !1;
            },
            Je = function() {
                var e = parseInt(10000);
                setTimeout(function() {
                    l(400);
                    m();
                }, e);
            },
            He = function() {
                return !1;
            },
            We = function() {
                return !1;
            },
            Ye = function(e) {
                var i = [];
                for (var t = 0; t < i.length; t++) {
                    var c = i[t];
                    if (c.regexp) {
                        var n = lc(c.name);
                        if (e.match(n)) {
                            return !0;
                        }
                    } else {
                        if (e === c.name) {
                            return !0;
                        }
                    }
                }
                return !1;
            },
            Ge = function(e, c) {
                var t = ["strict"];
                if (typeof c !== "undefined") {
                    t = c.slice();
                    t.push("strict");
                    t = f(t);
                }
                for (var n = 0; n < t.length; n++) {
                    var i = Sc[t[n]];
                    if (i) {
                        if (j(i, e) || Ke({ cNames: i, cookieName: e })) {
                            return !0;
                        }
                    }
                }
                return !1;
            },
            Ve = function(e) {
                return !1;
            },
            Ke = function(e) {
                var o = e.cNames,
                    r = e.cookieName,
                    s = !!e.onlyCheckPattern,
                    t = [
                        { pattern: "^[a-f0-9]{32}$", name: "[abcdef0123456789]{32}" },
                        {
                            pattern: "^PrestaShop-[a-f0-9]{32}$",
                            name: "PrestaShop-[abcdef0123456789]{32}",
                        },
                        {
                            pattern: "^LF_session_[a-f0-9]{32}$",
                            name: "LF_session_[abcdef0123456789]{32}",
                        },
                        {
                            pattern: "^cid_[a-f0-9]{32}$",
                            name: "cid_[abcdef0123456789]{32}",
                        },
                        {
                            pattern: "^wp_woocommerce_session_[a-f0-9]{32}$",
                            name: "wp_woocommerce_session_[abcdef0123456789]{32}",
                        },
                        {
                            pattern: "^visa_1_[a-f0-9]{32}$",
                            name: "visa_1_[abcdef0123456789]{32}",
                        },
                        {
                            pattern: "^yith_wcwl_session_[a-f0-9]{32}$",
                            name: "yith_wcwl_session_[abcdef0123456789]{32}",
                        },
                        {
                            pattern: "^mp_[a-f0-9]{32}_mixpanel$",
                            name: "mp_[abcdef0123456789]{32}_mixpanel",
                        },
                        { pattern: "^ps[a-f0-9]{24}$", name: "ps[abcdef0123456789]{24}" },
                    ];
                for (var c = 0; c < t.length; c++) {
                    var i = t[c]["pattern"],
                        n = new RegExp(i, "i");
                    if (n.test(r)) {
                        if (s) {
                            return !0;
                        } else {
                            if (j(o, t[c]["name"])) {
                                return !0;
                            }
                        }
                    }
                }
                return !1;
            },
            ee = function() {
                var e = r("action");
                return Boolean(e && e === "accept");
            },
            Qe = function() {
                var e = r("action"),
                    c = y();
                return Boolean(e && e === "accept" && c.length === i.length);
            },
            T = function() {
                var e = r("action");
                return Boolean(e && (e === "accept" || e === "reject"));
            },
            ce = function() {
                return c.get("CookieScriptScanner");
            },
            ec = function() {
                var e = document.querySelectorAll("[data-cs-switch]");
                if (typeof e !== "undefined") {
                    return Array.prototype.slice.call(e);
                }
                return [];
            },
            x = function() {
                var e = document.querySelectorAll(
                    'input[data-cookiescript="checkbox-input"]'
                );
                if (typeof e !== "undefined") {
                    return Array.prototype.slice.call(e);
                }
                return [];
            },
            N = function(e) {
                var t = [];
                for (var c = 0; c < e.length; c++) {
                    if (e[c] !== "strict") {
                        t.push(e[c]);
                    }
                }
                return t;
            },
            te = function(e) {
                var i = x();
                for (var t = 0; t < i.length; t++) {
                    var c = i[t];
                    if (c.value === "strict") {
                        c.checked = !0;
                    } else {
                        c.checked = e;
                    }
                    D("change", c);
                }
            },
            ie = function(e) {
                var i = x();
                for (var t = 0; t < i.length; t++) {
                    var c = i[t];
                    if (c.value === "strict" || j(e, c.value)) {
                        c.checked = !0;
                    } else {
                        c.checked = !1;
                    }
                    D("change", c);
                }
            },
            I = function(e) {
                if (
                    typeof CookieScriptReport !== "undefined" &&
                    CookieScriptReport.instance
                ) {
                    CookieScriptReport.instance.setStateCheckboxes(e);
                }
            },
            cc = function() {
                var t = [],
                    i = x();
                for (var c = 0; c < i.length; c++) {
                    var e = i[c];
                    if (e.checked || e.value === "strict") {
                        t.push(e.value);
                    }
                }
                return f(t);
            },
            y = function() {
                var i = r("categories"),
                    c = [];
                if (X) {
                    c = ["strict"];
                }
                if (i) {
                    try {
                        var t = JSON.parse(i);
                        if (X) {
                            t.push("strict");
                        }
                        return f(t);
                    } catch (e) {
                        return c;
                    }
                }
                return c;
            },
            tc = function() {
                var e = document.querySelector('span[data-cs-desc-box="true"]');
                if (e) {
                    return e.getAttribute("data-cs-i18n-read");
                }
                return "";
            },
            ic = function(e) {
                try {
                    var t = new XMLHttpRequest();
                    t.open("GET", e.url);
                    t.onload = function() {
                        if (t.status === 200) {
                            try {
                                var i = JSON.parse(t.responseText);
                                e.done(i);
                            } catch (c) {
                                e.done(t.responseText);
                            }
                        } else {
                            a(
                                "ERROR: Request failed.  Returned status for " +
                                url +
                                " of " +
                                t.status
                            );
                        }
                    };
                    t.send();
                } catch (c) {
                    a("ERROR: Yor browser not support request");
                }
            },
            n = function(e, c) {
                var i = oe();
                i[e] = c;
                try {
                    var n = re(JSON.stringify(i));
                    ne(n);
                } catch (t) {
                    a("Error: Write " + cookieName + "value =>" + t);
                }
            },
            ne = function(e) {
                var i = { expires: Number(fe), domain: se };
                var n = document.querySelector("script[data-cs-samesite]");
                if (n) {
                    var t = n.getAttribute("data-cs-samesite");
                    if (t) {
                        i.sameSite = t;
                        if (t === "none") {
                            i.secure = !0;
                        }
                    }
                }
                c.set(b(), e, i);
            },
            r = function(e) {
                var c = oe();
                return c[e];
            },
            oe = function() {
                var t = c.get(b(), { domain: se });
                try {
                    return JSON.parse(t);
                } catch (e) {
                    return {};
                }
            },
            re = function(e) {
                return e;
            },
            nc = function() {
                D("DOMContentLoaded", window.document);
            },
            oc = function() {
                t.onAcceptAll();
                d("CookieScriptAcceptAll");
                if (typeof i !== "undefined" && i.length > 0) {
                    for (var e = 0; e < i.length; e++) {
                        s(i[e]);
                    }
                } else {
                    s("all");
                }
            },
            rc = function(e) {
                var i = { categories: f(e) };
                t.onAccept(i);
                d("CookieScriptAccept", i);
                for (var c = 0; c < e.length; c++) {
                    s(e[c]);
                }
            },
            sc = function() {
                t.onReject();
                d("CookieScriptReject");
                s("strict");
            },
            dc = function() {
                t.onClose();
                d("CookieScriptClose");
            },
            s = function(e) {
                var c = "CookieScriptCategory-" + e;
                if (j(t.dispatchEventNames, c)) return;
                t.dispatchEventNames.push(c);
                t.dispatchEventNames = f(t.dispatchEventNames);
                d(c);
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ event: c });
            },
            se = (function() {
                return null;
            })(),
            d = function(e, c) {
                try {
                    var i;
                    if (typeof Event === "function") {
                        i = new CustomEvent(e, { bubbles: !0, cancelable: !0, detail: c });
                    } else {
                        i = document.createEvent("CustomEvent");
                        i.initCustomEvent(e, !0, !0, c);
                    }
                    window.document.dispatchEvent(i);
                } catch (t) {
                    a("Warning: You browser not support dispatch event");
                }
            },
            D = function(e, c) {
                try {
                    var i;
                    if (typeof Event === "function") {
                        i = new Event(e, { bubbles: !0, cancelable: !0 });
                    } else {
                        i = document.createEvent("Event");
                        i.initEvent(e, !0, !0);
                    }
                    c.dispatchEvent(i);
                } catch (t) {
                    a("Warning: You browser not support dispatch event");
                }
            },
            M = function(e, c, t) {
                var o = pe(e, "opacity"),
                    r = o ? o : 1;
                e.style.opacity = 0;
                e.style.display = "";
                var n = +new Date(),
                    i = function() {
                        e.style.opacity = +e.style.opacity + (new Date() - n) / c;
                        n = +new Date();
                        if (+e.style.opacity < r) {
                            (window.requestAnimationFrame && requestAnimationFrame(i)) ||
                            setTimeout(i, 16);
                        } else {
                            e.style.opacity = "";
                            if (t !== undefined) {
                                t();
                            }
                        }
                    };
                i();
            },
            de = function(e, c, t) {
                var o = pe(e, "opacity");
                e.style.opacity = o ? o : 1;
                var n = +new Date(),
                    i = function() {
                        e.style.opacity = +e.style.opacity - (new Date() - n) / c;
                        n = +new Date();
                        if (+e.style.opacity > 0) {
                            (window.requestAnimationFrame && requestAnimationFrame(i)) ||
                            setTimeout(i, 16);
                        } else {
                            e.style.display = "none";
                            e.style.opacity = "";
                            if (t !== undefined) {
                                t();
                            }
                        }
                    };
                i();
            },
            j = function(e, c) {
                var t = !1,
                    i = e.indexOf(c);
                if (i >= 0) {
                    t = !0;
                }
                return t;
            },
            ac = function(e, c) {
                e.insertAdjacentElement("afterend", c);
                e.parentNode.removeChild(e);
            },
            ae = function(e, c) {
                e.insertAdjacentHTML("afterend", c);
                e.parentNode.removeChild(e);
            },
            B = function(e, c) {
                e.insertAdjacentHTML("beforeend", c);
            },
            f = function(e) {
                var t = [];
                for (var c = 0; c < e.length; c++) {
                    if (t.indexOf(e[c]) === -1 && e[c] !== "") {
                        t.push(e[c]);
                    }
                }
                return t;
            },
            a = function(e) {
                console &&
                    ("function" == typeof console.warn ?
                        console.warn(e) :
                        console.log && console.log(e));
            },
            pc = function(e) {
                throw e;
            },
            e = function(e, c, t, n) {
                var o = function(e, c, t) {
                    if (!e) return;
                    try {
                        if (e.attachEvent) {
                            e["e" + c + t] = t;
                            e[c + t] = function() {
                                e["e" + c + t](window.event);
                            };
                            e.attachEvent("on" + c, e[c + t]);
                        } else {
                            e.addEventListener(c, t, !1);
                        }
                    } catch (i) {}
                };
                if (n && e && e.length > 0) {
                    for (var i = 0; i < e.length; i++) {
                        o(e[i], c, t);
                    }
                } else {
                    o(e, c, t);
                }
            },
            Bc = function(e, c, t, n) {
                var o = function(e, c, t) {
                    if (!e) return;
                    if (e.detachEvent) {
                        e.detachEvent("on" + c, e[c + t]);
                        e[c + t] = null;
                    } else {
                        e.removeEventListener(c, t, !1);
                    }
                };
                if (n && e && e.length > 0) {
                    for (var i = 0; i < e.length; i++) {
                        o(e[i], c, t);
                    }
                } else {
                    o(e, c, t);
                }
            },
            pe = function(e, c) {
                if (typeof getComputedStyle !== "undefined") {
                    return getComputedStyle(e, null).getPropertyValue(c);
                } else {
                    return e.currentStyle[c];
                }
            },
            c = (function() {
                /*! js-cookie v3.0.0-rc.0 | MIT */
                function e(e) {
                    for (var c = 1; c < arguments.length; c++) {
                        var i = arguments[c];
                        for (var t in i) {
                            e[t] = i[t];
                        }
                    }
                    return e;
                }
                var c = {
                    read: function(e) {
                        return e.replace(/%3B/g, ";");
                    },
                    write: function(e) {
                        return e.replace(/;/g, "%3B");
                    },
                };

                function t(i, n) {
                    function o(t, o, r) {
                        if (typeof document === "undefined") {
                            return;
                        }
                        r = e({}, n, r);
                        if (typeof r.expires === "number") {
                            var a = new Date();
                            a.setTime(a.getTime() + r.expires * 864e5);
                            r.expires = a;
                        }
                        if (r.expires) {
                            r.expires = r.expires.toUTCString();
                        }
                        t = c.write(t).replace(/=/g, "%3D");
                        o = i.write(String(o), t);
                        var d = "";
                        for (var s in r) {
                            if (!r[s]) {
                                continue;
                            }
                            d += "; " + s;
                            if (r[s] === !0) {
                                continue;
                            }
                            d += "=" + r[s].split(";")[0];
                        }
                        return (document.cookie = t + "=" + o + d);
                    }

                    function r(e) {
                        if (typeof document === "undefined" || (arguments.length && !e)) {
                            return;
                        }
                        var s = document.cookie ? document.cookie.split("; ") : [],
                            o = {};
                        for (var n = 0; n < s.length; n++) {
                            var r = s[n].split("="),
                                d = r.slice(1).join("="),
                                t = c.read(r[0]).replace(/%3D/g, "=");
                            o[t] = i.read(d, t);
                            if (e === t) {
                                break;
                            }
                        }
                        return e ? o[e] : o;
                    }
                    return Object.create({
                        set: o,
                        get: r,
                        remove: function(c, t) {
                            o(c, "", e({}, t, { expires: -1 }));
                        },
                        withAttributes: function(c) {
                            return t(this.converter, e({}, this.attributes, c));
                        },
                        withConverter: function(c) {
                            return t(e({}, this.converter, c), this.attributes);
                        },
                    }, {
                        attributes: { value: Object.freeze(n) },
                        converter: { value: Object.freeze(i) },
                    });
                }
                var i = window.location.protocol === "https:";
                return t(c, { path: "/", secure: i });
            })(),
            lc = function(e) {
                if (typeof e !== "string") {
                    return e;
                }
                var c = e.match(/(\/?)(.+)\1([a-z]*)/i);
                if (c[3] && !/^(?!.*?(.).*?\1)[gmixXsuUAJ]+$/.test(c[3])) {
                    return RegExp(e);
                }
                return new RegExp(c[2], c[3]);
            },
            Rc = function() {
                var i = "cookie-script.com/s/718eab40eeb41dc3d507c59b372b490c.js",
                    t = document.getElementsByTagName("script");
                for (var e = 0; e < t.length; e++) {
                    var c = t[e].getAttribute("src");
                    if (c && c.indexOf(i) >= 0) {
                        return !0;
                    }
                }
                pc("not allowed use of Cookie-Script");
            },
            mc = function(e, c) {
                e = e.replace(/[\[\]]/g, "\\$&");
                var i = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)"),
                    t = i.exec(c);
                if (!t) return null;
                if (!t[2]) return "";
                return decodeURIComponent(t[2].replace(/\+/g, " "));
            },
            fc = function() {
                var t = b(),
                    c = mc(t, window.location.href);
                if (c) {
                    try {
                        c = re(c);
                        ne(c);
                    } catch (e) {
                        a(
                            "Error: Write(_loadCookieValueFromUrlArgs) " + t + "value =>" + e
                        );
                    }
                }
            },
            h = function(e, c) {
                return !1;
            },
            A = function(e, c) {
                P = !0;
                var t = tc(),
                    i =
                    "yes" === navigator.doNotTrack ||
                    "1" === navigator.msDoNotTrack ||
                    "1" === navigator.doNotTrack ||
                    !1 === navigator.cookieEnabled;
                ic({
                    url: "https://consent.cookie-script.com/collect?action=" +
                        e +
                        "&time=" +
                        new Date().getTime() +
                        "&page=" +
                        encodeURIComponent(Ac) +
                        "&dnt=" +
                        i +
                        "&script=" +
                        he +
                        "&consenttext=" +
                        encodeURIComponent(t) +
                        "&category=" +
                        c,
                    done: function(e) {
                        if (e !== null && e.key) {
                            n("key", e.key);
                            d("CookieScriptConsentKeyUpdate");
                            P = !1;
                        }
                    },
                });
            },
            u = function(e, c) {
                return !1;
            },
            k = function(e, c) {
                return !1;
            },
            hc = function(e) {},
            R = function(e) {
                return !1;
            },
            uc = function() {
                return !1;
            },
            O = function() {
                return !1;
            },
            le = function() {
                kc();
            },
            kc = function() {
                var c = document.querySelector(
                    'script[data-cs-restrict-domain="true"]'
                );
                if (c) {
                    var e = window.location.host.replace(/^www\./, "");
                    if (e !== wc) {
                        W({ console: !1 });
                        return;
                    }
                }
                if (!ce()) {
                    H();
                }
                setTimeout(function() {
                    fc();
                    Xe();
                    B(document.body, xc);
                    if (Qe()) {
                        v(!0);
                    }
                    if (T()) {
                        Oe();
                    } else {
                        if (!We()) {
                            K();
                            Je();
                            He();
                        }
                    }
                    Fe();
                    Ue();
                    Pe();
                    d("CookieScriptLoaded");
                    hc(T());
                }, w);
            },
            bc = function() {};
        (function() {
            if (CookieScript.instance) return;
            bc();
            uc();
            H();
            if (document.readyState === "complete") {
                le();
            } else {
                window.addEventListener("load", le);
            }
        })();
    };
    CookieScript.init = function() {
        if (CookieScript.instance) {
            return CookieScript.instance;
        }
        CookieScript.instance = new CookieScript();
        return CookieScript.instance;
    };
    CookieScript.init();
}