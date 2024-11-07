import { useEffect, useState } from "react";

export default function AnimeImage({onPush, id}){
    const [imageJson, setImageJson] = useState({});

    useEffect(() => {
        async function getImage(){
            const response = await fetch('https://api.nekosapi.com/v3/images/random?rating=safe&limit=1&is_flagged=false', {
                method: "GET",
            });
            const data = await response.json();
            setImageJson(data);
        }
        getImage();
        return;
    }, []);

    return (
        <div>
            {imageJson && imageJson.items && <img data-id={id} onClick={onPush} src={imageJson.items[0].sample_url} />}
        </div>
    );
}