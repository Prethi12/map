import React from 'react';
import axios from 'axios';

const Fetch = async() => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${City}&format=json`);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
};

export default Fetch;
