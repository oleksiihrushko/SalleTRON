import axios from 'axios';

const apiKey = 'AIzaSyDM4b8GRIsIe7_30Fx8kj3A7uV0dBkEs-o';
let token = '';
token = JSON.parse(localStorage.getItem('token'))
axios.defaults.baseURL = 'https://salletronbase.firebaseio.com'


export const authWithEmailAndPassword = async user => {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
      ...user,
      returnSecureToken: true,
    },
  );

  localStorage.setItem('token', JSON.stringify(response.data.idToken));

  const userData = {
    id: response.data.localId,
    email: response.data.email,
    createdAt: Date.now(),
    adv: [''],
    favorites: [''],
    token: JSON.stringify(response.data.idToken)
  }

  await axios.post(`/users.json?auth=${token}`, {
    ...userData
  })
};

export const getUser = async () => {
  const users = await axios.get('/users.json');
  const values = Object.values(users.data);

  const result = values.find(user => user.token ===
    (localStorage.getItem('token')));
  return result;
}

// const addUserFavorite = (id) => {
//   getUser().then(user => {
//     console.log(user);
//     const request = axios(`/users.json?${user.token}`);
//     request.then(console.log)

//     const record = axios.patch(`/users.json?${user.token}&auth=${token}`, {
//       favorites: [id]
//     })
//   })
// }
// addUserFavorite("-M8u8LtvThmdE986NH_u")

export const addProduct = (productData) => {
  axios.post(`/products/${productData.categories}.json?auth=${token}`, {
    ...productData
  });
};

export const getProducts = async () => {
  const response = await axios(`/products.json`);
  return transformedData(response.data)
};

export const getProductsByCategory = async (category) => {
  const result = await getProducts()
  const filteredResult = result.filter(item => item.categories === category);
  return filteredResult;
}

export const getProductById = async (id) => {
  const result = await getProducts()
  const filteredResult = result.find(item => item.id === id);
  return filteredResult;
}

const transformedData = (categories) => {
  const arr = [];
  const values = Object.values(categories);
  for (let value of values) {
    const keys = Object.keys(value);
    for (let key of keys) {
      arr.push({
        id: key,
        ...value[key]
      })
    }
  }
  return arr;
}
