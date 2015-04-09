var Loop = function(func) {
    (function loop(time) {
    	func(Math.min((Date.now() - time) / 1000, 1))
        window.requestAnimationFrame(loop.bind(null, Date.now()))
    })(Date.now())
}

module.exports = Loop
