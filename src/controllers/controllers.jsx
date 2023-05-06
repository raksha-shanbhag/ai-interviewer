const API_URL = 'http://localhost:8000/completions';

const getMessages = async(value, setResponse) => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value
      }), 
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
      const response = await fetch(API_URL, options);
      const data = await response.json()
      setResponse(data.choices[0].message.content)
    } catch(error){
      console.log(error)
    }
  }