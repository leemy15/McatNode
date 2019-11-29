import SMERouter from 'sme-router'
import breadcrumbView from '../views/breadcrumb.art'
import { home } from '../controllers/homeControllers'
import * as  talk  from '../controllers/talkControllers'
import * as hotmovie from '../controllers/hotmovieControllers'
import * as willplay from '../controllers/willplayControllers'
import * as cinema from '../controllers/cinemaControllers'

const router = new SMERouter('mainBody')
router.use((req) => {
  let url1 = req.url.split("?")[0]
  let url=url1.slice(1)
  let breadcrumb={
    'home':[
      '首页=home'
    ],
    'hotmovie':[
      '首页=home',
      '热门电影管理=hotmovie'
    ],
    'hotmovie_add':[
      '首页=home',
      '热门电影管理=hotmovie',
      '添加电影信息=hotmovie_add'
    ],
    'willplay':[
      '首页=home',
      '即将上影电影管理=willplay',
    ],
    'cinema':[
      '首页=home',
      '电影院管理=cinema',
    ],
    'cinema_add':[
      '首页=home',
      '电影院管理=cinema',
      '添加电影院信息=cinema_add'
    ],
    'cinema_updata':[
      '首页=home',
      '电影院管理=cinema',
      '修改电影院信息=cinema_updata',
    ],
    'cinema_foodList':[
      '首页=home',
      '电影院管理=cinema',
      '小吃管理信息=cinema_foodList',
    ],
    'cinema_foodAdd':[
      '首页=home',
      '电影院管理=cinema',
      '小吃管理信息=cinema_foodList',
      '添加小吃信息=cinema_foodAdd'
    ],
    'cinema_foodsUpdata':[
      '首页=home',
      '电影院管理=cinema',
      '小吃管理信息=cinema_foodList',
      '修改小吃信息=cinema_foodsUpdata'
    ],
    'hotmovie_updata':[
      '首页=home',
      '热门电影管理=hotmovie',
      '电影信息修改=hotmovie_updata',
    ],
    'talk':[
      '首页=home',
      '聊天室=talk',
    ],
    
  }

  
  let num=breadcrumb[url].length-1
  let maintitle=breadcrumb[url][num].split('=')[0]
  let breadcrumbTitle=breadcrumb[url]
  console.log(breadcrumbTitle);
  let breadcrumbHtml=breadcrumbView({
    url,
    breadcrumbTitle
  })
  
  
  $('.Brdtitle').html(breadcrumbHtml)
  $('.maintitle').html(maintitle)


})
// router.use((req) => {
//   let url = req.url.slice(1)
//   $(`.sidebar-menu li[data-url=${url}]`).addClass('active').siblings().removeClass('active')
// })

router.route('/home', home)


router.route('/hotmovie', hotmovie.list)
router.route('/hotmovie_add', hotmovie.add)
router.route('/hotmovie_updata', hotmovie.updata)
router.route('/willplay', willplay.list)
router.route('/cinema', cinema.list)
router.route('/cinema_add', cinema.add)
router.route('/cinema_updata', cinema.updata)
router.route('/cinema_foodList', cinema.foodsList) 
router.route('/cinema_foodAdd', cinema.addFoods)
router.route('/cinema_foodsUpdata', cinema.updataFoods)
router.route('/talk',talk.list)

router.route('*', (req, res, next) => {
  res.redirect('/home', home)
})

export default router