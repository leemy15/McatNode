import hotmovieView from '../views/hotmovie.art'
import usersModes from '../models/users'
import hotmovieAdd from '../views/hotmovie_add.art'
import hotmovieupdata from '../views/hotmovie_updata.art'
import momentAgo from 'moment-ago'

var count=5;

function _handleUpdateClick(res, obj) {
  let id = $(obj).attr('data-id')
  res.go('/hotmovie_updata', {id})
}

function ClickPage(res,result,start){
    let list=result.data.list 
    //console.log(result);
    let sumNumber=result.data.total;
    let pageNumber=Math.ceil(sumNumber/count)
    let pageNumberArr={}
    pageNumberArr.Arr=[]
    for(let i=1;i<=pageNumber;i++)
    {
      pageNumberArr.Arr.push(i)
    }
    let pageNum = pageNumberArr.Arr
    for(let i=0;i<list.length;i++)
    {
      let timeago = momentAgo(result.data.list[i].createTime).ago() 
      result.data.list[i].timeago=timeago
    }
    console.log(pageNum);
    
    res.render(hotmovieView({list,pageNum,start}))
    
}

function _handlePageNumClick(res,obj,startnumb){
  let nextStart = ~~( $(obj).children('a').html())
  let startNum = nextStart-1
  localStorage.setItem("starnum", startNum)
  res.go('/hotmovie?r=' + (new Date().getTime()))
}
export const list =async (req, res, next) => {
  $('.pagehid').css('display','block')
 let startnumb = ~~(localStorage.getItem("starnum")?localStorage.getItem("starnum"):localStorage.setItem("starnum", "0"));
 let start =startnumb*count;
  let result=await usersModes.get({
    url:'api/hotmovie/',
    type:'GET',
    data:{
      start,
      count
    }
  })
  if(result.ret)
  {
    ClickPage(res,result,start);
    $('.pageNum').eq(startnumb).addClass('active')
  }
  else{
    res.go('/home')
  }
  if(result.data.list==''){
    startnumb=startnumb-1
    localStorage.setItem("starnum", startnumb)
    res.go('/hotmovie?r=' + (new Date().getTime()))
  }
  $('.edit').on('click', function() {
    _handleUpdateClick(res, this)
  })
  $('.delete').on('click', function() {
    _handleDetailClick(res, this)
  })
  $('body').on('keyup','#search',(e) => {
    if (e.keyCode === 13) {
    _handleSearch(res, e.target.value)
    localStorage.setItem("starnum", "0") 
    }
  })
  $('.movieDetail').on('click',function(){
    $(this).parents('.masssagetr').next().toggle()
  })
  $('.pageNum').on('click',function(){
    _handlePageNumClick(res, this, startnumb)
  })
  $('.pagedown').on('click',function(){
    let sumNumber=result.data.total;
    let pageNumber=Math.ceil(sumNumber/count)
    startnumb==(pageNumber-1)?localStorage.setItem("starnum", startnumb):localStorage.setItem("starnum", startnumb+1)
    res.go('/hotmovie?r=' + (new Date().getTime()))
  })
  $('.pageup').on('click',function(){
    startnumb==0?localStorage.setItem("starnum", startnumb):localStorage.setItem("starnum", startnumb-1)
    res.go('/hotmovie?r=' + (new Date().getTime()))
  })



}

export const add = (req, res, next) => {
  res.render(hotmovieAdd())
  $('.btn-danger').on('click',function(e){
    e.preventDefault(e);
  })
  let token =localStorage.getItem("token");
  let option={
    headers: {
      'X-Access-Token':token,
    },
    success:function(data){
      res.go('/hotmovie')
    }
  }
  $('#hotmovieForm').ajaxForm(option)

  $('.gobalk').on('click',function(){
    res.go('/hotmovie')
  })
}

export const updata =async (req, res, next) => {
 
  let id=req.body.id
  let result= await usersModes.get({
    url:'/api/hotmovie/findOne',
    type: 'POST',
    data:{
      id
    }
  })
  let list=result.data.list
  //console.log(list);
  
  res.render(hotmovieupdata({
    list
  }))


  let token =localStorage.getItem("token");
  
  let option={
    headers: {
      'X-Access-Token':token,
    },
     success:function(data){
      res.go('/hotmovie')
    }
  }
  $('#hotmovieForm2').ajaxForm(option)

  $('.gobalk').on('click',function(){
    res.go('/hotmovie')
  })

  // $('.submitupdate').on('click', async(e) => {
  //   e.preventDefault();
  //   let data = $('#hotmovieForm').serialize()
  //   let result = await usersModes.get({
  //     url: '/api/hotmovie/',
  //     data: data + '&id=' + id,
  //     type: 'PATCH'
  //   })
  //   if (result.ret) {
  //     //console.log(location.url);
      
  //     res.go('/hotmovie')
  //   } else {
  //     alert(result.data.message)
  //   }
  // })

}

async function _handleDetailClick(res, obj){
  let id = $(obj).attr('data-id')
  let picName=$(obj).attr('data-delete')
  //console.log(picName);
  
 // console.log(id);
  let result = await usersModes.get({
    url: '/api/hotmovie/',
    type: 'delete',
    data: { id,picName}
  })
  if (result.ret) {
    res.go('/hotmovie?r=' + (new Date().getTime()))
  }
}

async function _handleSearch(res,value){
 let startnumb = ~~(localStorage.getItem("starnum")?localStorage.getItem("starnum"):localStorage.setItem("starnum", "0"));
 //console.log(startnumb);
 let start =startnumb*count;
  let keywords=value
  if(keywords=='')
  {
    res.go('/hotmovie?r=' + (new Date().getTime()))
  }
  else{
  let result = await usersModes.get({
    url: '/api/hotmovie/search',
    type:'POST',
    data: {
      keywords,
      start,
      count
    }
  })
  if (result.ret) {
    //console.log(result);
   
    ClickPage(res,result,start)
    $('.pagehid').css('display','none')
  } else {
    res.go('/hotmovie')
  }
  }
}

