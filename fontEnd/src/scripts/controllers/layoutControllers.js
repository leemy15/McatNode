import layoutView from '../views/layout.art' 
import headerController from './headerControllers' 

class Layout {
  constructor() {
    this.render()
  }

 async render() {
    let html = layoutView()
    $('#container').html(html)
    headerController.render()
  }
  
}

export default new Layout()
