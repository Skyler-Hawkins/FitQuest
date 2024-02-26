
export default function handler(req, res) {
    let muscle = req.query.muscle;
    let difficulty = req.query.difficulty;
    let type = req.query.type;

    let url = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}&difficulty=${difficulty}&type=${type}`;
    
    fetch(url, {
        method: 'GET',
        headers: {
          'X-Api-Key': process.env.API_NINJA,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(result => {
          console.log(result);
          res.status(200).json(result);
        })
        .catch(error => {
          console.error('Error:', error);
          res.status(500).json({ error: error.toString() });
        });
  }
  