import registerView from '../views/register.art'
import tanchView from '../views/tanchu.art'
import usersModel from '../models/users'
import loginController from './loginControllers'
import layoutController from './layoutControllers'

class register {
  constructor() {
    this.McatButtonNum;
  }

  render() {
    let that=this
    let html = registerView()
    $('#container').html(html)

    $('#register').on('click', this.handleSubmit.bind(this))
    $('.toLogin').on('click', this.toLogin)
    $('#McatButton').on('click', this.notMcatButton.bind(this))

  }
  notMcatButton() {
    if ($('#McatButton').attr("checked") == 'checked') {
      this.McatButtonNum = true
    }
    else {
      this.McatButtonNum = false
    }
   // console.log(this.McatButtonNum);
  }
  toLogin() {
    loginController.render()
  }
  tanchu(){
    let tanchuHtml=tanchView()
    $('.tanchuPostion').html(tanchuHtml)
    setTimeout(function(){
      $('.tanchuPostion').html('')
    },2000)
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

    else if ($('#tel').val() == '') {
      this.tanchu()
      $('.tanchuFont').html('电话号码不能为空')
    }

    else if ($('#email').val() == '') {
      this.tanchu()
      $('.tanchuFont').html('邮箱不能为空')
    }
    else if (this.McatButtonNum == true) {
      let data = $('.form-control').serialize()
      let result = await usersModel.get({
        url: '/api/users/signup',
        data,
        type:'POST'
      })
      this.handleSubmitSucc(result)
    }
    else {
      this.tanchu()
      $('.tanchuFont').html('请点击同意服务条款')
    }


  }
  handleSubmitSucc(result) {
    if (result.ret) {
      this.tanchu()
      $('.tanchuFont').html(result.data.message)
      setTimeout(function(){
        loginController.render()
      },2000)
    } else {
      this.tanchu()
      $('.tanchuFont').html(result.data.message)
    }
  }
}

export default new register()