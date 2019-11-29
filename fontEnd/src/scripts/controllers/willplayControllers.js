import willplayView from '../views/willplay.art'
import usersModel from '../models/users'


export const list =async (req, res, next) => {
  let result=await usersModel.get({
    url:'api/hotmovie/'
  })
  localStorage.setItem("starnum", "0")

  if(result.ret)
  {
    res.render(willplayView())
  }
  else{
    res.go('/home')
  }
}

