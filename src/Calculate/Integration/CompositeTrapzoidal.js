import React, { Component } from 'react';
import { Card, Input, Button } from 'antd';
import '../../screen.css';
import 'antd/dist/antd.css';
import { exactIntegrate, func } from '../../services/Services';
import {InputStyle,colorBg} from '../../components/inputStyle';

import Tex2SVG from "react-hook-mathjax";
var I, exact, error;

class Composite_Trapezoidal extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            a: 0,
            b: 0,
            n: 0,
            showOutputCard: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    composite_trapezoidal(a, b, n) {
        var h = (b - a) / n
        I = (h / 2) * (func(this.state.fx, a) + func(this.state.fx, b) + 2 * this.summationFunction(n, h))
        exact = exactIntegrate(this.state.fx, a, b)
        error = Math.abs((exact - I) / exact) * 100
        this.setState({
            showOutputCard: true
        })
    }

    summationFunction(n, h) {
        var sum = 0
        var counter = h
        for (var i = 1; i < n; i++) {
            sum += func(this.state.fx, counter)
            counter += h
        }
        return sum
    }

    render() {
        return (
            <div style={{ background: " #6b7b8c ", padding: "30px", borderRadius:'2%' }}>
                <h2 style={{ color: "black", fontWeight: "bold" }}>Composite Trapezoidal Rule</h2>
                <h3>In calculus, the trapezoidal rule is a technique for approximating the definite integral.The trapezoidal rule works by approximating the region under the graph of the function f(x) as a trapezoid and calculating its area.</h3>
            
                <div className="row">
                    <div className="col">
                        <Card
                            bordered={true}
                            style={{ colorBg, borderRadius:"15px", color: "#FFFFFFFF" }}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <h2>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                            <h2>Lower bound (A)</h2><Input size="large" name="a" style={InputStyle}></Input>
                            <h2>Upper bound (B)</h2><Input size="large" name="b" style={InputStyle}></Input>
                            <h2>N</h2><Input size="large" name="n" style={InputStyle}></Input><br /><br />
                            <Button id="submit_button" onClick={
                                () => this.composite_trapezoidal(parseInt(this.state.a), parseInt(this.state.b), parseInt(this.state.n))
                            }
                                style={{ background: "#4caf50", color: "white", fontSize: "20px" }}>Submit</Button>

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
                                    Approximate = {I}<br />
                                    Exact = {exact}<br />
                                    Error = {error}%
                                </p>
                            </Card>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default Composite_Trapezoidal;