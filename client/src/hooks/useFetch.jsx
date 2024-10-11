import { useEffect, useState } from "react";

const ApiKey = import.meta.env.VITE_GIPHY_API_KEY;

const useFetch = ({keyword}) =>{
    const [gifUrl, setGifUrl] = useState("");

    const fetchGifs = async() =>{
        try {
            // console.log('entered usefetch');
            // console.log(ApiKey);
            // console.log(keyword);

            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${ApiKey}&q=${keyword.split(" ").join("")}&limit=1`);

            const {data} = await response.json();


            setGifUrl(data[0]?.images.downsized_medium?.url);

        } catch (error) {
            setGifUrl('https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHZ2bHAxM2sxeWR1aXlyMDFpZ2cwYm80ZnIycDhxemF3bzlsc2tieiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/u2UXJG4Ja3K4dNPc3b/giphy.gif');
        }
    }

    useEffect(()=>{
        if(keyword) fetchGifs();
    },[keyword])
    
    return gifUrl;
}

export default useFetch;