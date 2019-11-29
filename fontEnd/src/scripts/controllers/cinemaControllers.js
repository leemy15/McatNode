import cinemaView from '../views/cinema.art'
import cinemaAddView from '../views/cinema_add.art'
import cinemaUpdata from '../views/cinemaUpdata.art'
import UpdataFoods from '../views/foodesUpdata.art'
import foodView from '../views/foodes.art'
import addFoodsView from '../views/addFoods.art'
import usersModes from '../models/users'
import momentAgo from 'moment-ago'

const count=5

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
  //console.log(pageNum);
  
  res.render(cinemaView({list,pageNum,start}))
}
function _handlePageNumClick(res,obj,startnumb){
  let nextStart = ~~( $(obj).children('a').html())
  let startNum = nextStart-1
  localStorage.setItem("cinemaPage", startNum)
  res.go('/cinema?r=' + (new Date().getTime()))
}
function _handleUpdateClick(res, obj) {
  let id = $(obj).attr('data-id')
  res.go('/cinema_updata', {id})
}
function _handleUpdataFoodsClick(res, obj) {
  let id = $(obj).attr('data-id')
  console.log(id);
  res.go('/cinema_foodsUpdata', {id})
}
function _handleFoodsClick(res, obj) {
  let id = $(obj).attr('data-id')
  let cinemaName=$(obj).attr('data-cinemaName')
  res.go('/cinema_foodList', {id,cinemaName})
}
function _handleAddFoodsClick(res,id){
  //console.log(id);
  
  res.go('/cinema_foodAdd', {id})
}
async function _handleDeleteFoodsClick(res,obj){
  let id = $(obj).attr('data-id')
  let foodsPic=$(obj).attr('data-delete')
  
  console.log(foodsPic);

  let result = await usersModes.get({
    url: '/api/foods/',
    type: 'delete',
    data: {
      id,
      foodsPic
    } 
  })
  if (result.ret) {
    res.go('/cinema_foodList?r=' + (new Date().getTime()))
  }

}
async function _handleDetailClick(res, obj)
{
  let id = $(obj).attr('data-id')
  console.log(id);
  
  let result = await usersModes.get({
    url: '/api/cinema/',
    type: 'delete',
    data: {
      id
    } 
  })
  if (result.ret) {
    res.go('/cinema?r=' + (new Date().getTime()))
  }
}
export const list = async (req, res, next) => {

  localStorage.setItem("starnum", "0")
  let cinemaPage = ~~(localStorage.getItem("cinemaPage")?localStorage.getItem("cinemaPage"):localStorage.setItem("cinemaPage", "0"));
  let start =cinemaPage*count;
   let result=await usersModes.get({
     url:'api/cinema/',
     type:'GET',
     data:{
       start,
       count
     }
   })
   if(result.ret)
  {
   // console.log(result);
    ClickPage(res,result,start);
    $('.pageNum').eq(cinemaPage).addClass('active')
  }
  else{
    res.go('/home')
  }
  $('.pageNum').on('click',function(){
    _handlePageNumClick(res, this, cinemaPage)
  })
  $('.pagedown').on('click',function(){
    let sumNumber=result.data.total;
    let pageNumber=Math.ceil(sumNumber/count)
    cinemaPage==(pageNumber-1)?localStorage.setItem("cinemaPage", cinemaPage):localStorage.setItem("cinemaPage", cinemaPage+1)
    res.go('/cinema?r=' + (new Date().getTime()))
  })
  $('.pageup').on('click',function(){
    cinemaPage==0?localStorage.setItem("cinemaPage", cinemaPage):localStorage.setItem("cinemaPage", cinemaPage-1)
    res.go('/cinema?r=' + (new Date().getTime()))
  })
  $('.delete').on('click', function() {
    _handleDetailClick(res, this)
  })
  $('.edit').on('click', function() {
    _handleUpdateClick(res, this)
  })
  $('.foods').on('click', function() {
    _handleFoodsClick(res, this)
  })

 
}
export const add = async (req, res, next) => {
  res.render(cinemaAddView())
  let token = localStorage.getItem("token");
  let option = {
    headers: {
      'X-Access-Token': token,
    },
    success: function (data) {
      res.go('/cinema')
    }
  }
  $('#cinemaForm').ajaxForm(option)

  $('.gobalk').on('click', function () {
    res.go('/hotmovie')
  })
}
export const updata = async (req,res,next)=>{
 
  let id=req.body.id
  let result= await usersModes.get({
    url:'/api/cinema/findOne',
    type: 'POST',
    data:{
      id
    }
  })
  let list=result.data.list
  //console.log(list);
  
  res.render(cinemaUpdata({
    list
  }))

  let token =localStorage.getItem("token");
  
  let option={
    headers: {
      'X-Access-Token':token,
    },
     success:function(){
      res.go('/cinema')
    }
  }
  $('#cinemaFor').ajaxForm(option)

  $('.gobalk').on('click',function(){
    res.go('/hotmovie')
  })


}
export const foodsList = async (req,res,next)=>{
 
  let id=req.body.id
  let cinemaId=req.body.cinemaName
 // console.log(id);
  let result=await usersModes.get({
    url:'api/foods/',
    type:'GET',
    data:{
      id
    }
  })
  
  
  let list=result.data.list

  res.render(foodView({list,cinemaId}))
  $('.add').on('click',function(){
    _handleAddFoodsClick(res,id)
  })
  $('.delete').on('click',function(){
    _handleDeleteFoodsClick(res,this)
  })
  $('.edit').on('click',function(){
    _handleUpdataFoodsClick(res,this)
  })
}
export const addFoods = async (req, res, next) => {
  let id=req.body.id
  console.log(id);
  
  res.render(addFoodsView({id}))
  let token = localStorage.getItem("token");
  let option = {
    headers: {
      'X-Access-Token': token,
    },
    success: function () {
      res.go('/cinema_foodList')
    },
  }
  $('#foodsForm').ajaxForm(option)
  $('.gobalk').on('click', function () {
    res.go('/cinema')
  })
}
export const updataFoods = async (req, res, next) => {
      res.render(UpdataFoods())
}