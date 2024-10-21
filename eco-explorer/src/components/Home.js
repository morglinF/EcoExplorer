import React, {useState, useEffect} from 'react';

export default function Home(){
   
const [animals, setAnimals] = useState([])

useEffect(() => {
    const fetchAnimalData = async() => {
        try{
            const response = await fetch("https://api.api-ninjas.com/v1/animals")
            const data = await response.json()
            setAnimals(data)
            console.log(data)
        } catch (error) {
           console.error(error) 
        }
    }

    fetchAnimalData()
}, [])
    return <div>Homxsse</div>
} 