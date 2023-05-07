import { useState, useEffect } from "react";

function useLocation() {
  const [city, setCity] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const apiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            setCity(data.locality);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return city;
}

export default useLocation;
