var React = require("react")

var Game = React.createClass({
    render: function() {
        return (
            <span>
                Hello World!
            </span>
        )
    }
})

React.render(<Game/>, document.getElementById("game-frame"))
