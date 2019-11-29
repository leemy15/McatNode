import loginView from '../views/login.art'
import usersModel from '../models/users'
import registerController from './registerControllers'
import layoutController from './layoutControllers'
import tanchView from '../views/tanchu.art'

class register {
  constructor() {
    
  }

  render() {
    let that=this
    let html = loginView()
    $('#container').html(html)

    $('#login').on('click', this.handleSubmit.bind(this))
    $('.toRegister').on('click', this.toRegister)
  }
  tanchu(){
    let tanchuHtml=tanchView()
    $('.tanchuPostion').html(tanchuHtml)
    setTimeout(function(){
      $('.tanchuPostion').html('')
    },2000)
  }
  toRegister() {
    registerController.render()
  }

  async handleSubmit() {
    if ($('#username').val() == '') {
      this.tanchu()
      $('.tanchuFont').html('用户名不能为空')
    }

    else if ($('#password').val() == '') {
      this.tanchu()
      $('.tanchuFont').html('密码不能为空')
    }
    else if($('#password').val() != '' && $('#username').val() != ''){
      let data = $('.form-control').serialize()
      // console.log(data)
      let result = await usersModel.get({
        url: '/api/users/signin',
        data,
        type:'POST'
      })
      this.handleSubmitSucc(result)
    }
  }
  handleSubmitSucc(result) {

    if (result.ret) {
      this.tanchu()
      $('.tanchuFont').html(result.data.message)
      setTimeout(function(){
        location.hash='#/home'
        layoutController.render()
        location.reload()
      },2000)
    } else {
      this.tanchu()
      $('.tanchuFont').html(result.data.message)
    }
  }
}

export default new register()