const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
apiKey: '4cdcba1b5dd949d3becee34f501fb95f'
});

const handleApiCall = (req, res) => {
	const {input} =req.body;
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with API'))
}


const handleImage = (req, res, database) => {
	const {id} =req.body;
	database('users')
	  .where('id', '=', id)
	  .increment('entries', 1 )
	  .returning('entries')
	  .then(entries => {
	  	res.json(entries[0]);
	  })
	  .catch(err => res.status(400).json('Unable to get entries'));
	
}

module.exports = {
  handleImage : handleImage,
  handleApiCall : handleApiCall
}
