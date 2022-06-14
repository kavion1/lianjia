//cname cookie名称
//cookie名  val
//存在时间 exdays
const cookies = {
  setCookie(cname, val, exdays) {
    const date = new Date();
    date.setTime(date.getTime + exdays * 24 * 60 * 60 * 1000);
    let expires = `expires=${date.toUTCString}`;
    document.cookie = `${cname}=${val};${expires}`;
  },
  getCookie(cname) {
    let name = `${cname}=`;
    console.log(name);
    let cook = document.cookie.split(";");
    for (let i = 0; i < cook.length; i++) {
      let c = cook[i].trim();

      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
};
export default cookies;
