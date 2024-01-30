
// import orderImg from "../../assets/shop/banner2.jpg";
import orderImg from "../../../assets/shop/banner2.jpg";
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from "../../../Hooks/useMenu";
import OrderTab from "../OrderTab/OrderTab";
import Cover from "../../Shared/Cover/Cover";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
const Order = () => {
  const categorys=['salad','pizza', 'soup', 'dessert', 'drinks'];
  const {category}=useParams()
  const initalIndex=categorys.indexOf(category)
    const [tabIndex,setTabIndex]=useState(initalIndex)
    const [menu]=useMenu()
// console.log(menu,'menu')
    const desserts = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const drinks = menu.filter(item => item.category === 'drinks');
    return (
        <div>
        <Helmet>
        <title>bistro boss || order</title>
        </Helmet>
            <Cover img={orderImg} title="order-food"></Cover>
       
          <Tabs 
          
          defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList className="uppercase font-bold py-7">
            <Tab>salad</Tab>
            <Tab>pizza</Tab>
            <Tab>soup</Tab>
            <Tab>dessert</Tab>
            <Tab>drinks</Tab>
          </TabList>
    
          <TabPanel>
         <OrderTab items={salad}></OrderTab>
          </TabPanel>
          <TabPanel>
           <OrderTab items={pizza}></OrderTab>
          </TabPanel>
          <TabPanel>
           <OrderTab items={soup}></OrderTab>
          </TabPanel>
          <TabPanel>
           <OrderTab items={desserts}></OrderTab>
          </TabPanel>
          <TabPanel>
          <OrderTab items={drinks}></OrderTab>
          </TabPanel>
        </Tabs>
        </div>
    );
};

export default Order;