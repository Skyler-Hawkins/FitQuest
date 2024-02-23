
export default function handler(req, res) {

    let fetched_quote = "";
    
    fetch('https://api.api-ninjas.com/v1/quotes?category=fitness', {
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
          fetched_quote = result[0].quote + " -"+ result[0].author
          res.status(200).json({ quote: fetched_quote });
        })
        .catch(error => {
          console.error('Error:', error);
          fetched_quote = result
          res.status(200).json({ quote: fetched_quote });
        });
  }
  