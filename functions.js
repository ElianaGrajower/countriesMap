const baseUrl = 'https://restcountries.com/v3.1/';

const getCountry = async (country) => {
    try {
        const res = await axios.get(`${baseUrl}name/${country}?fields=name,flags,cca3`);
        return res.data;
    } catch (error) {
        console.log(error);
        return error;
    };
};

const getCountryFull = async (countryCode) => {
    try {
        const res = await axios.get(`${baseUrl}alpha/${countryCode}`);
        return res.data;
    } catch (error) {
        console.log(error);
        return error;
    };
};

export { getCountry, getCountryFull };
