import talkView from '../views/talk.art'
//import usersModel from '../models/users'


export const list =async (req, res, next) => {
    res.render(talkView())
    var socket = io.connect('http://10.9.49.166:8082');
    document.querySelector('#send_btn')
      .addEventListener('click', function () {
        var msg2 = send_txt.value
        socket.emit('receive', msg2)
        send_txt.value = ''
        $('#chat_ul').append(`<li class="myselsf"><span>${msg2}</span></li><br/>`)
      }, false)  

      $('#send_txt').on('keyup', function (e) {
        if (e.keyCode === 13) {
            var msg2 = send_txt.value
            socket.emit('receive', msg2)
            $('#send_txt').val('')
            // content.innerHTML += '(我):'+ msg2 + '<br/>'
            $('#chat_ul').append(`<li class="myselsf"><span>${msg2}</span></li><br/>`)
        }
    })

      socket.on('message', function(msg){
       $('#chat_ul').append(`<li class="youselsf"><span>${msg}</span></li><br/>`)
      })
}
