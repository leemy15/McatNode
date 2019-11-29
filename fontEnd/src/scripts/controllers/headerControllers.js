import layoutView from '../views/layout.art'
import headerView from '../views/header.art'
import loginController from "./loginControllers"
import usersModel from '../models/users'
import tanchView from '../views/tanchu.art'

class Layout{
  constructor() {
    this.isSignin
    this.username 
  }

 async render() {
    let html = layoutView()
    $('#container').html(html)
    await this.auth()
    let isSignin=this.isSignin
    //console.log(isSignin);
    
    let headerHtml=headerView({
      isSignin
    })
    $('.header').html(headerHtml)
    $('.Ifsingout').on('click',function(){     
      //  let loginHtml=registerView()
      //  $('.wrapper').html(loginHtml)
      loginController.render()
    })
    let username=this.username 
    $('.username').html('欢迎您'+username)
    $('#loginOut').on('click',this.loginOut.bind(this))

  }
  
  async loginOut(){
    let result = await usersModel.get({
      url: '/api/users/loginOut'
    })
    let tanchuHtml=tanchView()
    $('.tanchuPostion').html(tanchuHtml)
    $('.tanchuFont').html('注销成功')
    setTimeout(function(){
      localStorage.removeItem("token");
      location.reload()
    },2000)
  }

  async auth() {
    let result = await usersModel.get({
      url: '/api/users/isSignin'
    })
    let username = result.data.username
    this.isSignin = username ? true : false
    this.username = username
    //console.log(this.isSignin,this.username);
  }

}

export default new Layout()
