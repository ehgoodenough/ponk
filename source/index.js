var React = require("react")
var Loop = require("./scripts/Loop")

var Game = React.createClass({
    getInitialState: function() {
        return {
            ball: {
                x: Math.floor(Math.random() * 19),
                y: Math.floor(Math.random() * 14),
                vx: 5 * (Math.random() < 0.5 ? 1 : -1),
                vy: 4 * (Math.random() < 0.5 ? 1 : -1)
            },
            score: {
                left: 0,
                right: 0
            },
            paddles: {
                left: {
                    x: 0.25,
                    y: 5
                },
                right: {
                    x: 19 - 0.25,
                    y: 7
                }
            }
        }
    },
    render: function() {
        var style = {
            width: "100%",
            height: "100%",
            border: "0.25em dotted white"
        }
        return (
            <div style={style}>
                <Pongscore position={"left"} score={this.state.score.left}/>
                <Pongscore position={"right"} score={this.state.score.right}/>
                <Pongpaddle paddle={this.state.paddles.left}/>
                <Pongpaddle paddle={this.state.paddles.right}/>
                <Pongball ball={this.state.ball}/>
            </div>
        )
    },
    componentDidMount: function() {
        Loop(function(tick) {
            this.state.ball.x += this.state.ball.vx * tick
            this.state.ball.y += this.state.ball.vy * tick
            if(this.state.ball.vx > 0
            && this.state.ball.x > 19 - 1
            && this.state.ball.y > this.state.paddles.right.y - 2
            && this.state.ball.y < this.state.paddles.right.y + 2) {
                this.state.ball.vx *= -1
            }
            if(this.state.ball.vx < 0
            && this.state.ball.x < 0 + 1
            && this.state.ball.y > this.state.paddles.left.y - 2
            && this.state.ball.y < this.state.paddles.left.y + 2) {
                this.state.ball.vx *= -1
            }
            if(this.state.ball.vx > 0
            && this.state.ball.x > 19) {
                this.state.ball.vx *= -1
                this.state.score.left++
            }
            if(this.state.ball.vx < 0
            && this.state.ball.x < 0) {
                this.state.ball.vx *= -1
                this.state.score.right++
            }
            if(this.state.ball.vy > 0
            && this.state.ball.y > 14) {
                this.state.ball.vy *= -1
            }
            if(this.state.ball.vy < 0
            && this.state.ball.y < 0) {
                this.state.ball.vy *= -1
            }
            this.forceUpdate()
        }.bind(this))
    }
})

var Pongscore = React.createClass({
    render: function() {
        var style = {
            fontSize: "2em",
            position: "absolute",
            top: "1em"
        }
        if(this.props.position == "left") {
            style.left = "1em"
        } else if(this.props.position == "right") {
            style.right = "1em"
        }
        return (
            <div style={style}>
                {this.props.score}
            </div>
        )
    }
})

var Pongpaddle = React.createClass({
    render: function() {
        var style = {
            width: "1em",
            height: "4em",
            position: "absolute",
            top: this.props.paddle.y + "em",
            left: this.props.paddle.x + "em",
            backgroundColor: "white"
        }
        return (
            <div onMouseMove={this.movePaddle} style={style}/>
        )
    },
    movePaddle: function(event) {
        this.props.paddle.y = event.clientY / window.getSizeOfEms() - 2
    }
})

var Pongball = React.createClass({
    render: function() {
        var style = {
            width: "1em",
            height: "1em",
            top: this.props.ball.y + "em",
            left: this.props.ball.x + "em",
            position: "absolute",
            backgroundColor: "white"
        }
        return (
            <div style={style}/>
        )
    }
})

React.render(<Game/>, document.frame)
