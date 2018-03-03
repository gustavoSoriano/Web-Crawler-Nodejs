const request = require("request")
const cheerio = require("cheerio")
const restify = require('restify')
const server  = restify.createServer()

server.get('search/:busca', function(req, response){

	request('https://www.google.com.br/search?q='+req.params.busca, function(err, res, body){
		if(err) return console.log( err )

		var $ = cheerio.load(body)
		let title, link, description, results=[]

		$('.g').each(function(){
			title       = $(this).find('.r a').text().trim()
			link        = $(this).find('.s .kv cite').text().trim()
			description = $(this).find('.s .st').text().trim()
			if(title && link && description) results.push( {titulo:title, url:link, descricao:description} )
		})

		response.json( results )
	})
	
})

server.listen(3000, () => console.log(`Server Listening port: ${server.url}`) )



