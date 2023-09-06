const apiUrl = ("https://images-api.nasa.gov/");
fetch (apiUrl)
 
    .then ( res => {
        if (!res.ok) {
            throw new Error('error') 
        }
    return res.json();
    })
    .then (data=> {
    console.log(data)
    })
    .catch (err => {
});
