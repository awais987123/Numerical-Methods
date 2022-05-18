import React, { Component } from 'react'
import { Card, Input, Button, Table } from 'antd';
import '../../screen.css';
import 'antd/dist/antd.css';
import { error, func, getXL_XR_from_API } from '../../services/Services';
import {InputStyle,colorBg} from '../../components/inputStyle';
import Tex2SVG from "react-hook-mathjax";
import '../../App.css';
var dataInTable = []
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "a",
        dataIndex: "xl",
        key: "xl"
    },
    {
        title: "b",
        dataIndex: "xr",
        key: "xr"
    },
    {
        title: "x",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];

class Bisection extends Component {

    constructor() {
        super();
        this.state = this.getInitialState();
        this.handleChange = this.handleChange.bind(this);
        this.bisection = this.bisection.bind(this);
        this.handleAPI = this.handleAPI.bind(this);
    }

    getInitialState = () => ({
        fx: "",
        xl: 0,
        xr: 0,
        showOutputCard: false,
        showGraph: false,
        moveLeft: false
        
    })

    bisection(xl, xr) {
        var increaseFunction = false;
        var xm = 0;
        var sum = parseFloat(0.000000);
        var n = 0;
        var data = []
        data['xl'] = []
        data['xr'] = []
        data['x'] = []
        data['error'] = []
        if (func(this.state.fx, xl) < func(this.state.fx, xr)) {
            increaseFunction = true;
        }

        do {
            xm = (xl + xr) / 2;
            if (func(this.state.fx, xm) * func(this.state.fx, xr) < 0) {
                sum = error(xm, xr);
                if (increaseFunction) {
                    xl = xm;
                }
                else {
                    xr = xm;
                }

            }
            else {
                sum = error(xm, xl);
                if (increaseFunction) {
                    xr = xm;
                }
                else {
                    xl = xm;
                }
            }
            data['xl'][n] = xl;
            data['xr'][n] = xr;
            data['x'][n] = xm.toFixed(8);
            data['error'][n] = Math.abs(sum).toFixed(8);
            n++;
        } while (Math.abs(sum) > 0.000001);
        this.createTable(data['xl'], data['xr'], data['x'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true,

        })


    }

    async handleAPI() {
    
        const response = await getXL_XR_from_API();
        this.setState({
            fx: response[0].fx,
            xl: response[0].xl,
            xr: response[0].xr
        })
        const { fx, xl, xr } = this.state;

        this.bisection(parseFloat(xl), parseFloat(xr));

    }

    createTable(xl, xr, x, error) {
        dataInTable = []
        for (var i = 0; i < xl.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                xl: xl[i],
                xr: xr[i],
                x: x[i],
                error: error[i]
            });
        }

    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    render() {
        let { fx, xl, xr } = this.state;
        return (
            <div style={{ background: " #6b7b8c ", padding: "30px", borderRadius:'2%' }} className='card'>
                <h3 style={{ color: "black", fontWeight: "bold",fontFamily:'ui-serif' }}>Bisection Method</h3>
                <h5 style={{fontFamily:'ui-serif'}}>In mathematics, the bisection method is a root-finding method that applies to any continuous function for which one knows two values with opposite signs.</h5>
                <div className="row">
                    <div className="col">
                        <Card
                            bordered={true}
                            style={{  colorBg, borderRadius:"15px", color: "#FFFFFFFF" }}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <h2 style={{color:"black", borderRadius:'80%'}}>Enter the Function f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                            <h2 style={{color:"black"}}>a</h2><Input size="large" name="xl" style={InputStyle}></Input>
                            <h2 style={{color:"black"}}>b</h2><Input size="large" name="xr" style={InputStyle}></Input><br /><br />
                            <div className="row">
                                <div className="col-3">
                                    <Button id="submit_button" onClick={
                                    () => this.bisection(parseFloat(xl), parseFloat(xr))
                                }
                                    style={{ background: "#786ba2 ", color: 'white',
                                    fontSize: '16px',
                                    border: 'none',
                                    cursor: 'pointer',
                                
                                    borderRadius: '5px',
                                    textAlign: 'center'}}>Submit</Button>
                                </div>
                            </div>



                        </Card>
                    </div>
                </div>
                <div className="row">
                    {this.state.showOutputCard &&
                        <Card
                            title={"Result"}
                            bordered={true}
                            style={{ width: "100%", background: "#e89a3c ", color: "#FFFFFFFF" }}
                            id="outputCard"
                        >
                        <h3><i>Solution of </i></h3><Tex2SVG display="inline" latex={this.state.fx} />
                        
                        
                    
                        <Table pagination={{defaultPageSize: 8}} columns={columns} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}></Table>
                        </Card>
                    }
                </div>
            </div>

        );
    }
}
export default Bisection;