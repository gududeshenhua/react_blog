import Head from 'next/head'
import Link from 'next/link'  
import {Button,Row,Col,List,Icon} from 'antd'
import Header from '../components/header'
import React,{useState} from 'react' 
import '../public/style/pages/index.css' 
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer';
import axios from 'axios'; 
import  servicePath  from '../config/apiUrl'
//引入的组件头字母必须是大写？ 
const Home = (list) => { 
  const [mylist,setMyList] = useState(
    list.data 
  )
  return (
    <div className="container"> 
    <Header/>    
    <Row className="comm-main" type="flex" justify="center">
      <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
      <List
          header={<div>最新日志</div>}
          itemLayout="vertical"
          dataSource={mylist}
          renderItem={item => (
            <List.Item> 
              <Link href={{pathname:'/detail',query:{id:item.id}}}>
                <a>{item.introduce}</a>
              </Link>  
              <div className="list-icon"> 
                <span><Icon type="calendar" /> {item.addTime}</span>
                <span><Icon type="folder" /> {item.typeName}</span>
                <span><Icon type="fire" /> {item.view_count}</span>
              </div>
              <div className="list-context">{item.title}</div>  
            </List.Item>
          )}
        />    
      </Col> 
      <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
        <Author></Author>
        <Advert></Advert>
      </Col>  
    </Row>
    <Footer></Footer>
    <style jsx>{` 

      @media (max-width: 600px) {
        .grid {
          width: 100%;
          flex-direction: column;
        }
      }
    `}</style>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
  )
}
Home.getInitialProps = async ()=>{
  //debugger; 
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleList).then(
      (res)=>{
        //debugger;   
        console.log('远程获取数据结果:',res.data.data) 
        resolve(res.data)  
      }
    )
  })   
   return await promise
}

export default Home
 