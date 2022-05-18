import React, { Component } from 'react'
import { Card, Input, Button, Table } from 'antd';
import '../../screen.css';
import 'antd/dist/antd.css';
import { error, func, funcDiff } from '../../services/Services';
import {InputStyle,colorBg} from '../../components/inputStyle';

import Tex2SVG from "react-hook-mathjax";
var dataInTable;
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];

class Newton extends Component {

    constructor() {
        super();
        this.state = {
            fx: "",
            x0: 0,
            showOutputCard: false,
            showGraph: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.newton_raphson = this.newton_raphson.bind(this);
    }

    newton_raphson(xold) {
        var xnew = 0;
        var epsilon = parseFloat(0.000000);
        var n = 0;
        var data = []
        data['x'] = []
        data['error'] = []
        do {
            xnew = xold - (func(this.state.fx, xold) / funcDiff(xold));
            epsilon = error(xnew, xold)
            data['x'][n] = xnew.toFixed(8);
            data['error'][n] = Math.abs(epsilon).toFixed(8);
            n++;
            xold = xnew;
        } while (Math.abs(epsilon) > 0.000001);

        this.createTable(data['x'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })


    }
    createTable(x, error) {
        dataInTable = []
        for (var i = 0; i < x.length; i++) {
            dataInTable.push({
                iteration: i + 1,
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
        let { fx, x0 } = this.state;
        return (
            <div style={{ background: " #6b7b8c ", padding: "30px", borderRadius:'2%' }}>
                <h3 style={{ fontFamily:'ui-serif',color: "black", fontWeight: "bold" }}>Newton Raphson Method</h3>
                <h5 style={
                    {fontFamily:'ui-serif'}
                }>The Newton-Raphson method (also known as Newton's method) is a way to quickly find a good approximation for the root of a real-valued function f ( x ) = 0 f(x) = 0 f(x)=0. It uses the idea that a continuous and differentiable function can be approximated by a straight line tangent to it.</h5>
                <div className="row">
                    <div className="col">
                        <Card
                            bordered={true}
                            style={{ colorBg, borderRadius:"15px", color: "#FFFFFFFF" }}
                            onChange={this.handleChange}
                        >
                            <h2>Enter the Function f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                            <h2>Initial Guss - x<sub>0</sub></h2><Input size="large" name="x0" style={InputStyle}></Input>
                            <Button id="submit_button" onClick={
                                () => this.newton_raphson(parseFloat(x0))
                            }
                                style={{ background: "#4caf50", color: "white" }}>Submit</Button>

                        </Card>
                    </div>
                     </div>
                <div className="row">
                    {this.state.showOutputCard &&
                        <Card
                            title={"Output"}
                            bordered={true}
                            style={{ width: "100%", background: "#e89a3c", color: "#FFFFFFFF" }}
                            id="outputCard"
                        >
                        <h3><i>Solution of </i></h3><Tex2SVG display="inline" latex={this.state.fx} />
                        
                            <Table columns={columns} bordered={true} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}
                            ></Table>
                        </Card>
                    }
                </div>
            </div>
        );
    }
}
export default Newton;