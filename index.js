const request = require("request")
const cheerio = require("cheerio")
const restify = require('restify')
const server  = restify.createServer()

server.get('search/:busca', function(req, response){

	request('https://www.google.com.br/search?q='+req.params.busca, function(err, res, body){
		if(err) return console.log( err )

		var $      = cheerio.load(body)
		let results= []

		$('.g').each(function(){
			results.push( $(this).html() )
		})
		response.end( results.join("") )
	})
	
})

server.listen(3000, () => console.log(`Server Listening port: ${server.url}`) )



