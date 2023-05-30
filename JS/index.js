fetch("JS/data.json")
    .then(response => response.json())
    .then(rsp =>{
        console.log(rsp.data);
        rsp.data.forEach(element => {
            // lat = element.latitude;
            // long = element.longitude;
            const { latitude, longitude, infected, name, country, dead, sick } = element;
            // cases = element.infected;

            if(infected>255)
                color= "rgb(255,0,0)";
            else 
                color= `rgb(${infected},0,0)`;
            
            //mark on the map
            const marker =new mapboxgl.Marker({
                draggable: false,
                color: color
            }).setLngLat([longitude, latitude])
            .addTo(map);

            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });

            marker.getElement().addEventListener('mouseenter', () => {
                popup.setLngLat(marker.getLngLat())
                    .setHTML(
                        `<h3>${name}</h3>` +
                        `<p>Country: ${country}</p>` +
                        `<p>Dead: ${dead}</p>` +
                        `<p>Sick: ${sick}</p>`
                    )
                    .addTo(map);
            });

            marker.getElement().addEventListener('mouseleave', () => {
                popup.remove();
            });


        });
});

//we can do a updateMap over a interval setInterval(updateMap ,20000) every 20 sec reload , this is done over an api, whcih shows the live count and showcase them
