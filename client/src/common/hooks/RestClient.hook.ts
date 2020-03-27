import axios from 'axios';

const endPoint = 'http://localhost:4000/csv';

const uploadCSV = async (csvFile) => {
    const options = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    return axios.post(endPoint, csvFile, options);
}