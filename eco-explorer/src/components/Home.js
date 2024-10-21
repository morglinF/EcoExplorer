import React, {useState, useEffect} from 'react';

export default function Home(){
   
const [animals, setAnimals] = useState([])

useEffect(() => {
    const fetchAnimalData = async () => {
        try {
            const apiKey = process.env.REACT_APP_ANIMAL_API_KEY;
            console.log(apiKey);

            const response = await fetch(`https://api.api-ninjas.com/v1/animals?name=lion`, {
                method: 'GET',
                headers: {
                    'X-Api-Key': apiKey,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setAnimals(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    fetchAnimalData()
}, [])
    return <div>Home</div>
} 