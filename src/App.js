import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import './screen.css';
import './App.css';
import Bisection from './Calculate/Root of Equation/Bisection';
import Newton from './Calculate/Root of Equation/Newton-raphson';
import Secant from './Calculate/Root of Equation/Secant';
import NewtonInterpolate from './Calculate/Interpolation/Newton';
import Lagrange from './Calculate/Interpolation/Lagrange';
import CompositeTrapezoidal from './Calculate/Integration/CompositeTrapzoidal';
import CompositeSimpson from './Calculate/Integration/CompositeSimpson';
import ForwardH from './Calculate/Differentiation/Forwardh';
import BackwardH from './Calculate/Differentiation/Backwardh';
import CentralH from './Calculate/Differentiation/Centralh';
import Euler from './Calculate/ODE/Euler';


const { SubMenu } = Menu;
const { Header, Content,Footer, Sider } = Layout;

class App extends Component {
  state = {
    loading: false };

    fakeRequest = () => {
      return new Promise(resolve => setTimeout(() => resolve(), 100));
    };
  componentDidMount() {
    this.fakeRequest().then(() => {
      const el = document.querySelector(".loader-container");
      if (el) {
        el.remove();   }
    });
  }


  render() {
    if (this.state.loading) {      return null; }
    
    return (
      
      <Router>
        <Layout>

          <Header className="header"  style={{backgroundColor:"#322e2f", color:"#e89a3c" ,height: "60px" }}>
           
          <div  className='primary'>      <h1  style={{ color:"#FFFFFF",fontSize:"40px",marginTop:'auto',fontFamily:'ui-serif', marginRight:"10px",paddingTop:'5px'}} >Numericals All-in-One</h1>
              
            </div>
          </Header>
          <Layout>
              <Menu
                mode="horizontal"
                style={{ display:'flex',flexDirection:'row',justifyContent:'center', paddingTop:"10px", borderRight: 0, backgroundColor: " #e2d810   ", cursor: 'move'}}
                theme="light"
              >
                <SubMenu key="root_submenu" title={<span>Non-Linear Equations</span>}>
                  <Menu.Item key="menu_bisection" ><Link to="/bisection">Bisection</Link></Menu.Item>
                  <Menu.Item key="menu_newton"><Link to="/newton-raphson">Newton-Raphson</Link></Menu.Item>
                  <Menu.Item key="menu_secant"><Link to="/secant">Secant Method</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="interpolate_submenu" title={<span>Interpolation</span>}>
                  <Menu.Item key="menu_divide"><Link to="/newton">Newton Divide Difference</Link></Menu.Item>
                  <Menu.Item key="menu_lagrange"><Link to="/lagrange">Lagrange</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="integrate_submenu" title={<span>Integration</span>}>
                  <Menu.Item key="menu_compositeTrapzoidal"><Link to="/trapezoidal">Composite Trapezoidal Rule</Link></Menu.Item>
                  <Menu.Item key="menu_compositeSimpson"><Link to="/simpson">Composite Simpson's Rule</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="diff_submenu" title={<span>Differentiation</span>}>
                  <Menu.Item key="menu_forwardh"><Link to="/forwardh">Forward Divided-Differences O(h)</Link></Menu.Item>
                  <Menu.Item key="menu_backwardh"><Link to="/backwardh">Backward Divided-Differences O(h)</Link></Menu.Item>
                  <Menu.Item key="menu_centralh"><Link to="/centralh">Central Divided-Differences O(h{<sup>2</sup>})</Link></Menu.Item>
                </SubMenu>
                 <SubMenu key="de_submenu" title={<span>Ordinary Differential Equation</span>}>
                  <Menu.Item key="menu_euler"><Link to="/euler">Euler's Method</Link></Menu.Item>
                </SubMenu> 
              </Menu>

            <Layout style={{ padding: '0 25px 25px' }}>
              <Content style={{ padding: 150, margin: 0, minHeight: 280, }}>
                <Switch>
                  {/* Root of Equation */}
                  <Route exact path="/bisection" component={Bisection} />
                  <Route exact path="/newton-raphson" component={Newton} />
                  <Route exact path="/secant" component={Secant} />
                  {/* Interpolation */}
                  <Route exact path="/newton" component={NewtonInterpolate} />
                  <Route exact path="/lagrange" component={Lagrange} />
                  {/* Integration */}
                  <Route exact path="/trapezoidal" component={CompositeTrapezoidal} />
                  <Route exact path="/simpson" component={CompositeSimpson} />
                  {/* Differentiation */}
                  <Route exact path="/forwardh" component={ForwardH} />
                  <Route exact path="/backwardh" component={BackwardH} />
                  <Route exact path="/centralh" component={CentralH} />
                  {/* Ordinary Differential Equation (ODE) */}
                  <Route exact path="/euler" component={Euler} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
          <Footer>
          
          </Footer>
        </Layout>
      </Router>
    )
  }
}
export default App;
