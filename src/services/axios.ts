import axios from 'axios';

//Production
export default axios.create({ baseURL: 'https://backend.nourishnet.net/' });

//Development
// export default axios.create({ baseURL: 'http://localhost:3001' });
