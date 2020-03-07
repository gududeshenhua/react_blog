import Head from 'next/head'
import {Button,Row,Col,List,Icon,Breadcrumb} from 'antd'
import Header from '../components/header'
import React,{useState,useEffect} from 'react'   
import '../public/style/pages/list.css'    
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer';
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
import Link from 'next/link' 
//引入的组件头字母必须是大写？ 
const ArticleList = (list) => {
  const [mylist,setMyList] = useState(
    list.data   
  )
  useEffect(()=>{
    setMyList(list.data) 
   }) 
  return (
    <div className="container"> 
    <Header/>    
    <Row className="comm-main" type="flex" justify="center">
      <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
      <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                </Breadcrumb>
              </div>
      <List
          header={<div>最新日志</div>}
          itemLayout="vertical"
          dataSource={mylist}
          renderItem={item => (
            <List.Item> 
              <div className="list-title">{item.title}</div>
              <div className="list-icon">
                <span><Icon type="calendar" /> {item.addTime}</span>
                <span><Icon type="folder" /> {item.typeName}</span>
                <span><Icon type="fire" /> {item.view_count}人</span>
              </div>
              <div className="list-context">{item.introduce}</div>  
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
ArticleList.getInitialProps = async (context)=>{

  let id =context.query.id
  const promise = new Promise((resolve)=>{
    axios(servicePath.getListById+id).then(
      (res)=>{
        console.log('list',res.data); 
        resolve(res.data)
      }
    )
  })
  return await promise
}

export default ArticleList
 