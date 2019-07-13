import React,{PureComponent} from 'react'
import Header from "../../layouts/Header"
import Footer from '../../layouts/Footer'

class Home extends PureComponent{
  render() {
    return(
      <div>
        <Header/>
        <p>home</p>
        <Footer/>
      </div>
    )
  }
}

export default Home
