import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
//https://www.facebook.com/v2.3/dialog/
// oauth?app_id=374942954259057&
// auth_type=&cbt=1648806052775&
// channel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df1ea5e7c629a8fc%26domain%3Dlocalhost%26is_canvas%3Dfalse%26origin%3Dhttp%253A%252F%252Flocalhost%253A3000%252Ff24e42418e0f5ec%26relation%3Dopener&client_id=374942954259057&display=popup&domain=localhost&e2e=%7B%7D&fallback_redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&locale=en_US&logger_id=f1ada530c69b97&origin=1&redirect_uri=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df1c9b98a69b8344%26domain%3Dlocalhost%26is_canvas%3Dfalse%26origin%3Dhttp%253A%252F%252Flocalhost%253A3000%252Ff24e42418e0f5ec%26relation%3Dopener%26frame%3Df9e28c2216ec0c&response_type=token%2Csigned_request%2Cgraph_domain&return_scopes=false&scope=public_profile%2Cemail&sdk=joey&version=v2.3
const facebookLogin = (props)=>{
const responseFacebook = (response) => {
  console.log(response);
}

return(
    <div>

   
  <FacebookLogin
    appId="374942954259057"
    autoLoad={true}
    fields="name,email,picture"
    //onClick={componentClicked}
    callback={responseFacebook} />
     </div>
  //document.getElementById('demo')
    );
}
export default facebookLogin

