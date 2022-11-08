let websocket = null;
const isWebsocket = () => {
  try {
    websocket.readyState == 1 ? websocket.close() : "";
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
  // await isWebsocket();
  await isWebsocketInwindow();
  const userID = JSON.parse(sessionStorage.getItem("user_list")).userInfo
    .account;
  const Administrator = "admin@163.com";
  websocket = new WebSocket(
    `ws://www.atwx.xyz:8002/api/websocket/${userID}/${Administrator}`
  );
  onerror();
  onopen();
  onmessage();
};

// 连接失败
const onerror = () => {
  websocket.onerror = error => {
    console.log("error", error);
  };
};

// 连接成功
const onopen = () => {
  websocket.onopen = open => {
    console.log("连接成功", open);
  };
};

const onmessage = () => {
  websocket.onmessage = acceptMessge => {
    console.log("接收消息:", acceptMessge);
  };
};
const send = message => {
  try {
    websocket.send(message);
  } catch (error) {
    console.log("发送失败:", error);
  }
};
export { ws, send };
