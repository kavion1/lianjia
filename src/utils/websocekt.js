import Vue from "vue";

let websocket = null;
let intervalTime;
const isWebsocket = () => {
  try {
    if (websocket) {
      websocket.readyState == 1 ? websocket.close() : "";
      console.log("123");
    }
  } catch (error) {
    throw error;
  }
};

const isWebsocketInwindow = () => {
  try {
    "WebSocket" in window
      ? ""
      : alert("您的浏览器不支持在线聊天，请更换浏览器重试。");
  } catch (error) {
    throw error;
  }
};

const ws = async () => {
  await isWebsocket();
  await isWebsocketInwindow();
  const userID = JSON.parse(sessionStorage.getItem("user_list")).userInfo
    .account;
  const Administrator = "admin@163.com";
  websocket = new WebSocket(
    `ws://www.atwx.xyz:8002/api/websocket/${Administrator}/1751140932@qq.com`
    // `ws://www.atwx.xyz:8002/api/websocket/${userID}/${Administrator}`
  );
  websocket.onmessage = e => {
    onmessage(e);
  };
  websocket.onerror = e => {
    onerror(e);
  };
  websocket.onopen = e => {
    onopen(e);
  };
  onopen();
  // onmessage();
  websocket.onclose = e => {
    console.log("e", e);
  };
};

// 连接失败
const onerror = error => {
  console.log("error", error);
  // reconnection();
};

// 连接成功
const onopen = open => {
  console.log("连接成功", open);
  // ping();
};

const onmessage = acceptMessge => {
  console.log("接收消息:", acceptMessge, Vue.prototype);
  Vue.prototype.$message = acceptMessge;
};
const send = message => {
  try {
    websocket.send(message);
    console.log(document.getElementById("sendchat"));
  } catch (error) {
    console.log("发送失败:", error);
  }
};

const ping = (time = 5000, ping = "ping") => {
  clearInterval(intervalTime);
  websocket.send(ping);
  intervalTime = setInterval(() => {
    websocket.send(ping);
  }, time);
};

// 连接失败重连;
const reconnection = () => {
  websocket.close();
  clearInterval(intervalTime);
  if (websocket.readyState !== 3) {
    websocket = null;
    console.log("连接失败重连");
    ws();
  }
};
export { ws, send, onmessage };
