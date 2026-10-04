/* くすの木整骨院 計測(アクセス解析)
   ・本番ドメイン(kusunoki-seikotsuin.com)で開いたときだけ動く。仮の場所では何もしない
   ・記録するもの: 見られたページ / 電話ボタンのタップ(tel_cv) / LINEボタンのタップ(line_cv)
   ・Google広告のタグ(AW-18493516681)も同じ仕組みで読み込む。広告からの来院者の動きを数えるため
   ・tel_cv と line_cv は旧HPの計測と同じ名前(切替の前後を同じ表で比べるため)
   ・button_place: どこのボタンが押されたか */
(function () {
  var ID = "G-JVHS483XTF";
  var host = location.hostname;
  if (host !== "kusunoki-seikotsuin.com" && host !== "www.kusunoki-seikotsuin.com") return;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", ID);
   var AW = "AW-18493516681";   /* Google広告のタグ */
   gtag("config", AW);

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID;
  document.head.appendChild(s);

  /* ボタンの場所 */
  function place(a) {
    if (a.closest("nav.stickybar")) return "画面下の固定ボタン";
    if (a.closest("header")) return "最初の画面";
    if (a.closest("footer")) return "一番下";
    var sec = a.closest("section[id]");
    if (sec) return sec.id;
    return "本文";
  }

  /* 電話・LINEのタップ */
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a) return;
    var href = a.getAttribute("href") || "";
    var name = null;
    if (href.indexOf("tel:") === 0) name = "tel_cv";
    else if (href.indexOf("line.me") !== -1) name = "line_cv";
    if (!name) return;
    gtag("event", name, { button_place: place(a), transport_type: "beacon" });
  }, true);
})();
