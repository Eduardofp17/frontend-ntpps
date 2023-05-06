import axios from 'axios';

//Production
export default axios.create({ baseURL: 'https://backend.nourishnet.net/' });

// //Delopment
// export default axios.create({ baseURL: 'http://localhost:3001' });
