/* PrismJS 1.23.0
https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript+aspnet+c+csharp+cpp+django+editorconfig+git+go+http+icon+java+jq+json+json5+less+markdown+markup-templating+matlab+mongodb+pcaxis+php+plsql+python+r+sass+scss+sql+typescript+uri+vim+xml-doc */
var _self =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope
      ? self
      : {},
  Prism = (function (u) {
    var c = /\blang(?:uage)?-([\w-]+)\b/i,
      n = 0,
      e = {},
      M = {
        manual: u.Prism && u.Prism.manual,
        disableWorkerMessageHandler:
          u.Prism && u.Prism.disableWorkerMessageHandler,
        util: {
          encode: function e(n) {
            return n instanceof W
              ? new W(n.type, e(n.content), n.alias)
              : Array.isArray(n)
              ? n.map(e)
              : n
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/\u00a0/g, " ");
          },
          type: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1);
          },
          objId: function (e) {
            return (
              e.__id || Object.defineProperty(e, "__id", { value: ++n }), e.__id
            );
          },
          clone: function t(e, r) {
            var a, n;
            switch (((r = r || {}), M.util.type(e))) {
              case "Object":
                if (((n = M.util.objId(e)), r[n])) return r[n];
                for (var i in ((a = {}), (r[n] = a), e))
                  e.hasOwnProperty(i) && (a[i] = t(e[i], r));
                return a;
              case "Array":
                return (
                  (n = M.util.objId(e)),
                  r[n]
                    ? r[n]
                    : ((a = []),
                      (r[n] = a),
                      e.forEach(function (e, n) {
                        a[n] = t(e, r);
                      }),
                      a)
                );
              default:
                return e;
            }
          },
          getLanguage: function (e) {
            for (; e && !c.test(e.className); ) e = e.parentElement;
            return e
              ? (e.className.match(c) || [, "none"])[1].toLowerCase()
              : "none";
          },
          currentScript: function () {
            if ("undefined" == typeof document) return null;
            if ("currentScript" in document) return document.currentScript;
            try {
              throw new Error();
            } catch (e) {
              var n = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1];
              if (n) {
                var t = document.getElementsByTagName("script");
                for (var r in t) if (t[r].src == n) return t[r];
              }
              return null;
            }
          },
          isActive: function (e, n, t) {
            for (var r = "no-" + n; e; ) {
              var a = e.classList;
              if (a.contains(n)) return !0;
              if (a.contains(r)) return !1;
              e = e.parentElement;
            }
            return !!t;
          },
        },
        languages: {
          plain: e,
          plaintext: e,
          text: e,
          txt: e,
          extend: function (e, n) {
            var t = M.util.clone(M.languages[e]);
            for (var r in n) t[r] = n[r];
            return t;
          },
          insertBefore: function (t, e, n, r) {
            var a = (r = r || M.languages)[t],
              i = {};
            for (var l in a)
              if (a.hasOwnProperty(l)) {
                if (l == e)
                  for (var o in n) n.hasOwnProperty(o) && (i[o] = n[o]);
                n.hasOwnProperty(l) || (i[l] = a[l]);
              }
            var s = r[t];
            return (
              (r[t] = i),
              M.languages.DFS(M.languages, function (e, n) {
                n === s && e != t && (this[e] = i);
              }),
              i
            );
          },
          DFS: function e(n, t, r, a) {
            a = a || {};
            var i = M.util.objId;
            for (var l in n)
              if (n.hasOwnProperty(l)) {
                t.call(n, l, n[l], r || l);
                var o = n[l],
                  s = M.util.type(o);
                "Object" !== s || a[i(o)]
                  ? "Array" !== s || a[i(o)] || ((a[i(o)] = !0), e(o, t, l, a))
                  : ((a[i(o)] = !0), e(o, t, null, a));
              }
          },
        },
        plugins: {},
        highlightAll: function (e, n) {
          M.highlightAllUnder(document, e, n);
        },
        highlightAllUnder: function (e, n, t) {
          var r = {
            callback: t,
            container: e,
            selector:
              'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          };
          M.hooks.run("before-highlightall", r),
            (r.elements = Array.prototype.slice.apply(
              r.container.querySelectorAll(r.selector)
            )),
            M.hooks.run("before-all-elements-highlight", r);
          for (var a, i = 0; (a = r.elements[i++]); )
            M.highlightElement(a, !0 === n, r.callback);
        },
        highlightElement: function (e, n, t) {
          var r = M.util.getLanguage(e),
            a = M.languages[r];
          e.className =
            e.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r;
          var i = e.parentElement;
          i &&
            "pre" === i.nodeName.toLowerCase() &&
            (i.className =
              i.className.replace(c, "").replace(/\s+/g, " ") +
              " language-" +
              r);
          var l = { element: e, language: r, grammar: a, code: e.textContent };
          function o(e) {
            (l.highlightedCode = e),
              M.hooks.run("before-insert", l),
              (l.element.innerHTML = l.highlightedCode),
              M.hooks.run("after-highlight", l),
              M.hooks.run("complete", l),
              t && t.call(l.element);
          }
          if (
            (M.hooks.run("before-sanity-check", l),
            (i = l.element.parentElement) &&
              "pre" === i.nodeName.toLowerCase() &&
              !i.hasAttribute("tabindex") &&
              i.setAttribute("tabindex", "0"),
            !l.code)
          )
            return M.hooks.run("complete", l), void (t && t.call(l.element));
          if ((M.hooks.run("before-highlight", l), l.grammar))
            if (n && u.Worker) {
              var s = new Worker(M.filename);
              (s.onmessage = function (e) {
                o(e.data);
              }),
                s.postMessage(
                  JSON.stringify({
                    language: l.language,
                    code: l.code,
                    immediateClose: !0,
                  })
                );
            } else o(M.highlight(l.code, l.grammar, l.language));
          else o(M.util.encode(l.code));
        },
        highlight: function (e, n, t) {
          var r = { code: e, grammar: n, language: t };
          return (
            M.hooks.run("before-tokenize", r),
            (r.tokens = M.tokenize(r.code, r.grammar)),
            M.hooks.run("after-tokenize", r),
            W.stringify(M.util.encode(r.tokens), r.language)
          );
        },
        tokenize: function (e, n) {
          var t = n.rest;
          if (t) {
            for (var r in t) n[r] = t[r];
            delete n.rest;
          }
          var a = new i();
          return (
            I(a, a.head, e),
            (function e(n, t, r, a, i, l) {
              for (var o in r)
                if (r.hasOwnProperty(o) && r[o]) {
                  var s = r[o];
                  s = Array.isArray(s) ? s : [s];
                  for (var u = 0; u < s.length; ++u) {
                    if (l && l.cause == o + "," + u) return;
                    var c = s[u],
                      g = c.inside,
                      f = !!c.lookbehind,
                      h = !!c.greedy,
                      d = c.alias;
                    if (h && !c.pattern.global) {
                      var p = c.pattern.toString().match(/[imsuy]*$/)[0];
                      c.pattern = RegExp(c.pattern.source, p + "g");
                    }
                    for (
                      var v = c.pattern || c, m = a.next, y = i;
                      m !== t.tail && !(l && y >= l.reach);
                      y += m.value.length, m = m.next
                    ) {
                      var b = m.value;
                      if (t.length > n.length) return;
                      if (!(b instanceof W)) {
                        var k,
                          x = 1;
                        if (h) {
                          if (!(k = z(v, y, n, f))) break;
                          var w = k.index,
                            A = k.index + k[0].length,
                            P = y;
                          for (P += m.value.length; P <= w; )
                            (m = m.next), (P += m.value.length);
                          if (
                            ((P -= m.value.length),
                            (y = P),
                            m.value instanceof W)
                          )
                            continue;
                          for (
                            var E = m;
                            E !== t.tail &&
                            (P < A || "string" == typeof E.value);
                            E = E.next
                          )
                            x++, (P += E.value.length);
                          x--, (b = n.slice(y, P)), (k.index -= y);
                        } else if (!(k = z(v, 0, b, f))) continue;
                        var w = k.index,
                          S = k[0],
                          O = b.slice(0, w),
                          L = b.slice(w + S.length),
                          N = y + b.length;
                        l && N > l.reach && (l.reach = N);
                        var j = m.prev;
                        O && ((j = I(t, j, O)), (y += O.length)), q(t, j, x);
                        var C = new W(o, g ? M.tokenize(S, g) : S, d, S);
                        if (((m = I(t, j, C)), L && I(t, m, L), 1 < x)) {
                          var _ = { cause: o + "," + u, reach: N };
                          e(n, t, r, m.prev, y, _),
                            l && _.reach > l.reach && (l.reach = _.reach);
                        }
                      }
                    }
                  }
                }
            })(e, a, n, a.head, 0),
            (function (e) {
              var n = [],
                t = e.head.next;
              for (; t !== e.tail; ) n.push(t.value), (t = t.next);
              return n;
            })(a)
          );
        },
        hooks: {
          all: {},
          add: function (e, n) {
            var t = M.hooks.all;
            (t[e] = t[e] || []), t[e].push(n);
          },
          run: function (e, n) {
            var t = M.hooks.all[e];
            if (t && t.length) for (var r, a = 0; (r = t[a++]); ) r(n);
          },
        },
        Token: W,
      };
    function W(e, n, t, r) {
      (this.type = e),
        (this.content = n),
        (this.alias = t),
        (this.length = 0 | (r || "").length);
    }
    function z(e, n, t, r) {
      e.lastIndex = n;
      var a = e.exec(t);
      if (a && r && a[1]) {
        var i = a[1].length;
        (a.index += i), (a[0] = a[0].slice(i));
      }
      return a;
    }
    function i() {
      var e = { value: null, prev: null, next: null },
        n = { value: null, prev: e, next: null };
      (e.next = n), (this.head = e), (this.tail = n), (this.length = 0);
    }
    function I(e, n, t) {
      var r = n.next,
        a = { value: t, prev: n, next: r };
      return (n.next = a), (r.prev = a), e.length++, a;
    }
    function q(e, n, t) {
      for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
      ((n.next = r).prev = n), (e.length -= a);
    }
    if (
      ((u.Prism = M),
      (W.stringify = function n(e, t) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) {
          var r = "";
          return (
            e.forEach(function (e) {
              r += n(e, t);
            }),
            r
          );
        }
        var a = {
            type: e.type,
            content: n(e.content, t),
            tag: "span",
            classes: ["token", e.type],
            attributes: {},
            language: t,
          },
          i = e.alias;
        i &&
          (Array.isArray(i)
            ? Array.prototype.push.apply(a.classes, i)
            : a.classes.push(i)),
          M.hooks.run("wrap", a);
        var l = "";
        for (var o in a.attributes)
          l +=
            " " +
            o +
            '="' +
            (a.attributes[o] || "").replace(/"/g, "&quot;") +
            '"';
        return (
          "<" +
          a.tag +
          ' class="' +
          a.classes.join(" ") +
          '"' +
          l +
          ">" +
          a.content +
          "</" +
          a.tag +
          ">"
        );
      }),
      !u.document)
    )
      return (
        u.addEventListener &&
          (M.disableWorkerMessageHandler ||
            u.addEventListener(
              "message",
              function (e) {
                var n = JSON.parse(e.data),
                  t = n.language,
                  r = n.code,
                  a = n.immediateClose;
                u.postMessage(M.highlight(r, M.languages[t], t)),
                  a && u.close();
              },
              !1
            )),
        M
      );
    var t = M.util.currentScript();
    function r() {
      M.manual || M.highlightAll();
    }
    if (
      (t &&
        ((M.filename = t.src),
        t.hasAttribute("data-manual") && (M.manual = !0)),
      !M.manual)
    ) {
      var a = document.readyState;
      "loading" === a || ("interactive" === a && t && t.defer)
        ? document.addEventListener("DOMContentLoaded", r)
        : window.requestAnimationFrame
        ? window.requestAnimationFrame(r)
        : window.setTimeout(r, 16);
    }
    return M;
  })(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism),
  "undefined" != typeof global && (global.Prism = Prism);
(Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: {
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: !0,
    inside: {
      "internal-subset": {
        pattern: /(\[)[\s\S]+(?=\]>$)/,
        lookbehind: !0,
        greedy: !0,
        inside: null,
      },
      string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
      punctuation: /^<!|>$|[[\]]/,
      "doctype-tag": /^DOCTYPE/,
      name: /[^\s<>'"]+/,
    },
  },
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: !0,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/,
        inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
      },
      "special-attr": [],
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/],
        },
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: { namespace: /^[^\s>\/:]+:/ },
      },
    },
  },
  entity: [
    { pattern: /&[\da-z]{1,8};/i, alias: "named-entity" },
    /&#x?[\da-f]{1,8};/i,
  ],
}),
  (Prism.languages.markup.tag.inside["attr-value"].inside.entity =
    Prism.languages.markup.entity),
  (Prism.languages.markup.doctype.inside["internal-subset"].inside =
    Prism.languages.markup),
  Prism.hooks.add("wrap", function (a) {
    "entity" === a.type &&
      (a.attributes.title = a.content.replace(/&amp;/, "&"));
  }),
  Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
    value: function (a, e) {
      var s = {};
      (s["language-" + e] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: !0,
        inside: Prism.languages[e],
      }),
        (s.cdata = /^<!\[CDATA\[|\]\]>$/i);
      var t = {
        "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s },
      };
      t["language-" + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] };
      var n = {};
      (n[a] = {
        pattern: RegExp(
          "(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(
            /__/g,
            function () {
              return a;
            }
          ),
          "i"
        ),
        lookbehind: !0,
        greedy: !0,
        inside: t,
      }),
        Prism.languages.insertBefore("markup", "cdata", n);
    },
  }),
  Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
    value: function (a, e) {
      Prism.languages.markup.tag.inside["special-attr"].push({
        pattern: RegExp(
          "(^|[\"'\\s])(?:" +
            a +
            ")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))",
          "i"
        ),
        lookbehind: !0,
        inside: {
          "attr-name": /^[^\s=]+/,
          "attr-value": {
            pattern: /=[\s\S]+/,
            inside: {
              value: {
                pattern: /(=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                lookbehind: !0,
                alias: [e, "language-" + e],
                inside: Prism.languages[e],
              },
              punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/],
            },
          },
        },
      });
    },
  }),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup),
  (Prism.languages.xml = Prism.languages.extend("markup", {})),
  (Prism.languages.ssml = Prism.languages.xml),
  (Prism.languages.atom = Prism.languages.xml),
  (Prism.languages.rss = Prism.languages.xml);
!(function (s) {
  var e = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
  (s.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
      inside: {
        rule: /^@[\w-]+/,
        "selector-function-argument": {
          pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
          lookbehind: !0,
          alias: "selector",
        },
        keyword: {
          pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
          lookbehind: !0,
        },
      },
    },
    url: {
      pattern: RegExp(
        "\\burl\\((?:" + e.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)",
        "i"
      ),
      greedy: !0,
      inside: {
        function: /^url/i,
        punctuation: /^\(|\)$/,
        string: { pattern: RegExp("^" + e.source + "$"), alias: "url" },
      },
    },
    selector: RegExp(
      "[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + e.source + ")*(?=\\s*\\{)"
    ),
    string: { pattern: e, greedy: !0 },
    property: /(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
    important: /!important\b/i,
    function: /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:,]/,
  }),
    (s.languages.css.atrule.inside.rest = s.languages.css);
  var t = s.languages.markup;
  t && (t.tag.addInlined("style", "css"), t.tag.addAttribute("style", "css"));
})(Prism);
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
  ],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  "class-name": {
    pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ },
  },
  keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/,
};
(Prism.languages.javascript = Prism.languages.extend("clike", {
  "class-name": [
    Prism.languages.clike["class-name"],
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
      lookbehind: !0,
    },
  ],
  keyword: [
    { pattern: /((?:^|})\s*)catch\b/, lookbehind: !0 },
    {
      pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: !0,
    },
  ],
  function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
  operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
})),
  (Prism.languages.javascript[
    "class-name"
  ][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
  Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
      lookbehind: !0,
      greedy: !0,
      inside: {
        "regex-source": {
          pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
          lookbehind: !0,
          alias: "language-regex",
          inside: Prism.languages.regex,
        },
        "regex-flags": /[a-z]+$/,
        "regex-delimiter": /^\/|\/$/,
      },
    },
    "function-variable": {
      pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
      alias: "function",
    },
    parameter: [
      {
        pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
  }),
  Prism.languages.insertBefore("javascript", "string", {
    hashbang: { pattern: /^#!.*/, greedy: !0, alias: "comment" },
    "template-string": {
      pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
      greedy: !0,
      inside: {
        "template-punctuation": { pattern: /^`|`$/, alias: "string" },
        interpolation: {
          pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
          lookbehind: !0,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\${|}$/,
              alias: "punctuation",
            },
            rest: Prism.languages.javascript,
          },
        },
        string: /[\s\S]+/,
      },
    },
  }),
  Prism.languages.markup &&
    (Prism.languages.markup.tag.addInlined("script", "javascript"),
    Prism.languages.markup.tag.addAttribute(
      "on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)",
      "javascript"
    )),
  (Prism.languages.js = Prism.languages.javascript);
!(function (s) {
  function a(e, s) {
    return e.replace(/<<(\d+)>>/g, function (e, n) {
      return "(?:" + s[+n] + ")";
    });
  }
  function t(e, n, s) {
    return RegExp(a(e, n), s || "");
  }
  function e(e, n) {
    for (var s = 0; s < n; s++)
      e = e.replace(/<<self>>/g, function () {
        return "(?:" + e + ")";
      });
    return e.replace(/<<self>>/g, "[^\\s\\S]");
  }
  var n =
      "bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void",
    i = "class enum interface struct",
    r =
      "add alias and ascending async await by descending from get global group into join let nameof not notnull on or orderby partial remove select set unmanaged value when where",
    o =
      "abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield";
  function l(e) {
    return "\\b(?:" + e.trim().replace(/ /g, "|") + ")\\b";
  }
  var d = l(i),
    p = RegExp(l(n + " " + i + " " + r + " " + o)),
    c = l(i + " " + r + " " + o),
    u = l(n + " " + i + " " + o),
    g = e("<(?:[^<>;=+\\-*/%&|^]|<<self>>)*>", 2),
    b = e("\\((?:[^()]|<<self>>)*\\)", 2),
    h = "@?\\b[A-Za-z_]\\w*\\b",
    f = a("<<0>>(?:\\s*<<1>>)?", [h, g]),
    m = a("(?!<<0>>)<<1>>(?:\\s*\\.\\s*<<1>>)*", [c, f]),
    k = "\\[\\s*(?:,\\s*)*\\]",
    y = a("<<0>>(?:\\s*(?:\\?\\s*)?<<1>>)*(?:\\s*\\?)?", [m, k]),
    w = a("(?:<<0>>|<<1>>)(?:\\s*(?:\\?\\s*)?<<2>>)*(?:\\s*\\?)?", [
      a("\\(<<0>>+(?:,<<0>>+)+\\)", [
        a("[^,()<>[\\];=+\\-*/%&|^]|<<0>>|<<1>>|<<2>>", [g, b, k]),
      ]),
      m,
      k,
    ]),
    v = { keyword: p, punctuation: /[<>()?,.:[\]]/ },
    x = "'(?:[^\r\n'\\\\]|\\\\.|\\\\[Uux][\\da-fA-F]{1,8})'",
    $ = '"(?:\\\\.|[^\\\\"\r\n])*"';
  (s.languages.csharp = s.languages.extend("clike", {
    string: [
      {
        pattern: t("(^|[^$\\\\])<<0>>", ['@"(?:""|\\\\[^]|[^\\\\"])*"(?!")']),
        lookbehind: !0,
        greedy: !0,
      },
      { pattern: t("(^|[^@$\\\\])<<0>>", [$]), lookbehind: !0, greedy: !0 },
      { pattern: RegExp(x), greedy: !0, alias: "character" },
    ],
    "class-name": [
      {
        pattern: t("(\\busing\\s+static\\s+)<<0>>(?=\\s*;)", [m]),
        lookbehind: !0,
        inside: v,
      },
      {
        pattern: t("(\\busing\\s+<<0>>\\s*=\\s*)<<1>>(?=\\s*;)", [h, w]),
        lookbehind: !0,
        inside: v,
      },
      { pattern: t("(\\busing\\s+)<<0>>(?=\\s*=)", [h]), lookbehind: !0 },
      { pattern: t("(\\b<<0>>\\s+)<<1>>", [d, f]), lookbehind: !0, inside: v },
      {
        pattern: t("(\\bcatch\\s*\\(\\s*)<<0>>", [m]),
        lookbehind: !0,
        inside: v,
      },
      { pattern: t("(\\bwhere\\s+)<<0>>", [h]), lookbehind: !0 },
      {
        pattern: t("(\\b(?:is(?:\\s+not)?|as)\\s+)<<0>>", [y]),
        lookbehind: !0,
        inside: v,
      },
      {
        pattern: t(
          "\\b<<0>>(?=\\s+(?!<<1>>)<<2>>(?:\\s*[=,;:{)\\]]|\\s+(?:in|when)\\b))",
          [w, u, h]
        ),
        inside: v,
      },
    ],
    keyword: p,
    number: /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:ul|lu|[dflmu])?\b/i,
    operator: />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
    punctuation: /\?\.?|::|[{}[\];(),.:]/,
  })),
    s.languages.insertBefore("csharp", "number", {
      range: { pattern: /\.\./, alias: "operator" },
    }),
    s.languages.insertBefore("csharp", "punctuation", {
      "named-parameter": {
        pattern: t("([(,]\\s*)<<0>>(?=\\s*:)", [h]),
        lookbehind: !0,
        alias: "punctuation",
      },
    }),
    s.languages.insertBefore("csharp", "class-name", {
      namespace: {
        pattern: t(
          "(\\b(?:namespace|using)\\s+)<<0>>(?:\\s*\\.\\s*<<0>>)*(?=\\s*[;{])",
          [h]
        ),
        lookbehind: !0,
        inside: { punctuation: /\./ },
      },
      "type-expression": {
        pattern: t(
          "(\\b(?:default|typeof|sizeof)\\s*\\(\\s*(?!\\s))(?:[^()\\s]|\\s(?!\\s)|<<0>>)*(?=\\s*\\))",
          [b]
        ),
        lookbehind: !0,
        alias: "class-name",
        inside: v,
      },
      "return-type": {
        pattern: t(
          "<<0>>(?=\\s+(?:<<1>>\\s*(?:=>|[({]|\\.\\s*this\\s*\\[)|this\\s*\\[))",
          [w, m]
        ),
        inside: v,
        alias: "class-name",
      },
      "constructor-invocation": {
        pattern: t("(\\bnew\\s+)<<0>>(?=\\s*[[({])", [w]),
        lookbehind: !0,
        inside: v,
        alias: "class-name",
      },
      "generic-method": {
        pattern: t("<<0>>\\s*<<1>>(?=\\s*\\()", [h, g]),
        inside: {
          function: t("^<<0>>", [h]),
          generic: { pattern: RegExp(g), alias: "class-name", inside: v },
        },
      },
      "type-list": {
        pattern: t(
          "\\b((?:<<0>>\\s+<<1>>|where\\s+<<2>>)\\s*:\\s*)(?:<<3>>|<<4>>)(?:\\s*,\\s*(?:<<3>>|<<4>>))*(?=\\s*(?:where|[{;]|=>|$))",
          [d, f, h, w, p.source]
        ),
        lookbehind: !0,
        inside: {
          keyword: p,
          "class-name": { pattern: RegExp(w), greedy: !0, inside: v },
          punctuation: /,/,
        },
      },
      preprocessor: {
        pattern: /(^\s*)#.*/m,
        lookbehind: !0,
        alias: "property",
        inside: {
          directive: {
            pattern: /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
            lookbehind: !0,
            alias: "keyword",
          },
        },
      },
    });
  var _ = $ + "|" + x,
    B = a("/(?![*/])|//[^\r\n]*[\r\n]|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>", [_]),
    E = e(a("[^\"'/()]|<<0>>|\\(<<self>>*\\)", [B]), 2),
    R =
      "\\b(?:assembly|event|field|method|module|param|property|return|type)\\b",
    P = a("<<0>>(?:\\s*\\(<<1>>*\\))?", [m, E]);
  s.languages.insertBefore("csharp", "class-name", {
    attribute: {
      pattern: t(
        "((?:^|[^\\s\\w>)?])\\s*\\[\\s*)(?:<<0>>\\s*:\\s*)?<<1>>(?:\\s*,\\s*<<1>>)*(?=\\s*\\])",
        [R, P]
      ),
      lookbehind: !0,
      greedy: !0,
      inside: {
        target: { pattern: t("^<<0>>(?=\\s*:)", [R]), alias: "keyword" },
        "attribute-arguments": {
          pattern: t("\\(<<0>>*\\)", [E]),
          inside: s.languages.csharp,
        },
        "class-name": { pattern: RegExp(m), inside: { punctuation: /\./ } },
        punctuation: /[:,]/,
      },
    },
  });
  var z = ":[^}\r\n]+",
    S = e(a("[^\"'/()]|<<0>>|\\(<<self>>*\\)", [B]), 2),
    j = a("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [S, z]),
    A = e(
      a("[^\"'/()]|/(?!\\*)|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>|\\(<<self>>*\\)", [
        _,
      ]),
      2
    ),
    F = a("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [A, z]);
  function U(e, n) {
    return {
      interpolation: {
        pattern: t("((?:^|[^{])(?:\\{\\{)*)<<0>>", [e]),
        lookbehind: !0,
        inside: {
          "format-string": {
            pattern: t("(^\\{(?:(?![}:])<<0>>)*)<<1>>(?=\\}$)", [n, z]),
            lookbehind: !0,
            inside: { punctuation: /^:/ },
          },
          punctuation: /^\{|\}$/,
          expression: {
            pattern: /[\s\S]+/,
            alias: "language-csharp",
            inside: s.languages.csharp,
          },
        },
      },
      string: /[\s\S]+/,
    };
  }
  s.languages.insertBefore("csharp", "string", {
    "interpolation-string": [
      {
        pattern: t(
          '(^|[^\\\\])(?:\\$@|@\\$)"(?:""|\\\\[^]|\\{\\{|<<0>>|[^\\\\{"])*"',
          [j]
        ),
        lookbehind: !0,
        greedy: !0,
        inside: U(j, S),
      },
      {
        pattern: t('(^|[^@\\\\])\\$"(?:\\\\.|\\{\\{|<<0>>|[^\\\\"{])*"', [F]),
        lookbehind: !0,
        greedy: !0,
        inside: U(F, A),
      },
    ],
  });
})(Prism),
  (Prism.languages.dotnet = Prism.languages.cs = Prism.languages.csharp);
(Prism.languages.aspnet = Prism.languages.extend("markup", {
  "page-directive": {
    pattern: /<%\s*@.*%>/i,
    alias: "tag",
    inside: {
      "page-directive": {
        pattern: /<%\s*@\s*(?:Assembly|Control|Implements|Import|Master(?:Type)?|OutputCache|Page|PreviousPageType|Reference|Register)?|%>/i,
        alias: "tag",
      },
      rest: Prism.languages.markup.tag.inside,
    },
  },
  directive: {
    pattern: /<%.*%>/i,
    alias: "tag",
    inside: {
      directive: { pattern: /<%\s*?[$=%#:]{0,2}|%>/i, alias: "tag" },
      rest: Prism.languages.csharp,
    },
  },
})),
  (Prism.languages.aspnet.tag.pattern = /<(?!%)\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i),
  Prism.languages.insertBefore(
    "inside",
    "punctuation",
    { directive: Prism.languages.aspnet.directive },
    Prism.languages.aspnet.tag.inside["attr-value"]
  ),
  Prism.languages.insertBefore("aspnet", "comment", {
    "asp-comment": { pattern: /<%--[\s\S]*?--%>/, alias: ["asp", "comment"] },
  }),
  Prism.languages.insertBefore(
    "aspnet",
    Prism.languages.javascript ? "script" : "tag",
    {
      "asp-script": {
        pattern: /(<script(?=.*runat=['"]?server['"]?)[^>]*>)[\s\S]*?(?=<\/script>)/i,
        lookbehind: !0,
        alias: ["asp", "script"],
        inside: Prism.languages.csharp || {},
      },
    }
  );
(Prism.languages.c = Prism.languages.extend("clike", {
  comment: {
    pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: !0,
  },
  "class-name": {
    pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
    lookbehind: !0,
  },
  keyword: /\b(?:__attribute__|_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
  function: /[a-z_]\w*(?=\s*\()/i,
  number: /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
  operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
})),
  Prism.languages.insertBefore("c", "string", {
    macro: {
      pattern: /(^\s*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
      lookbehind: !0,
      greedy: !0,
      alias: "property",
      inside: {
        string: [
          { pattern: /^(#\s*include\s*)<[^>]+>/, lookbehind: !0 },
          Prism.languages.c.string,
        ],
        comment: Prism.languages.c.comment,
        "macro-name": [
          { pattern: /(^#\s*define\s+)\w+\b(?!\()/i, lookbehind: !0 },
          {
            pattern: /(^#\s*define\s+)\w+\b(?=\()/i,
            lookbehind: !0,
            alias: "function",
          },
        ],
        directive: {
          pattern: /^(#\s*)[a-z]+/,
          lookbehind: !0,
          alias: "keyword",
        },
        "directive-hash": /^#/,
        punctuation: /##|\\(?=[\r\n])/,
        expression: { pattern: /\S[\s\S]*/, inside: Prism.languages.c },
      },
    },
    constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/,
  }),
  delete Prism.languages.c.boolean;
!(function (e) {
  var t = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|const_cast|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
    n = "\\b(?!<keyword>)\\w+(?:\\s*\\.\\s*\\w+)*\\b".replace(
      /<keyword>/g,
      function () {
        return t.source;
      }
    );
  (e.languages.cpp = e.languages.extend("c", {
    "class-name": [
      {
        pattern: RegExp(
          "(\\b(?:class|concept|enum|struct|typename)\\s+)(?!<keyword>)\\w+".replace(
            /<keyword>/g,
            function () {
              return t.source;
            }
          )
        ),
        lookbehind: !0,
      },
      /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,
      /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,
      /\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/,
    ],
    keyword: t,
    number: {
      pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
      greedy: !0,
    },
    operator: />>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
    boolean: /\b(?:true|false)\b/,
  })),
    e.languages.insertBefore("cpp", "string", {
      module: {
        pattern: RegExp(
          '(\\b(?:module|import)\\s+)(?:"(?:\\\\(?:\r\n|[^])|[^"\\\\\r\n])*"|<[^<>\r\n]*>|' +
            "<mod-name>(?:\\s*:\\s*<mod-name>)?|:\\s*<mod-name>".replace(
              /<mod-name>/g,
              function () {
                return n;
              }
            ) +
            ")"
        ),
        lookbehind: !0,
        greedy: !0,
        inside: { string: /^[<"][\s\S]+/, operator: /:/, punctuation: /\./ },
      },
      "raw-string": {
        pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
        alias: "string",
        greedy: !0,
      },
    }),
    e.languages.insertBefore("cpp", "keyword", {
      "generic-function": {
        pattern: /\b[a-z_]\w*\s*<(?:[^<>]|<(?:[^<>])*>)*>(?=\s*\()/i,
        inside: {
          function: /^\w+/,
          generic: {
            pattern: /<[\s\S]+/,
            alias: "class-name",
            inside: e.languages.cpp,
          },
        },
      },
    }),
    e.languages.insertBefore("cpp", "operator", {
      "double-colon": { pattern: /::/, alias: "punctuation" },
    }),
    e.languages.insertBefore("cpp", "class-name", {
      "base-clause": {
        pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
        lookbehind: !0,
        greedy: !0,
        inside: e.languages.extend("cpp", {}),
      },
    }),
    e.languages.insertBefore(
      "inside",
      "double-colon",
      { "class-name": /\b[a-z_]\w*\b(?!\s*::)/i },
      e.languages.cpp["base-clause"]
    );
})(Prism);
!(function (h) {
  function v(e, n) {
    return "___" + e.toUpperCase() + n + "___";
  }
  Object.defineProperties((h.languages["markup-templating"] = {}), {
    buildPlaceholders: {
      value: function (a, r, e, o) {
        if (a.language === r) {
          var c = (a.tokenStack = []);
          (a.code = a.code.replace(e, function (e) {
            if ("function" == typeof o && !o(e)) return e;
            for (var n, t = c.length; -1 !== a.code.indexOf((n = v(r, t))); )
              ++t;
            return (c[t] = e), n;
          })),
            (a.grammar = h.languages.markup);
        }
      },
    },
    tokenizePlaceholders: {
      value: function (p, k) {
        if (p.language === k && p.tokenStack) {
          p.grammar = h.languages[k];
          var m = 0,
            d = Object.keys(p.tokenStack);
          !(function e(n) {
            for (var t = 0; t < n.length && !(m >= d.length); t++) {
              var a = n[t];
              if (
                "string" == typeof a ||
                (a.content && "string" == typeof a.content)
              ) {
                var r = d[m],
                  o = p.tokenStack[r],
                  c = "string" == typeof a ? a : a.content,
                  i = v(k, r),
                  u = c.indexOf(i);
                if (-1 < u) {
                  ++m;
                  var g = c.substring(0, u),
                    l = new h.Token(
                      k,
                      h.tokenize(o, p.grammar),
                      "language-" + k,
                      o
                    ),
                    s = c.substring(u + i.length),
                    f = [];
                  g && f.push.apply(f, e([g])),
                    f.push(l),
                    s && f.push.apply(f, e([s])),
                    "string" == typeof a
                      ? n.splice.apply(n, [t, 1].concat(f))
                      : (a.content = f);
                }
              } else a.content && e(a.content);
            }
            return n;
          })(p.tokens);
        }
      },
    },
  });
})(Prism);
!(function (e) {
  e.languages.django = {
    comment: /^{#[\s\S]*?#}$/,
    tag: { pattern: /(^{%[+-]?\s*)\w+/, lookbehind: !0, alias: "keyword" },
    delimiter: { pattern: /^{[{%][+-]?|[+-]?[}%]}$/, alias: "punctuation" },
    string: { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
    filter: { pattern: /(\|)\w+/, lookbehind: !0, alias: "function" },
    test: {
      pattern: /(\bis\s+(?:not\s+)?)(?!not\b)\w+/,
      lookbehind: !0,
      alias: "function",
    },
    function: /\b[a-z_]\w+(?=\s*\()/i,
    keyword: /\b(?:and|as|by|else|for|if|import|in|is|loop|not|or|recursive|with|without)\b/,
    operator: /[-+*/%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
    number: /\b\d+(?:\.\d+)?\b/,
    boolean: /[Tt]rue|[Ff]alse|[Nn]one/,
    variable: /\b\w+?\b/,
    punctuation: /[{}[\](),.:;]/,
  };
  var n = /{{[\s\S]*?}}|{%[\s\S]*?%}|{#[\s\S]*?#}/g,
    o = e.languages["markup-templating"];
  e.hooks.add("before-tokenize", function (e) {
    o.buildPlaceholders(e, "django", n);
  }),
    e.hooks.add("after-tokenize", function (e) {
      o.tokenizePlaceholders(e, "django");
    }),
    (e.languages.jinja2 = e.languages.django),
    e.hooks.add("before-tokenize", function (e) {
      o.buildPlaceholders(e, "jinja2", n);
    }),
    e.hooks.add("after-tokenize", function (e) {
      o.tokenizePlaceholders(e, "jinja2");
    });
})(Prism);
Prism.languages.editorconfig = {
  comment: /[;#].*/,
  section: {
    pattern: /(^[ \t]*)\[.+]/m,
    lookbehind: !0,
    alias: "keyword",
    inside: {
      regex: /\\\\[\[\]{},!?.*]/,
      operator: /[!?]|\.\.|\*{1,2}/,
      punctuation: /[\[\]{},]/,
    },
  },
  property: { pattern: /(^[ \t]*)[^\s=]+(?=[ \t]*=)/m, lookbehind: !0 },
  value: { pattern: /=.*/, alias: "string", inside: { punctuation: /^=/ } },
};
Prism.languages.git = {
  comment: /^#.*/m,
  deleted: /^[-–].*/m,
  inserted: /^\+.*/m,
  string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
  command: { pattern: /^.*\$ git .*$/m, inside: { parameter: /\s--?\w+/m } },
  coord: /^@@.*@@$/m,
  "commit-sha1": /^commit \w{40}$/m,
};
(Prism.languages.go = Prism.languages.extend("clike", {
  string: { pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
  keyword: /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
  boolean: /\b(?:_|iota|nil|true|false)\b/,
  number: /(?:\b0x[a-f\d]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
  operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
  builtin: /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/,
})),
  delete Prism.languages.go["class-name"];
!(function (t) {
  t.languages.http = {
    "request-line": {
      pattern: /^(?:GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH|PRI|SEARCH)\s(?:https?:\/\/|\/)\S*\sHTTP\/[0-9.]+/m,
      inside: {
        method: { pattern: /^[A-Z]+\b/, alias: "property" },
        "request-target": {
          pattern: /^(\s)(?:https?:\/\/|\/)\S*(?=\s)/,
          lookbehind: !0,
          alias: "url",
          inside: t.languages.uri,
        },
        "http-version": {
          pattern: /^(\s)HTTP\/[0-9.]+/,
          lookbehind: !0,
          alias: "property",
        },
      },
    },
    "response-status": {
      pattern: /^HTTP\/[0-9.]+ \d+ .+/m,
      inside: {
        "http-version": { pattern: /^HTTP\/[0-9.]+/, alias: "property" },
        "status-code": {
          pattern: /^(\s)\d+(?=\s)/,
          lookbehind: !0,
          alias: "number",
        },
        "reason-phrase": {
          pattern: /^(\s).+/,
          lookbehind: !0,
          alias: "string",
        },
      },
    },
    "header-name": { pattern: /^[\w-]+:(?=.)/m, alias: "keyword" },
  };
  var a,
    e,
    s,
    n = t.languages,
    r = {
      "application/javascript": n.javascript,
      "application/json": n.json || n.javascript,
      "application/xml": n.xml,
      "text/xml": n.xml,
      "text/html": n.html,
      "text/css": n.css,
    },
    i = { "application/json": !0, "application/xml": !0 };
  for (var p in r)
    if (r[p]) {
      a = a || {};
      var o = i[p]
        ? (void 0,
          (s = (e = p).replace(/^[a-z]+\//, "")),
          "(?:" + e + "|\\w+/(?:[\\w.-]+\\+)+" + s + "(?![+\\w.-]))")
        : p;
      a[p.replace(/\//g, "-")] = {
        pattern: RegExp(
          "(content-type:\\s*" +
            o +
            "(?:(?:\\r\\n?|\\n).+)*)(?:\\r?\\n|\\r){2}[\\s\\S]*",
          "i"
        ),
        lookbehind: !0,
        inside: r[p],
      };
    }
  a && t.languages.insertBefore("http", "header-name", a);
})(Prism);
Prism.languages.icon = {
  comment: /#.*/,
  string: {
    pattern: /(["'])(?:(?!\1)[^\\\r\n_]|\\.|_(?!\1)(?:\r\n|[\s\S]))*\1/,
    greedy: !0,
  },
  number: /\b(?:\d+r[a-z\d]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b|\.\d+\b/i,
  "builtin-keyword": {
    pattern: /&(?:allocated|ascii|clock|collections|cset|current|date|dateline|digits|dump|e|error(?:number|text|value)?|errout|fail|features|file|host|input|lcase|letters|level|line|main|null|output|phi|pi|pos|progname|random|regions|source|storage|subject|time|trace|ucase|version)\b/,
    alias: "variable",
  },
  directive: { pattern: /\$\w+/, alias: "builtin" },
  keyword: /\b(?:break|by|case|create|default|do|else|end|every|fail|global|if|initial|invocable|link|local|next|not|of|procedure|record|repeat|return|static|suspend|then|to|until|while)\b/,
  function: /(?!\d)\w+(?=\s*[({]|\s*!\s*\[)/,
  operator: /[+-]:(?!=)|(?:[\/?@^%&]|\+\+?|--?|==?=?|~==?=?|\*\*?|\|\|\|?|<(?:->?|<?=?)|>>?=?)(?::=)?|:(?:=:?)?|[!.\\|~]/,
  punctuation: /[\[\](){},;]/,
};
!(function (e) {
  var t = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/,
    n = "(^|[^\\w.])(?:[a-z]\\w*\\s*\\.\\s*)*(?:[A-Z]\\w*\\s*\\.\\s*)*",
    a = {
      pattern: RegExp(n + "[A-Z](?:[\\d_A-Z]*[a-z]\\w*)?\\b"),
      lookbehind: !0,
      inside: {
        namespace: {
          pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
          inside: { punctuation: /\./ },
        },
        punctuation: /\./,
      },
    };
  (e.languages.java = e.languages.extend("clike", {
    "class-name": [
      a,
      {
        pattern: RegExp(n + "[A-Z]\\w*(?=\\s+\\w+\\s*[;,=())])"),
        lookbehind: !0,
        inside: a.inside,
      },
    ],
    keyword: t,
    function: [
      e.languages.clike.function,
      { pattern: /(\:\:\s*)[a-z_]\w*/, lookbehind: !0 },
    ],
    number: /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
    operator: {
      pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
      lookbehind: !0,
    },
  })),
    e.languages.insertBefore("java", "string", {
      "triple-quoted-string": {
        pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
        greedy: !0,
        alias: "string",
      },
    }),
    e.languages.insertBefore("java", "class-name", {
      annotation: {
        pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/,
        lookbehind: !0,
        alias: "punctuation",
      },
      generics: {
        pattern: /<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,
        inside: {
          "class-name": a,
          keyword: t,
          punctuation: /[<>(),.:]/,
          operator: /[?&|]/,
        },
      },
      namespace: {
        pattern: RegExp(
          "(\\b(?:exports|import(?:\\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\\s+)(?!<keyword>)[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?".replace(
            /<keyword>/g,
            function () {
              return t.source;
            }
          )
        ),
        lookbehind: !0,
        inside: { punctuation: /\./ },
      },
    });
})(Prism);
!(function (e) {
  var n = "\\\\\\((?:[^()]|\\([^()]*\\))*\\)",
    t = RegExp(
      '"(?:[^"\r\n\\\\]|\\\\[^\r\n(]|__)*"'.replace(/__/g, function () {
        return n;
      })
    ),
    i = {
      interpolation: {
        pattern: RegExp("((?:^|[^\\\\])(?:\\\\{2})*)" + n),
        lookbehind: !0,
        inside: {
          content: {
            pattern: /^(\\\()[\s\S]+(?=\)$)/,
            lookbehind: !0,
            inside: null,
          },
          punctuation: /^\\\(|\)$/,
        },
      },
    },
    a = (e.languages.jq = {
      comment: /#.*/,
      property: {
        pattern: RegExp(t.source + "(?=\\s*:(?!:))"),
        greedy: !0,
        inside: i,
      },
      string: { pattern: t, greedy: !0, inside: i },
      function: { pattern: /(\bdef\s+)[a-z_]\w+/i, lookbehind: !0 },
      variable: /\B\$\w+/,
      "property-literal": {
        pattern: /\b[a-z_]\w*(?=\s*:(?!:))/i,
        alias: "property",
      },
      keyword: /\b(?:as|break|catch|def|elif|else|end|foreach|if|import|include|label|module|modulemeta|null|reduce|then|try|while)\b/,
      boolean: /\b(?:true|false)\b/,
      number: /(?:\b\d+\.|\B\.)?\b\d+(?:[eE][+-]?\d+)?\b/,
      operator: [
        { pattern: /\|=?/, alias: "pipe" },
        /\.\.|[!=<>]?=|\?\/\/|\/\/=?|[-+*/%]=?|[<>?]|\b(?:and|or|not)\b/,
      ],
      "c-style-function": {
        pattern: /\b[a-z_]\w*(?=\s*\()/i,
        alias: "function",
      },
      punctuation: /::|[()\[\]{},:;]|\.(?=\s*[\[\w$])/,
      dot: { pattern: /\./, alias: "important" },
    });
  i.interpolation.inside.content.inside = a;
})(Prism);
(Prism.languages.json = {
  property: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
    lookbehind: !0,
    greedy: !0,
  },
  string: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
    lookbehind: !0,
    greedy: !0,
  },
  comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
  number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  punctuation: /[{}[\],]/,
  operator: /:/,
  boolean: /\b(?:true|false)\b/,
  null: { pattern: /\bnull\b/, alias: "keyword" },
}),
  (Prism.languages.webmanifest = Prism.languages.json);
!(function (n) {
  var e = /("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/;
  n.languages.json5 = n.languages.extend("json", {
    property: [
      { pattern: RegExp(e.source + "(?=\\s*:)"), greedy: !0 },
      {
        pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/,
        alias: "unquoted",
      },
    ],
    string: { pattern: e, greedy: !0 },
    number: /[+-]?\b(?:NaN|Infinity|0x[a-fA-F\d]+)\b|[+-]?(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+\b)?/,
  });
})(Prism);
(Prism.languages.less = Prism.languages.extend("css", {
  comment: [/\/\*[\s\S]*?\*\//, { pattern: /(^|[^\\])\/\/.*/, lookbehind: !0 }],
  atrule: {
    pattern: /@[\w-](?:\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};\s]|\s+(?!\s))*?(?=\s*\{)/,
    inside: { punctuation: /[:()]/ },
  },
  selector: {
    pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};@\s]|\s+(?!\s))*?(?=\s*\{)/,
    inside: { variable: /@+[\w-]+/ },
  },
  property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
  operator: /[+\-*\/]/,
})),
  Prism.languages.insertBefore("less", "property", {
    variable: [
      { pattern: /@[\w-]+\s*:/, inside: { punctuation: /:/ } },
      /@@?[\w-]+/,
    ],
    "mixin-usage": {
      pattern: /([{;]\s*)[.#](?!\d)[\w-].*?(?=[(;])/,
      lookbehind: !0,
      alias: "function",
    },
  });
!(function (u) {
  function n(n) {
    return (
      (n = n.replace(/<inner>/g, function () {
        return "(?:\\\\.|[^\\\\\n\r]|(?:\n|\r\n?)(?!\n|\r\n?))";
      })),
      RegExp("((?:^|[^\\\\])(?:\\\\{2})*)(?:" + n + ")")
    );
  }
  var e = "(?:\\\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\\\|\r\n`])+",
    t = "\\|?__(?:\\|__)+\\|?(?:(?:\n|\r\n?)|(?![^]))".replace(
      /__/g,
      function () {
        return e;
      }
    ),
    a =
      "\\|?[ \t]*:?-{3,}:?[ \t]*(?:\\|[ \t]*:?-{3,}:?[ \t]*)+\\|?(?:\n|\r\n?)";
  (u.languages.markdown = u.languages.extend("markup", {})),
    u.languages.insertBefore("markdown", "prolog", {
      "front-matter-block": {
        pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
        lookbehind: !0,
        greedy: !0,
        inside: {
          punctuation: /^---|---$/,
          "font-matter": {
            pattern: /\S+(?:\s+\S+)*/,
            alias: ["yaml", "language-yaml"],
            inside: u.languages.yaml,
          },
        },
      },
      blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: "punctuation" },
      table: {
        pattern: RegExp("^" + t + a + "(?:" + t + ")*", "m"),
        inside: {
          "table-data-rows": {
            pattern: RegExp("^(" + t + a + ")(?:" + t + ")*$"),
            lookbehind: !0,
            inside: {
              "table-data": {
                pattern: RegExp(e),
                inside: u.languages.markdown,
              },
              punctuation: /\|/,
            },
          },
          "table-line": {
            pattern: RegExp("^(" + t + ")" + a + "$"),
            lookbehind: !0,
            inside: { punctuation: /\||:?-{3,}:?/ },
          },
          "table-header-row": {
            pattern: RegExp("^" + t + "$"),
            inside: {
              "table-header": {
                pattern: RegExp(e),
                alias: "important",
                inside: u.languages.markdown,
              },
              punctuation: /\|/,
            },
          },
        },
      },
      code: [
        {
          pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
          lookbehind: !0,
          alias: "keyword",
        },
        { pattern: /``.+?``|`[^`\r\n]+`/, alias: "keyword" },
        {
          pattern: /^```[\s\S]*?^```$/m,
          greedy: !0,
          inside: {
            "code-block": {
              pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
              lookbehind: !0,
            },
            "code-language": { pattern: /^(```).+/, lookbehind: !0 },
            punctuation: /```/,
          },
        },
      ],
      title: [
        {
          pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
          alias: "important",
          inside: { punctuation: /==+$|--+$/ },
        },
        {
          pattern: /(^\s*)#.+/m,
          lookbehind: !0,
          alias: "important",
          inside: { punctuation: /^#+|#+$/ },
        },
      ],
      hr: {
        pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
        lookbehind: !0,
        alias: "punctuation",
      },
      list: {
        pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
        lookbehind: !0,
        alias: "punctuation",
      },
      "url-reference": {
        pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
        inside: {
          variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
          string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
          punctuation: /^[\[\]!:]|[<>]/,
        },
        alias: "url",
      },
      bold: {
        pattern: n(
          "\\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\\b|\\*\\*(?:(?!\\*)<inner>|\\*(?:(?!\\*)<inner>)+\\*)+\\*\\*"
        ),
        lookbehind: !0,
        greedy: !0,
        inside: {
          content: {
            pattern: /(^..)[\s\S]+(?=..$)/,
            lookbehind: !0,
            inside: {},
          },
          punctuation: /\*\*|__/,
        },
      },
      italic: {
        pattern: n(
          "\\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\\b|\\*(?:(?!\\*)<inner>|\\*\\*(?:(?!\\*)<inner>)+\\*\\*)+\\*"
        ),
        lookbehind: !0,
        greedy: !0,
        inside: {
          content: { pattern: /(^.)[\s\S]+(?=.$)/, lookbehind: !0, inside: {} },
          punctuation: /[*_]/,
        },
      },
      strike: {
        pattern: n("(~~?)(?:(?!~)<inner>)+?\\2"),
        lookbehind: !0,
        greedy: !0,
        inside: {
          content: {
            pattern: /(^~~?)[\s\S]+(?=\1$)/,
            lookbehind: !0,
            inside: {},
          },
          punctuation: /~~?/,
        },
      },
      url: {
        pattern: n(
          '!?\\[(?:(?!\\])<inner>)+\\](?:\\([^\\s)]+(?:[\t ]+"(?:\\\\.|[^"\\\\])*")?\\)|[ \t]?\\[(?:(?!\\])<inner>)+\\])'
        ),
        lookbehind: !0,
        greedy: !0,
        inside: {
          operator: /^!/,
          content: { pattern: /(^\[)[^\]]+(?=\])/, lookbehind: !0, inside: {} },
          variable: { pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
          url: { pattern: /(^\]\()[^\s)]+/, lookbehind: !0 },
          string: {
            pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
            lookbehind: !0,
          },
        },
      },
    }),
    ["url", "bold", "italic", "strike"].forEach(function (e) {
      ["url", "bold", "italic", "strike"].forEach(function (n) {
        e !== n &&
          (u.languages.markdown[e].inside.content.inside[n] =
            u.languages.markdown[n]);
      });
    }),
    u.hooks.add("after-tokenize", function (n) {
      ("markdown" !== n.language && "md" !== n.language) ||
        !(function n(e) {
          if (e && "string" != typeof e)
            for (var t = 0, a = e.length; t < a; t++) {
              var i = e[t];
              if ("code" === i.type) {
                var r = i.content[1],
                  o = i.content[3];
                if (
                  r &&
                  o &&
                  "code-language" === r.type &&
                  "code-block" === o.type &&
                  "string" == typeof r.content
                ) {
                  var l = r.content
                      .replace(/\b#/g, "sharp")
                      .replace(/\b\+\+/g, "pp"),
                    s =
                      "language-" +
                      (l = (/[a-z][\w-]*/i.exec(l) || [""])[0].toLowerCase());
                  o.alias
                    ? "string" == typeof o.alias
                      ? (o.alias = [o.alias, s])
                      : o.alias.push(s)
                    : (o.alias = [s]);
                }
              } else n(i.content);
            }
        })(n.tokens);
    }),
    u.hooks.add("wrap", function (n) {
      if ("code-block" === n.type) {
        for (var e = "", t = 0, a = n.classes.length; t < a; t++) {
          var i = n.classes[t],
            r = /language-(.+)/.exec(i);
          if (r) {
            e = r[1];
            break;
          }
        }
        var o = u.languages[e];
        if (o) {
          var l = document.createElement("div");
          l.innerHTML = n.content;
          var s = l.textContent;
          n.content = u.highlight(s, o, e);
        } else if (e && "none" !== e && u.plugins.autoloader) {
          var d =
            "md-" +
            new Date().valueOf() +
            "-" +
            Math.floor(1e16 * Math.random());
          (n.attributes.id = d),
            u.plugins.autoloader.loadLanguages(e, function () {
              var n = document.getElementById(d);
              n &&
                (n.innerHTML = u.highlight(n.textContent, u.languages[e], e));
            });
        }
      }
    }),
    (u.languages.md = u.languages.markdown);
})(Prism);
Prism.languages.matlab = {
  comment: [/%\{[\s\S]*?\}%/, /%.+/],
  string: { pattern: /\B'(?:''|[^'\r\n])*'/, greedy: !0 },
  number: /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+)?(?:[ij])?|\b[ij]\b/,
  keyword: /\b(?:break|case|catch|continue|else|elseif|end|for|function|if|inf|NaN|otherwise|parfor|pause|pi|return|switch|try|while)\b/,
  function: /(?!\d)\w+(?=\s*\()/,
  operator: /\.?[*^\/\\']|[+\-:@]|[<>=~]=?|&&?|\|\|?/,
  punctuation: /\.{3}|[.,;\[\](){}!]/,
};
!(function ($) {
  var e = [
      "$eq",
      "$gt",
      "$gte",
      "$in",
      "$lt",
      "$lte",
      "$ne",
      "$nin",
      "$and",
      "$not",
      "$nor",
      "$or",
      "$exists",
      "$type",
      "$expr",
      "$jsonSchema",
      "$mod",
      "$regex",
      "$text",
      "$where",
      "$geoIntersects",
      "$geoWithin",
      "$near",
      "$nearSphere",
      "$all",
      "$elemMatch",
      "$size",
      "$bitsAllClear",
      "$bitsAllSet",
      "$bitsAnyClear",
      "$bitsAnySet",
      "$comment",
      "$elemMatch",
      "$meta",
      "$slice",
      "$currentDate",
      "$inc",
      "$min",
      "$max",
      "$mul",
      "$rename",
      "$set",
      "$setOnInsert",
      "$unset",
      "$addToSet",
      "$pop",
      "$pull",
      "$push",
      "$pullAll",
      "$each",
      "$position",
      "$slice",
      "$sort",
      "$bit",
      "$addFields",
      "$bucket",
      "$bucketAuto",
      "$collStats",
      "$count",
      "$currentOp",
      "$facet",
      "$geoNear",
      "$graphLookup",
      "$group",
      "$indexStats",
      "$limit",
      "$listLocalSessions",
      "$listSessions",
      "$lookup",
      "$match",
      "$merge",
      "$out",
      "$planCacheStats",
      "$project",
      "$redact",
      "$replaceRoot",
      "$replaceWith",
      "$sample",
      "$set",
      "$skip",
      "$sort",
      "$sortByCount",
      "$unionWith",
      "$unset",
      "$unwind",
      "$abs",
      "$accumulator",
      "$acos",
      "$acosh",
      "$add",
      "$addToSet",
      "$allElementsTrue",
      "$and",
      "$anyElementTrue",
      "$arrayElemAt",
      "$arrayToObject",
      "$asin",
      "$asinh",
      "$atan",
      "$atan2",
      "$atanh",
      "$avg",
      "$binarySize",
      "$bsonSize",
      "$ceil",
      "$cmp",
      "$concat",
      "$concatArrays",
      "$cond",
      "$convert",
      "$cos",
      "$dateFromParts",
      "$dateToParts",
      "$dateFromString",
      "$dateToString",
      "$dayOfMonth",
      "$dayOfWeek",
      "$dayOfYear",
      "$degreesToRadians",
      "$divide",
      "$eq",
      "$exp",
      "$filter",
      "$first",
      "$floor",
      "$function",
      "$gt",
      "$gte",
      "$hour",
      "$ifNull",
      "$in",
      "$indexOfArray",
      "$indexOfBytes",
      "$indexOfCP",
      "$isArray",
      "$isNumber",
      "$isoDayOfWeek",
      "$isoWeek",
      "$isoWeekYear",
      "$last",
      "$last",
      "$let",
      "$literal",
      "$ln",
      "$log",
      "$log10",
      "$lt",
      "$lte",
      "$ltrim",
      "$map",
      "$max",
      "$mergeObjects",
      "$meta",
      "$min",
      "$millisecond",
      "$minute",
      "$mod",
      "$month",
      "$multiply",
      "$ne",
      "$not",
      "$objectToArray",
      "$or",
      "$pow",
      "$push",
      "$radiansToDegrees",
      "$range",
      "$reduce",
      "$regexFind",
      "$regexFindAll",
      "$regexMatch",
      "$replaceOne",
      "$replaceAll",
      "$reverseArray",
      "$round",
      "$rtrim",
      "$second",
      "$setDifference",
      "$setEquals",
      "$setIntersection",
      "$setIsSubset",
      "$setUnion",
      "$size",
      "$sin",
      "$slice",
      "$split",
      "$sqrt",
      "$stdDevPop",
      "$stdDevSamp",
      "$strcasecmp",
      "$strLenBytes",
      "$strLenCP",
      "$substr",
      "$substrBytes",
      "$substrCP",
      "$subtract",
      "$sum",
      "$switch",
      "$tan",
      "$toBool",
      "$toDate",
      "$toDecimal",
      "$toDouble",
      "$toInt",
      "$toLong",
      "$toObjectId",
      "$toString",
      "$toLower",
      "$toUpper",
      "$trim",
      "$trunc",
      "$type",
      "$week",
      "$year",
      "$zip",
      "$comment",
      "$explain",
      "$hint",
      "$max",
      "$maxTimeMS",
      "$min",
      "$orderby",
      "$query",
      "$returnKey",
      "$showDiskLoc",
      "$natural",
    ],
    t =
      "(?:" +
      (e = e.map(function ($) {
        return $.replace("$", "\\$");
      })).join("|") +
      ")\\b";
  ($.languages.mongodb = $.languages.extend("javascript", {})),
    $.languages.insertBefore("mongodb", "string", {
      property: {
        pattern: /(?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)(?=\s*:)/,
        greedy: !0,
        inside: { keyword: RegExp("^(['\"])?" + t + "(?:\\1)?$") },
      },
    }),
    ($.languages.mongodb.string.inside = {
      url: {
        pattern: /https?:\/\/[-\w@:%.+~#=]{1,256}\.[a-z0-9()]{1,6}\b[-\w()@:%+.~#?&/=]*/i,
        greedy: !0,
      },
      entity: {
        pattern: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/,
        greedy: !0,
      },
    }),
    $.languages.insertBefore("mongodb", "constant", {
      builtin: {
        pattern: RegExp(
          "\\b(?:" +
            [
              "ObjectId",
              "Code",
              "BinData",
              "DBRef",
              "Timestamp",
              "NumberLong",
              "NumberDecimal",
              "MaxKey",
              "MinKey",
              "RegExp",
              "ISODate",
              "UUID",
            ].join("|") +
            ")\\b"
        ),
        alias: "keyword",
      },
    });
})(Prism);
(Prism.languages.pcaxis = {
  string: /"[^"]*"/,
  keyword: {
    pattern: /((?:^|;)\s*)[-A-Z\d]+(?:\s*\[[-\w]+\])?(?:\s*\("[^"]*"(?:,\s*"[^"]*")*\))?(?=\s*=)/,
    lookbehind: !0,
    greedy: !0,
    inside: {
      keyword: /^[-A-Z\d]+/,
      language: {
        pattern: /^(\s*)\[[-\w]+\]/,
        lookbehind: !0,
        inside: { punctuation: /^\[|\]$/, property: /[-\w]+/ },
      },
      "sub-key": {
        pattern: /^(\s*)\S[\s\S]*/,
        lookbehind: !0,
        inside: {
          parameter: { pattern: /"[^"]*"/, alias: "property" },
          punctuation: /^\(|\)$|,/,
        },
      },
    },
  },
  operator: /=/,
  tlist: {
    pattern: /TLIST\s*\(\s*\w+(?:(?:\s*,\s*"[^"]*")+|\s*,\s*"[^"]*"-"[^"]*")?\s*\)/,
    greedy: !0,
    inside: {
      function: /^TLIST/,
      property: { pattern: /^(\s*\(\s*)\w+/, lookbehind: !0 },
      string: /"[^"]*"/,
      punctuation: /[(),]/,
      operator: /-/,
    },
  },
  punctuation: /[;,]/,
  number: { pattern: /(^|\s)\d+(?:\.\d+)?(?!\S)/, lookbehind: !0 },
  boolean: /YES|NO/,
}),
  (Prism.languages.px = Prism.languages.pcaxis);
!(function (a) {
  var e = /\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/,
    t = [
      { pattern: /\b(?:false|true)\b/i, alias: "boolean" },
      { pattern: /(::\s*)\b[a-z_]\w*\b(?!\s*\()/i, greedy: !0, lookbehind: !0 },
      {
        pattern: /(\b(?:case|const)\s+)\b[a-z_]\w*(?=\s*[;=])/i,
        greedy: !0,
        lookbehind: !0,
      },
      /\b(?:null)\b/i,
      /\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/,
    ],
    i = /\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[\da-f]+(?:_[\da-f]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    n = /<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/,
    s = /[{}\[\](),:;]/;
  a.languages.php = {
    delimiter: { pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i, alias: "important" },
    comment: e,
    variable: /\$+(?:\w+\b|(?={))/i,
    package: {
      pattern: /(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
      lookbehind: !0,
      inside: { punctuation: /\\/ },
    },
    "class-name-definition": {
      pattern: /(\b(?:class|enum|interface|trait)\s+)\b[a-z_]\w*(?!\\)\b/i,
      lookbehind: !0,
      alias: "class-name",
    },
    "function-definition": {
      pattern: /(\bfunction\s+)[a-z_]\w*(?=\s*\()/i,
      lookbehind: !0,
      alias: "function",
    },
    keyword: [
      {
        pattern: /(\(\s*)\b(?:bool|boolean|int|integer|float|string|object|array)\b(?=\s*\))/i,
        alias: "type-casting",
        greedy: !0,
        lookbehind: !0,
      },
      {
        pattern: /([(,?]\s*)\b(?:bool|int|float|string|object|array(?!\s*\()|mixed|self|static|callable|iterable|(?:null|false)(?=\s*\|))\b(?=\s*\$)/i,
        alias: "type-hint",
        greedy: !0,
        lookbehind: !0,
      },
      {
        pattern: /([(,?]\s*[a-z0-9_|]\|\s*)(?:null|false)\b(?=\s*\$)/i,
        alias: "type-hint",
        greedy: !0,
        lookbehind: !0,
      },
      {
        pattern: /(\)\s*:\s*(?:\?\s*)?)\b(?:bool|int|float|string|object|void|array(?!\s*\()|mixed|self|static|callable|iterable|(?:null|false)(?=\s*\|))\b/i,
        alias: "return-type",
        greedy: !0,
        lookbehind: !0,
      },
      {
        pattern: /(\)\s*:\s*(?:\?\s*)?[a-z0-9_|]\|\s*)(?:null|false)\b/i,
        alias: "return-type",
        greedy: !0,
        lookbehind: !0,
      },
      {
        pattern: /\b(?:bool|int|float|string|object|void|array(?!\s*\()|mixed|iterable|(?:null|false)(?=\s*\|))\b/i,
        alias: "type-declaration",
        greedy: !0,
      },
      {
        pattern: /(\|\s*)(?:null|false)\b/i,
        alias: "type-declaration",
        greedy: !0,
        lookbehind: !0,
      },
      {
        pattern: /\b(?:parent|self|static)(?=\s*::)/i,
        alias: "static-context",
        greedy: !0,
      },
      { pattern: /(\byield\s+)from\b/i, lookbehind: !0 },
      /\bclass\b/i,
      {
        pattern: /((?:^|[^\s>:]|(?:^|[^-])>|(?:^|[^:]):)\s*)\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|enum|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|match|new|or|parent|print|private|protected|public|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/i,
        lookbehind: !0,
      },
    ],
    "argument-name": {
      pattern: /([(,]\s+)\b[a-z_]\w*(?=\s*:(?!:))/i,
      lookbehind: !0,
    },
    "class-name": [
      {
        pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i,
        greedy: !0,
        lookbehind: !0,
      },
      { pattern: /(\|\s*)\b[a-z_]\w*(?!\\)\b/i, greedy: !0, lookbehind: !0 },
      { pattern: /\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i, greedy: !0 },
      {
        pattern: /(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i,
        alias: "class-name-fully-qualified",
        greedy: !0,
        lookbehind: !0,
        inside: { punctuation: /\\/ },
      },
      {
        pattern: /(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i,
        alias: "class-name-fully-qualified",
        greedy: !0,
        inside: { punctuation: /\\/ },
      },
      {
        pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
        alias: "class-name-fully-qualified",
        greedy: !0,
        lookbehind: !0,
        inside: { punctuation: /\\/ },
      },
      {
        pattern: /\b[a-z_]\w*(?=\s*\$)/i,
        alias: "type-declaration",
        greedy: !0,
      },
      {
        pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
        alias: ["class-name-fully-qualified", "type-declaration"],
        greedy: !0,
        inside: { punctuation: /\\/ },
      },
      { pattern: /\b[a-z_]\w*(?=\s*::)/i, alias: "static-context", greedy: !0 },
      {
        pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*::)/i,
        alias: ["class-name-fully-qualified", "static-context"],
        greedy: !0,
        inside: { punctuation: /\\/ },
      },
      {
        pattern: /([(,?]\s*)[a-z_]\w*(?=\s*\$)/i,
        alias: "type-hint",
        greedy: !0,
        lookbehind: !0,
      },
      {
        pattern: /([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
        alias: ["class-name-fully-qualified", "type-hint"],
        greedy: !0,
        lookbehind: !0,
        inside: { punctuation: /\\/ },
      },
      {
        pattern: /(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/i,
        alias: "return-type",
        greedy: !0,
        lookbehind: !0,
      },
      {
        pattern: /(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
        alias: ["class-name-fully-qualified", "return-type"],
        greedy: !0,
        lookbehind: !0,
        inside: { punctuation: /\\/ },
      },
    ],
    constant: t,
    function: /\b\w+(?=\s*\()/,
    property: { pattern: /(->\s*)\w+/, lookbehind: !0 },
    number: i,
    operator: n,
    punctuation: s,
  };
  var l = {
      pattern: /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)*)/,
      lookbehind: !0,
      inside: a.languages.php,
    },
    r = [
      {
        pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,
        alias: "nowdoc-string",
        greedy: !0,
        inside: {
          delimiter: {
            pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
            alias: "symbol",
            inside: { punctuation: /^<<<'?|[';]$/ },
          },
        },
      },
      {
        pattern: /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,
        alias: "heredoc-string",
        greedy: !0,
        inside: {
          delimiter: {
            pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
            alias: "symbol",
            inside: { punctuation: /^<<<"?|[";]$/ },
          },
          interpolation: l,
        },
      },
      {
        pattern: /`(?:\\[\s\S]|[^\\`])*`/,
        alias: "backtick-quoted-string",
        greedy: !0,
      },
      {
        pattern: /'(?:\\[\s\S]|[^\\'])*'/,
        alias: "single-quoted-string",
        greedy: !0,
      },
      {
        pattern: /"(?:\\[\s\S]|[^\\"])*"/,
        alias: "double-quoted-string",
        greedy: !0,
        inside: { interpolation: l },
      },
    ];
  a.languages.insertBefore("php", "variable", {
    string: r,
    attribute: {
      pattern: /#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/im,
      greedy: !0,
      inside: {
        "attribute-content": {
          pattern: /^(#\[)[\s\S]+(?=]$)/,
          lookbehind: !0,
          inside: {
            comment: e,
            string: r,
            "attribute-class-name": [
              {
                pattern: /([^:]|^)\b[a-z_]\w*(?!\\)\b/i,
                alias: "class-name",
                greedy: !0,
                lookbehind: !0,
              },
              {
                pattern: /([^:]|^)(?:\\?\b[a-z_]\w*)+/i,
                alias: ["class-name", "class-name-fully-qualified"],
                greedy: !0,
                lookbehind: !0,
                inside: { punctuation: /\\/ },
              },
            ],
            constant: t,
            number: i,
            operator: n,
            punctuation: s,
          },
        },
        delimiter: { pattern: /^#\[|]$/, alias: "punctuation" },
      },
    },
  }),
    a.hooks.add("before-tokenize", function (e) {
      if (/<\?/.test(e.code)) {
        a.languages["markup-templating"].buildPlaceholders(
          e,
          "php",
          /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/gi
        );
      }
    }),
    a.hooks.add("after-tokenize", function (e) {
      a.languages["markup-templating"].tokenizePlaceholders(e, "php");
    });
})(Prism);
Prism.languages.sql = {
  comment: {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
    lookbehind: !0,
  },
  variable: [
    { pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/, greedy: !0 },
    /@[\w.$]+/,
  ],
  string: {
    pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
    greedy: !0,
    lookbehind: !0,
  },
  function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
  keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:S|ING)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
  boolean: /\b(?:TRUE|FALSE|NULL)\b/i,
  number: /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
  operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|IN|ILIKE|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
  punctuation: /[;[\]()`,.]/,
};
!(function (E) {
  var A = (E.languages.plsql = E.languages.extend("sql", {
      comment: [/\/\*[\s\S]*?\*\//, /--.*/],
    })),
    T = A.keyword;
  Array.isArray(T) || (T = A.keyword = [T]),
    T.unshift(
      /\b(?:ACCESS|AGENT|AGGREGATE|ARRAY|ARROW|AT|ATTRIBUTE|AUDIT|AUTHID|BFILE_BASE|BLOB_BASE|BLOCK|BODY|BOTH|BOUND|BYTE|CALLING|CHAR_BASE|CHARSET(?:FORM|ID)|CLOB_BASE|COLAUTH|COLLECT|CLUSTERS?|COMPILED|COMPRESS|CONSTANT|CONSTRUCTOR|CONTEXT|CRASH|CUSTOMDATUM|DANGLING|DATE_BASE|DEFINE|DETERMINISTIC|DURATION|ELEMENT|EMPTY|EXCEPTIONS?|EXCLUSIVE|EXTERNAL|FINAL|FORALL|FORM|FOUND|GENERAL|HEAP|HIDDEN|IDENTIFIED|IMMEDIATE|INCLUDING|INCREMENT|INDICATOR|INDEXES|INDICES|INFINITE|INITIAL|ISOPEN|INSTANTIABLE|INTERFACE|INVALIDATE|JAVA|LARGE|LEADING|LENGTH|LIBRARY|LIKE[24C]|LIMITED|LONG|LOOP|MAP|MAXEXTENTS|MAXLEN|MEMBER|MINUS|MLSLABEL|MULTISET|NAME|NAN|NATIVE|NEW|NOAUDIT|NOCOMPRESS|NOCOPY|NOTFOUND|NOWAIT|NUMBER(?:_BASE)?|OBJECT|OCI(?:COLL|DATE|DATETIME|DURATION|INTERVAL|LOBLOCATOR|NUMBER|RAW|REF|REFCURSOR|ROWID|STRING|TYPE)|OFFLINE|ONLINE|ONLY|OPAQUE|OPERATOR|ORACLE|ORADATA|ORGANIZATION|ORL(?:ANY|VARY)|OTHERS|OVERLAPS|OVERRIDING|PACKAGE|PARALLEL_ENABLE|PARAMETERS?|PASCAL|PCTFREE|PIPE(?:LINED)?|PRAGMA|PRIOR|PRIVATE|RAISE|RANGE|RAW|RECORD|REF|REFERENCE|REM|REMAINDER|RESULT|RESOURCE|RETURNING|REVERSE|ROW(?:ID|NUM|TYPE)|SAMPLE|SB[124]|SEGMENT|SELF|SEPARATE|SEQUENCE|SHORT|SIZE(?:_T)?|SPARSE|SQL(?:CODE|DATA|NAME|STATE)|STANDARD|STATIC|STDDEV|STORED|STRING|STRUCT|STYLE|SUBMULTISET|SUBPARTITION|SUBSTITUTABLE|SUBTYPE|SUCCESSFUL|SYNONYM|SYSDATE|TABAUTH|TDO|THE|TIMEZONE_(?:ABBR|HOUR|MINUTE|REGION)|TRAILING|TRANSAC(?:TIONAL)?|TRUSTED|UB[124]|UID|UNDER|UNTRUSTED|VALIDATE|VALIST|VARCHAR2|VARIABLE|VARIANCE|VARRAY|VIEWS|VOID|WHENEVER|WRAPPED|ZONE)\b/i
    );
  var R = A.operator;
  Array.isArray(R) || (R = A.operator = [R]), R.unshift(/:=/);
})(Prism);
(Prism.languages.python = {
  comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
  "string-interpolation": {
    pattern: /(?:f|rf|fr)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
    greedy: !0,
    inside: {
      interpolation: {
        pattern: /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
        lookbehind: !0,
        inside: {
          "format-spec": { pattern: /(:)[^:(){}]+(?=}$)/, lookbehind: !0 },
          "conversion-option": {
            pattern: /![sra](?=[:}]$)/,
            alias: "punctuation",
          },
          rest: null,
        },
      },
      string: /[\s\S]+/,
    },
  },
  "triple-quoted-string": {
    pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]*?\1/i,
    greedy: !0,
    alias: "string",
  },
  string: {
    pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
    greedy: !0,
  },
  function: {
    pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
    lookbehind: !0,
  },
  "class-name": { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
  decorator: {
    pattern: /(^\s*)@\w+(?:\.\w+)*/im,
    lookbehind: !0,
    alias: ["annotation", "punctuation"],
    inside: { punctuation: /\./ },
  },
  keyword: /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
  builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
  boolean: /\b(?:True|False|None)\b/,
  number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?j?\b/i,
  operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
  punctuation: /[{}[\];(),.:]/,
}),
  (Prism.languages.python[
    "string-interpolation"
  ].inside.interpolation.inside.rest = Prism.languages.python),
  (Prism.languages.py = Prism.languages.python);
Prism.languages.r = {
  comment: /#.*/,
  string: { pattern: /(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
  "percent-operator": { pattern: /%[^%\s]*%/, alias: "operator" },
  boolean: /\b(?:TRUE|FALSE)\b/,
  ellipsis: /\.\.(?:\.|\d+)/,
  number: [
    /\b(?:NaN|Inf)\b/,
    /(?:\b0x[\dA-Fa-f]+(?:\.\d*)?|\b\d+(?:\.\d*)?|\B\.\d+)(?:[EePp][+-]?\d+)?[iL]?/,
  ],
  keyword: /\b(?:if|else|repeat|while|function|for|in|next|break|NULL|NA|NA_integer_|NA_real_|NA_complex_|NA_character_)\b/,
  operator: /->?>?|<(?:=|<?-)?|[>=!]=?|::?|&&?|\|\|?|[+*\/^$@~]/,
  punctuation: /[(){}\[\],;]/,
};
!(function (e) {
  (e.languages.sass = e.languages.extend("css", {
    comment: {
      pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t].+)*/m,
      lookbehind: !0,
    },
  })),
    e.languages.insertBefore("sass", "atrule", {
      "atrule-line": {
        pattern: /^(?:[ \t]*)[@+=].+/m,
        inside: { atrule: /(?:@[\w-]+|[+=])/m },
      },
    }),
    delete e.languages.sass.atrule;
  var t = /\$[-\w]+|#\{\$[-\w]+\}/,
    a = [
      /[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/,
      { pattern: /(\s+)-(?=\s)/, lookbehind: !0 },
    ];
  e.languages.insertBefore("sass", "property", {
    "variable-line": {
      pattern: /^[ \t]*\$.+/m,
      inside: { punctuation: /:/, variable: t, operator: a },
    },
    "property-line": {
      pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s].*)/m,
      inside: {
        property: [
          /[^:\s]+(?=\s*:)/,
          { pattern: /(:)[^:\s]+/, lookbehind: !0 },
        ],
        punctuation: /:/,
        variable: t,
        operator: a,
        important: e.languages.sass.important,
      },
    },
  }),
    delete e.languages.sass.property,
    delete e.languages.sass.important,
    e.languages.insertBefore("sass", "punctuation", {
      selector: {
        pattern: /([ \t]*)\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*)*/,
        lookbehind: !0,
      },
    });
})(Prism);
(Prism.languages.scss = Prism.languages.extend("css", {
  comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: !0 },
  atrule: {
    pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
    inside: { rule: /@[\w-]+/ },
  },
  url: /(?:[-a-z]+-)?url(?=\()/i,
  selector: {
    pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]+))/m,
    inside: {
      parent: { pattern: /&/, alias: "important" },
      placeholder: /%[-\w]+/,
      variable: /\$[-\w]+|#\{\$[-\w]+\}/,
    },
  },
  property: {
    pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
    inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ },
  },
})),
  Prism.languages.insertBefore("scss", "atrule", {
    keyword: [
      /@(?:if|else(?: if)?|forward|for|each|while|import|use|extend|debug|warn|mixin|include|function|return|content)\b/i,
      { pattern: /( +)(?:from|through)(?= )/, lookbehind: !0 },
    ],
  }),
  Prism.languages.insertBefore("scss", "important", {
    variable: /\$[-\w]+|#\{\$[-\w]+\}/,
  }),
  Prism.languages.insertBefore("scss", "function", {
    "module-modifier": {
      pattern: /\b(?:as|with|show|hide)\b/i,
      alias: "keyword",
    },
    placeholder: { pattern: /%[-\w]+/, alias: "selector" },
    statement: { pattern: /\B!(?:default|optional)\b/i, alias: "keyword" },
    boolean: /\b(?:true|false)\b/,
    null: { pattern: /\bnull\b/, alias: "keyword" },
    operator: {
      pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
      lookbehind: !0,
    },
  }),
  (Prism.languages.scss.atrule.inside.rest = Prism.languages.scss);
!(function (e) {
  (e.languages.typescript = e.languages.extend("javascript", {
    "class-name": {
      pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
      lookbehind: !0,
      greedy: !0,
      inside: null,
    },
    keyword: /\b(?:abstract|as|asserts|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|undefined|var|void|while|with|yield)\b/,
    builtin: /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/,
  })),
    delete e.languages.typescript.parameter;
  var t = e.languages.extend("typescript", {});
  delete t["class-name"],
    (e.languages.typescript["class-name"].inside = t),
    e.languages.insertBefore("typescript", "function", {
      decorator: {
        pattern: /@[$\w\xA0-\uFFFF]+/,
        inside: {
          at: { pattern: /^@/, alias: "operator" },
          function: /^[\s\S]+/,
        },
      },
      "generic-function": {
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
        greedy: !0,
        inside: {
          function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
          generic: { pattern: /<[\s\S]+/, alias: "class-name", inside: t },
        },
      },
    }),
    (e.languages.ts = e.languages.typescript);
})(Prism);
(Prism.languages.uri = {
  scheme: {
    pattern: /^[a-z][a-z0-9+.-]*:/im,
    greedy: !0,
    inside: { "scheme-delimiter": /:$/ },
  },
  fragment: {
    pattern: /#[\w\-.~!$&'()*+,;=%:@/?]*/,
    inside: { "fragment-delimiter": /^#/ },
  },
  query: {
    pattern: /\?[\w\-.~!$&'()*+,;=%:@/?]*/,
    inside: {
      "query-delimiter": { pattern: /^\?/, greedy: !0 },
      "pair-delimiter": /[&;]/,
      pair: {
        pattern: /^[^=][\s\S]*/,
        inside: {
          key: /^[^=]+/,
          value: { pattern: /(^=)[\s\S]+/, lookbehind: !0 },
        },
      },
    },
  },
  authority: {
    pattern: RegExp(
      "^//(?:[\\w\\-.~!$&'()*+,;=%:]*@)?(?:\\[(?:[0-9a-fA-F:.]{2,48}|v[0-9a-fA-F]+\\.[\\w\\-.~!$&'()*+,;=]+)\\]|[\\w\\-.~!$&'()*+,;=%]*)(?::\\d*)?",
      "m"
    ),
    inside: {
      "authority-delimiter": /^\/\//,
      "user-info-segment": {
        pattern: /^[\w\-.~!$&'()*+,;=%:]*@/,
        inside: {
          "user-info-delimiter": /@$/,
          "user-info": /^[\w\-.~!$&'()*+,;=%:]+/,
        },
      },
      "port-segment": {
        pattern: /:\d*$/,
        inside: { "port-delimiter": /^:/, port: /^\d+/ },
      },
      host: {
        pattern: /[\s\S]+/,
        inside: {
          "ip-literal": {
            pattern: /^\[[\s\S]+\]$/,
            inside: {
              "ip-literal-delimiter": /^\[|\]$/,
              "ipv-future": /^v[\s\S]+/,
              "ipv6-address": /^[\s\S]+/,
            },
          },
          "ipv4-address": /^(?:(?:[03-9]\d?|[12]\d{0,2})\.){3}(?:[03-9]\d?|[12]{0,2})$/,
        },
      },
    },
  },
  path: {
    pattern: /^[\w\-.~!$&'()*+,;=%:@/]+/m,
    inside: { "path-separator": /\// },
  },
}),
  (Prism.languages.url = Prism.languages.uri);
Prism.languages.vim = {
  string: /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\r\n]|'')*'/,
  comment: /".*/,
  function: /\w+(?=\()/,
  keyword: /\b(?:ab|abbreviate|abc|abclear|abo|aboveleft|al|all|arga|argadd|argd|argdelete|argdo|arge|argedit|argg|argglobal|argl|arglocal|ar|args|argu|argument|as|ascii|bad|badd|ba|ball|bd|bdelete|be|bel|belowright|bf|bfirst|bl|blast|bm|bmodified|bn|bnext|bN|bNext|bo|botright|bp|bprevious|brea|break|breaka|breakadd|breakd|breakdel|breakl|breaklist|br|brewind|bro|browse|bufdo|b|buffer|buffers|bun|bunload|bw|bwipeout|ca|cabbrev|cabc|cabclear|caddb|caddbuffer|cad|caddexpr|caddf|caddfile|cal|call|cat|catch|cb|cbuffer|cc|ccl|cclose|cd|ce|center|cex|cexpr|cf|cfile|cfir|cfirst|cgetb|cgetbuffer|cgete|cgetexpr|cg|cgetfile|c|change|changes|chd|chdir|che|checkpath|checkt|checktime|cla|clast|cl|clist|clo|close|cmapc|cmapclear|cnew|cnewer|cn|cnext|cN|cNext|cnf|cnfile|cNfcNfile|cnorea|cnoreabbrev|col|colder|colo|colorscheme|comc|comclear|comp|compiler|conf|confirm|con|continue|cope|copen|co|copy|cpf|cpfile|cp|cprevious|cq|cquit|cr|crewind|cuna|cunabbrev|cu|cunmap|cw|cwindow|debugg|debuggreedy|delc|delcommand|d|delete|delf|delfunction|delm|delmarks|diffg|diffget|diffoff|diffpatch|diffpu|diffput|diffsplit|diffthis|diffu|diffupdate|dig|digraphs|di|display|dj|djump|dl|dlist|dr|drop|ds|dsearch|dsp|dsplit|earlier|echoe|echoerr|echom|echomsg|echon|e|edit|el|else|elsei|elseif|em|emenu|endfo|endfor|endf|endfunction|endfun|en|endif|endt|endtry|endw|endwhile|ene|enew|ex|exi|exit|exu|exusage|f|file|files|filetype|fina|finally|fin|find|fini|finish|fir|first|fix|fixdel|fo|fold|foldc|foldclose|folddoc|folddoclosed|foldd|folddoopen|foldo|foldopen|for|fu|fun|function|go|goto|gr|grep|grepa|grepadd|ha|hardcopy|h|help|helpf|helpfind|helpg|helpgrep|helpt|helptags|hid|hide|his|history|ia|iabbrev|iabc|iabclear|if|ij|ijump|il|ilist|imapc|imapclear|in|inorea|inoreabbrev|isearch|isp|isplit|iuna|iunabbrev|iu|iunmap|j|join|ju|jumps|k|keepalt|keepj|keepjumps|kee|keepmarks|laddb|laddbuffer|lad|laddexpr|laddf|laddfile|lan|language|la|last|later|lb|lbuffer|lc|lcd|lch|lchdir|lcl|lclose|let|left|lefta|leftabove|lex|lexpr|lf|lfile|lfir|lfirst|lgetb|lgetbuffer|lgete|lgetexpr|lg|lgetfile|lgr|lgrep|lgrepa|lgrepadd|lh|lhelpgrep|l|list|ll|lla|llast|lli|llist|lmak|lmake|lm|lmap|lmapc|lmapclear|lnew|lnewer|lne|lnext|lN|lNext|lnf|lnfile|lNf|lNfile|ln|lnoremap|lo|loadview|loc|lockmarks|lockv|lockvar|lol|lolder|lop|lopen|lpf|lpfile|lp|lprevious|lr|lrewind|ls|lt|ltag|lu|lunmap|lv|lvimgrep|lvimgrepa|lvimgrepadd|lw|lwindow|mak|make|ma|mark|marks|mat|match|menut|menutranslate|mk|mkexrc|mks|mksession|mksp|mkspell|mkvie|mkview|mkv|mkvimrc|mod|mode|m|move|mzf|mzfile|mz|mzscheme|nbkey|new|n|next|N|Next|nmapc|nmapclear|noh|nohlsearch|norea|noreabbrev|nu|number|nun|nunmap|omapc|omapclear|on|only|o|open|opt|options|ou|ounmap|pc|pclose|ped|pedit|pe|perl|perld|perldo|po|pop|popu|popup|pp|ppop|pre|preserve|prev|previous|p|print|P|Print|profd|profdel|prof|profile|promptf|promptfind|promptr|promptrepl|ps|psearch|pta|ptag|ptf|ptfirst|ptj|ptjump|ptl|ptlast|ptn|ptnext|ptN|ptNext|ptp|ptprevious|ptr|ptrewind|pts|ptselect|pu|put|pw|pwd|pyf|pyfile|py|python|qa|qall|q|quit|quita|quitall|r|read|rec|recover|redi|redir|red|redo|redr|redraw|redraws|redrawstatus|reg|registers|res|resize|ret|retab|retu|return|rew|rewind|ri|right|rightb|rightbelow|rub|ruby|rubyd|rubydo|rubyf|rubyfile|ru|runtime|rv|rviminfo|sal|sall|san|sandbox|sa|sargument|sav|saveas|sba|sball|sbf|sbfirst|sbl|sblast|sbm|sbmodified|sbn|sbnext|sbN|sbNext|sbp|sbprevious|sbr|sbrewind|sb|sbuffer|scripte|scriptencoding|scrip|scriptnames|se|set|setf|setfiletype|setg|setglobal|setl|setlocal|sf|sfind|sfir|sfirst|sh|shell|sign|sil|silent|sim|simalt|sla|slast|sl|sleep|sm|smagic|smap|smapc|smapclear|sme|smenu|sn|snext|sN|sNext|sni|sniff|sno|snomagic|snor|snoremap|snoreme|snoremenu|sor|sort|so|source|spelld|spelldump|spe|spellgood|spelli|spellinfo|spellr|spellrepall|spellu|spellundo|spellw|spellwrong|sp|split|spr|sprevious|sre|srewind|sta|stag|startg|startgreplace|star|startinsert|startr|startreplace|stj|stjump|st|stop|stopi|stopinsert|sts|stselect|sun|sunhide|sunm|sunmap|sus|suspend|sv|sview|syncbind|t|tab|tabc|tabclose|tabd|tabdo|tabe|tabedit|tabf|tabfind|tabfir|tabfirst|tabl|tablast|tabm|tabmove|tabnew|tabn|tabnext|tabN|tabNext|tabo|tabonly|tabp|tabprevious|tabr|tabrewind|tabs|ta|tag|tags|tc|tcl|tcld|tcldo|tclf|tclfile|te|tearoff|tf|tfirst|th|throw|tj|tjump|tl|tlast|tm|tmenu|tn|tnext|tN|tNext|to|topleft|tp|tprevious|tr|trewind|try|ts|tselect|tu|tunmenu|una|unabbreviate|u|undo|undoj|undojoin|undol|undolist|unh|unhide|unlet|unlo|unlockvar|unm|unmap|up|update|verb|verbose|ve|version|vert|vertical|vie|view|vim|vimgrep|vimgrepa|vimgrepadd|vi|visual|viu|viusage|vmapc|vmapclear|vne|vnew|vs|vsplit|vu|vunmap|wa|wall|wh|while|winc|wincmd|windo|winp|winpos|win|winsize|wn|wnext|wN|wNext|wp|wprevious|wq|wqa|wqall|w|write|ws|wsverb|wv|wviminfo|X|xa|xall|x|xit|xm|xmap|xmapc|xmapclear|xme|xmenu|XMLent|XMLns|xn|xnoremap|xnoreme|xnoremenu|xu|xunmap|y|yank)\b/,
  builtin: /\b(?:autocmd|acd|ai|akm|aleph|allowrevins|altkeymap|ambiwidth|ambw|anti|antialias|arab|arabic|arabicshape|ari|arshape|autochdir|autoindent|autoread|autowrite|autowriteall|aw|awa|background|backspace|backup|backupcopy|backupdir|backupext|backupskip|balloondelay|ballooneval|balloonexpr|bdir|bdlay|beval|bex|bexpr|bg|bh|bin|binary|biosk|bioskey|bk|bkc|bomb|breakat|brk|browsedir|bs|bsdir|bsk|bt|bufhidden|buflisted|buftype|casemap|ccv|cdpath|cedit|cfu|ch|charconvert|ci|cin|cindent|cink|cinkeys|cino|cinoptions|cinw|cinwords|clipboard|cmdheight|cmdwinheight|cmp|cms|columns|com|comments|commentstring|compatible|complete|completefunc|completeopt|consk|conskey|copyindent|cot|cpo|cpoptions|cpt|cscopepathcomp|cscopeprg|cscopequickfix|cscopetag|cscopetagorder|cscopeverbose|cspc|csprg|csqf|cst|csto|csverb|cuc|cul|cursorcolumn|cursorline|cwh|debug|deco|def|define|delcombine|dex|dg|dict|dictionary|diff|diffexpr|diffopt|digraph|dip|dir|directory|dy|ea|ead|eadirection|eb|ed|edcompatible|ef|efm|ei|ek|enc|encoding|endofline|eol|ep|equalalways|equalprg|errorbells|errorfile|errorformat|esckeys|et|eventignore|expandtab|exrc|fcl|fcs|fdc|fde|fdi|fdl|fdls|fdm|fdn|fdo|fdt|fen|fenc|fencs|fex|ff|ffs|fileencoding|fileencodings|fileformat|fileformats|fillchars|fk|fkmap|flp|fml|fmr|foldcolumn|foldenable|foldexpr|foldignore|foldlevel|foldlevelstart|foldmarker|foldmethod|foldminlines|foldnestmax|foldtext|formatexpr|formatlistpat|formatoptions|formatprg|fp|fs|fsync|ft|gcr|gd|gdefault|gfm|gfn|gfs|gfw|ghr|gp|grepformat|grepprg|gtl|gtt|guicursor|guifont|guifontset|guifontwide|guiheadroom|guioptions|guipty|guitablabel|guitabtooltip|helpfile|helpheight|helplang|hf|hh|hi|hidden|highlight|hk|hkmap|hkmapp|hkp|hl|hlg|hls|hlsearch|ic|icon|iconstring|ignorecase|im|imactivatekey|imak|imc|imcmdline|imd|imdisable|imi|iminsert|ims|imsearch|inc|include|includeexpr|incsearch|inde|indentexpr|indentkeys|indk|inex|inf|infercase|insertmode|isf|isfname|isi|isident|isk|iskeyword|isprint|joinspaces|js|key|keymap|keymodel|keywordprg|km|kmp|kp|langmap|langmenu|laststatus|lazyredraw|lbr|lcs|linebreak|lines|linespace|lisp|lispwords|listchars|loadplugins|lpl|lsp|lz|macatsui|magic|makeef|makeprg|matchpairs|matchtime|maxcombine|maxfuncdepth|maxmapdepth|maxmem|maxmempattern|maxmemtot|mco|mef|menuitems|mfd|mh|mis|mkspellmem|ml|mls|mm|mmd|mmp|mmt|modeline|modelines|modifiable|modified|more|mouse|mousef|mousefocus|mousehide|mousem|mousemodel|mouses|mouseshape|mouset|mousetime|mp|mps|msm|mzq|mzquantum|nf|nrformats|numberwidth|nuw|odev|oft|ofu|omnifunc|opendevice|operatorfunc|opfunc|osfiletype|pa|para|paragraphs|paste|pastetoggle|patchexpr|patchmode|path|pdev|penc|pex|pexpr|pfn|ph|pheader|pi|pm|pmbcs|pmbfn|popt|preserveindent|previewheight|previewwindow|printdevice|printencoding|printexpr|printfont|printheader|printmbcharset|printmbfont|printoptions|prompt|pt|pumheight|pvh|pvw|qe|quoteescape|readonly|remap|report|restorescreen|revins|rightleft|rightleftcmd|rl|rlc|ro|rs|rtp|ruf|ruler|rulerformat|runtimepath|sbo|sc|scb|scr|scroll|scrollbind|scrolljump|scrolloff|scrollopt|scs|sect|sections|secure|sel|selection|selectmode|sessionoptions|sft|shcf|shellcmdflag|shellpipe|shellquote|shellredir|shellslash|shelltemp|shelltype|shellxquote|shiftround|shiftwidth|shm|shortmess|shortname|showbreak|showcmd|showfulltag|showmatch|showmode|showtabline|shq|si|sidescroll|sidescrolloff|siso|sj|slm|smartcase|smartindent|smarttab|smc|smd|softtabstop|sol|spc|spell|spellcapcheck|spellfile|spelllang|spellsuggest|spf|spl|splitbelow|splitright|sps|sr|srr|ss|ssl|ssop|stal|startofline|statusline|stl|stmp|su|sua|suffixes|suffixesadd|sw|swapfile|swapsync|swb|swf|switchbuf|sws|sxq|syn|synmaxcol|syntax|tabline|tabpagemax|tabstop|tagbsearch|taglength|tagrelative|tagstack|tal|tb|tbi|tbidi|tbis|tbs|tenc|term|termbidi|termencoding|terse|textauto|textmode|textwidth|tgst|thesaurus|tildeop|timeout|timeoutlen|title|titlelen|titleold|titlestring|toolbar|toolbariconsize|top|tpm|tsl|tsr|ttimeout|ttimeoutlen|ttm|tty|ttybuiltin|ttyfast|ttym|ttymouse|ttyscroll|ttytype|tw|tx|uc|ul|undolevels|updatecount|updatetime|ut|vb|vbs|vdir|verbosefile|vfile|viewdir|viewoptions|viminfo|virtualedit|visualbell|vop|wak|warn|wb|wc|wcm|wd|weirdinvert|wfh|wfw|whichwrap|wi|wig|wildchar|wildcharm|wildignore|wildmenu|wildmode|wildoptions|wim|winaltkeys|window|winfixheight|winfixwidth|winheight|winminheight|winminwidth|winwidth|wiv|wiw|wm|wmh|wmnu|wmw|wop|wrap|wrapmargin|wrapscan|writeany|writebackup|writedelay|ww|noacd|noai|noakm|noallowrevins|noaltkeymap|noanti|noantialias|noar|noarab|noarabic|noarabicshape|noari|noarshape|noautochdir|noautoindent|noautoread|noautowrite|noautowriteall|noaw|noawa|nobackup|noballooneval|nobeval|nobin|nobinary|nobiosk|nobioskey|nobk|nobl|nobomb|nobuflisted|nocf|noci|nocin|nocindent|nocompatible|noconfirm|noconsk|noconskey|nocopyindent|nocp|nocscopetag|nocscopeverbose|nocst|nocsverb|nocuc|nocul|nocursorcolumn|nocursorline|nodeco|nodelcombine|nodg|nodiff|nodigraph|nodisable|noea|noeb|noed|noedcompatible|noek|noendofline|noeol|noequalalways|noerrorbells|noesckeys|noet|noex|noexpandtab|noexrc|nofen|nofk|nofkmap|nofoldenable|nogd|nogdefault|noguipty|nohid|nohidden|nohk|nohkmap|nohkmapp|nohkp|nohls|noic|noicon|noignorecase|noim|noimc|noimcmdline|noimd|noincsearch|noinf|noinfercase|noinsertmode|nois|nojoinspaces|nojs|nolazyredraw|nolbr|nolinebreak|nolisp|nolist|noloadplugins|nolpl|nolz|noma|nomacatsui|nomagic|nomh|noml|nomod|nomodeline|nomodifiable|nomodified|nomore|nomousef|nomousefocus|nomousehide|nonu|nonumber|noodev|noopendevice|nopaste|nopi|nopreserveindent|nopreviewwindow|noprompt|nopvw|noreadonly|noremap|norestorescreen|norevins|nori|norightleft|norightleftcmd|norl|norlc|noro|nors|noru|noruler|nosb|nosc|noscb|noscrollbind|noscs|nosecure|nosft|noshellslash|noshelltemp|noshiftround|noshortname|noshowcmd|noshowfulltag|noshowmatch|noshowmode|nosi|nosm|nosmartcase|nosmartindent|nosmarttab|nosmd|nosn|nosol|nospell|nosplitbelow|nosplitright|nospr|nosr|nossl|nosta|nostartofline|nostmp|noswapfile|noswf|nota|notagbsearch|notagrelative|notagstack|notbi|notbidi|notbs|notermbidi|noterse|notextauto|notextmode|notf|notgst|notildeop|notimeout|notitle|noto|notop|notr|nottimeout|nottybuiltin|nottyfast|notx|novb|novisualbell|nowa|nowarn|nowb|noweirdinvert|nowfh|nowfw|nowildmenu|nowinfixheight|nowinfixwidth|nowiv|nowmnu|nowrap|nowrapscan|nowrite|nowriteany|nowritebackup|nows|invacd|invai|invakm|invallowrevins|invaltkeymap|invanti|invantialias|invar|invarab|invarabic|invarabicshape|invari|invarshape|invautochdir|invautoindent|invautoread|invautowrite|invautowriteall|invaw|invawa|invbackup|invballooneval|invbeval|invbin|invbinary|invbiosk|invbioskey|invbk|invbl|invbomb|invbuflisted|invcf|invci|invcin|invcindent|invcompatible|invconfirm|invconsk|invconskey|invcopyindent|invcp|invcscopetag|invcscopeverbose|invcst|invcsverb|invcuc|invcul|invcursorcolumn|invcursorline|invdeco|invdelcombine|invdg|invdiff|invdigraph|invdisable|invea|inveb|inved|invedcompatible|invek|invendofline|inveol|invequalalways|inverrorbells|invesckeys|invet|invex|invexpandtab|invexrc|invfen|invfk|invfkmap|invfoldenable|invgd|invgdefault|invguipty|invhid|invhidden|invhk|invhkmap|invhkmapp|invhkp|invhls|invhlsearch|invic|invicon|invignorecase|invim|invimc|invimcmdline|invimd|invincsearch|invinf|invinfercase|invinsertmode|invis|invjoinspaces|invjs|invlazyredraw|invlbr|invlinebreak|invlisp|invlist|invloadplugins|invlpl|invlz|invma|invmacatsui|invmagic|invmh|invml|invmod|invmodeline|invmodifiable|invmodified|invmore|invmousef|invmousefocus|invmousehide|invnu|invnumber|invodev|invopendevice|invpaste|invpi|invpreserveindent|invpreviewwindow|invprompt|invpvw|invreadonly|invremap|invrestorescreen|invrevins|invri|invrightleft|invrightleftcmd|invrl|invrlc|invro|invrs|invru|invruler|invsb|invsc|invscb|invscrollbind|invscs|invsecure|invsft|invshellslash|invshelltemp|invshiftround|invshortname|invshowcmd|invshowfulltag|invshowmatch|invshowmode|invsi|invsm|invsmartcase|invsmartindent|invsmarttab|invsmd|invsn|invsol|invspell|invsplitbelow|invsplitright|invspr|invsr|invssl|invsta|invstartofline|invstmp|invswapfile|invswf|invta|invtagbsearch|invtagrelative|invtagstack|invtbi|invtbidi|invtbs|invtermbidi|invterse|invtextauto|invtextmode|invtf|invtgst|invtildeop|invtimeout|invtitle|invto|invtop|invtr|invttimeout|invttybuiltin|invttyfast|invtx|invvb|invvisualbell|invwa|invwarn|invwb|invweirdinvert|invwfh|invwfw|invwildmenu|invwinfixheight|invwinfixwidth|invwiv|invwmnu|invwrap|invwrapscan|invwrite|invwriteany|invwritebackup|invws|t_AB|t_AF|t_al|t_AL|t_bc|t_cd|t_ce|t_Ce|t_cl|t_cm|t_Co|t_cs|t_Cs|t_CS|t_CV|t_da|t_db|t_dl|t_DL|t_EI|t_F1|t_F2|t_F3|t_F4|t_F5|t_F6|t_F7|t_F8|t_F9|t_fs|t_IE|t_IS|t_k1|t_K1|t_k2|t_k3|t_K3|t_k4|t_K4|t_k5|t_K5|t_k6|t_K6|t_k7|t_K7|t_k8|t_K8|t_k9|t_K9|t_KA|t_kb|t_kB|t_KB|t_KC|t_kd|t_kD|t_KD|t_ke|t_KE|t_KF|t_KG|t_kh|t_KH|t_kI|t_KI|t_KJ|t_KK|t_kl|t_KL|t_kN|t_kP|t_kr|t_ks|t_ku|t_le|t_mb|t_md|t_me|t_mr|t_ms|t_nd|t_op|t_RI|t_RV|t_Sb|t_se|t_Sf|t_SI|t_so|t_sr|t_te|t_ti|t_ts|t_ue|t_us|t_ut|t_vb|t_ve|t_vi|t_vs|t_WP|t_WS|t_xs|t_ZH|t_ZR)\b/,
  number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?)\b/i,
  operator: /\|\||&&|[-+.]=?|[=!](?:[=~][#?]?)?|[<>]=?[#?]?|[*\/%?]|\b(?:is(?:not)?)\b/,
  punctuation: /[{}[\](),;:]/,
};
!(function (n) {
  function a(a, e) {
    n.languages[a] &&
      n.languages.insertBefore(a, "comment", { "doc-comment": e });
  }
  var e = n.languages.markup.tag,
    t = {
      pattern: /\/\/\/.*/,
      greedy: !0,
      alias: "comment",
      inside: { tag: e },
    },
    g = { pattern: /'''.*/, greedy: !0, alias: "comment", inside: { tag: e } };
  a("csharp", t), a("fsharp", t), a("vbnet", g);
})(Prism);
