import React, { Component } from 'react';
import { Card, Input, Button } from 'antd';
import '../../screen.css';
import 'antd/dist/antd.css';
import { func, funcDiffDegreeN } from '../../services/Services';
import {InputStyle,colorBg} from '../../components/inputStyle';

import Tex2SVG from "react-hook-mathjax";
var y, error, exact;
class Backwardh extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            x: 0,
            h: 0,
            degree: 0,
            showOutputCard: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    backwardh(x, h, degree) {
        switch (degree) {
            case 1:
                y = (func(this.state.fx, x) - func(this.state.fx, x - (1 * h))) / h
                break;
            case 2:
                y = (func(this.state.fx, x) - 2 * func(this.state.fx, x - (1 * h)) + func(this.state.fx, x - (2 * h))) / Math.pow(h, 2)
                break;
            case 3:
                y = (func(this.state.fx, x) - 3 * func(this.state.fx, x - (1 * h)) + 3 * func(this.state.fx, x - (2 * h)) - func(this.state.fx, x - (3 * h))) / Math.pow(h, 3)
                break;
            default:
                y = (func(this.state.fx, x) - 4 * func(this.state.fx, x - (1 * h)) + 6 * func(this.state.fx, x - (2 * h)) - 4 * func(this.state.fx, x - (3 * h)) + func(this.state.fx, x - (4 * h))) / Math.pow(h, 4)
        }
        exact = funcDiffDegreeN(this.state.fx, x, degree)
        error = Math.abs((y - exact) / y) * 100
        this.setState({
            showOutputCard: true
        })
    }


    render() {
        return (
            <div style={{ background: " #6b7b8c ", padding: "30px", borderRadius:'2%' }}>
                <h3 style={{ fontFamily:'ui-serif',color: "black", fontWeight: "bold" }}>Backward Divided-Differences O(h)</h3>
                <div className="row">
                    <div className="col">
                        <Card
                            bordered={true}
                            style={{colorBg, borderRadius:"15px", color: "#FFFFFFFF" }}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <h2>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                            <h2>Order derivative</h2><Input size="large" name="degree" style={InputStyle}></Input>
                            <h2>X</h2><Input size="large" name="x" style={InputStyle}></Input>
                            <h2>H</h2><Input size="large" name="h" style={InputStyle}></Input><br /><br />
                            <Button id="submit_button" onClick={
                                () => this.backwardh(parseFloat(this.state.x), parseFloat(this.state.h), parseInt(this.state.degree))
                            }
                                style={{ background: "#4caf50", color: "white" }}>Submit</Button>

                        </Card>
                    </div>
                    <div className="col">
                        {this.state.showOutputCard &&
                            <Card
                                title={"Output"}
                                bordered={true}
                                style={{ background: "#2196f3", color: "#FFFFFFFF" }}
                                id="outputCard"
                            >
                            <h3><i>Solution of </i></h3><Tex2SVG display="inline" latex={this.state.fx} />
                        
                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                                    Approximate = {y}<br />
                                    Exact = {exact.toFixed(8)}<br />
                                    Error(ε) = {error.toFixed(4)}%<br />
                                </p>
                            </Card>
                        }
                    </div>


                </div>
            </div>
        );
    }
}
export default Backwardh;