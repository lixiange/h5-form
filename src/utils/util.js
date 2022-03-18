import { request } from "../request/api";
import html2canvas from "html2canvas";
import shareConfig from "../config/WECHAT_SHARE";
import _ from "loadsh";
/**
 *
 * @param {string} name 地址栏参数名称
 */
const GetQueryString = (name) => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
};
/**
 *
 * @param {object} href window.location 对象
 * @param {object} opt 自定义配置参数
 */
const wechatShare = (href, opt) => {
  let origion = href.origin;
  let pathname = href.pathname;
  let search = href.search;
  request
    .wechatJssdk({
      href: origion + pathname + search,
    })
    .then((res) => {
      let data = res.signature;
      window.wx.config({
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: shareConfig.jsApiList,
      });
      const { title, desc, imgUrl, link } = _.merge(shareConfig,opt);

      window.wx.ready(function () {
        window.wx.hideMenuItems({
          // menuList: ["menuItem:copyUrl"],
        });
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        window.wx.onMenuShareAppMessage({
          title, // 分享标题
          desc, // 分享描述
          link:link+'?links='+opt.query, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl, // 分享图标
          success: function () {},
        });
        //分享到朋友圈
        window.wx.onMenuShareTimeline({
          title, // 分享标题
          desc, // 分享描述
          link:link+'?links='+opt.query, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl, // 分享图标
          success: function () {},
        });
      });
    });
};
/**
 *
 * @param {Element} ele 需要转换成图片的dom对象
 * @param {object} customOpt 自定义参数
 * @returns {Promise} 通过promise 返回图片地址
 */
const htmlToCanvas = (ele, customOpt) => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  let opt = _.merge({ scale: 3 }, customOpt);
  return new Promise((res, rej) => {
    html2canvas(ele, opt)
      .then((canvas) => {
        document.body.appendChild(canvas);
        let htmlImg = canvas.toDataURL("image/jpg");
        res(htmlImg);
      })
      .catch((error) => {
        rej(error);
      });
  });
};
/**
 * @returns {Object} 返回判断ios，android 系统函数
 */
const clientSystem = () => {
  return {
    isIOS: (() => {
      let u = navigator.userAgent,
        app = navigator.appVersion;
      let ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      let iPad = u.indexOf("iPad") > -1;
      let iPhone = u.indexOf("iPhone") > -1 || u.indexOf("Mac") > -1;
      if (ios || iPad || iPhone) {
        return true;
      } else {
        return false;
      }
    })(),
    isAndroid: (() => {
      let u = navigator.userAgent;
      if (u.indexOf("Android") > -1 || u.indexOf("Adr") > -1) {
        return true;
      } else {
        return false;
      }
    })(),
  };
};

function preventDefaultScroll() {
  //禁止下拉
  let sy;
  let ey;
  let overscroll = function (el) {
    el.addEventListener("touchstart", function (e) {
      sy = e.touches[0].screenY;
    });
    el.addEventListener("touchmove", function (e) {
      ey = e.changedTouches[0].screenY;
      if (sy < ey) {
        //往下拉
        if (el.scrollTop <= 10) {
          e._prevet = true;
        } else {
          e._prevet = false;
        }
      } else {
        //往上拉
        if (el.scrollTop + el.offsetHeight >= el.scrollHeight - 10) {
          e._prevet = true;
        } else {
          e._prevet = false;
        }
      }
    });
  };
  overscroll(document.querySelector("#app-page"));
  document.body.addEventListener(
    "touchmove",
    function (evt) {
      if (evt._prevet) {
        evt.preventDefault();
      }
    },
    { passive: false }
  );
}

export {
  wechatShare,
  GetQueryString,
  preventDefaultScroll,
  htmlToCanvas,
  clientSystem,
};
