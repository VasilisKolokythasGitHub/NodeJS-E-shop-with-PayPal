const express = require('express')
const router = express.Router()
const controllers = require('../controllers')


router.get('/', async(req,res,next) => {

	const data = req.context
    const shirtCtr = controllers.shirt.instance()
    data.shirts =  await shirtCtr.get()
	
	console.log(req.context)
	

	res.render('home', data)

})

router.get('/shirts', async (req,res,next) => {
	const shirtCtr = controllers.shirt.instance()
    const shirts =  await shirtCtr.get()
	res.json({
		shirts
	})
})




router.get('/shirt/:slug', async (req,res,next) => {
	const data = req.context
	const slug = req.params.slug
	const shirtCtr = controllers.shirt.instance()
	const shirts =  await shirtCtr.get({slug})


	if (shirts.length ==0)
	{

		res.json({
			confirmation: 'fail',
			message: 'Shirt Not Found'
		})
		return
	}
		data.shirt = shirts[0]
		data.pp_client_id = process.env.PP_CLIENT_ID
		res.render('shirt',data)


})



module.exports = router