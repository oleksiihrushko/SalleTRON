import axios from 'axios';

axios.defaults.baseURL = 'https://salletronbase.firebaseio.com';

const apiKey = 'AIzaSyDM4b8GRIsIe7_30Fx8kj3A7uV0dBkEs-o';

const convertData = data => {
  const [values] = Object.values(data.data);
  return values;
};

const transformedData = categories => {
  const arr = [];
  const values = Object.values(categories);
  for (let value of values) {
    const keys = Object.keys(value);
    for (let key of keys) {
      arr.push({
        id: key,
        ...value[key],
      });
    }
  }
  return arr;
};

const getToken = () => {
  return JSON.parse(localStorage.getItem('user')).token;
};

const getId = () => {
  return JSON.parse(localStorage.getItem('user')).id;
};

// const user = {
//   email: '',
//   password:'',
// }

// const product = {
//   categories: '', // инпут селект
//   description: '',
//   images: [''],
//   name: '',
//   price: 0,
// }

const apiServices = {
  // проверка того, что пользователь аутентифицирован
  isAuth() {
    return JSON.parse(localStorage.getItem('user')) ? true : false;
  },

  // функция отвечает за регистрацию нового юзера и запись юзера в БД
  async signUpUser(user) {
    const userData = {
      id: '',
      email: '',
      createdAt: Date.now(),
      adv: [''],
      favorites: [''],
    };

    try {
      const authResponse = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
        {
          ...user,
          returnSecureToken: true,
        },
      );

      userData.id = authResponse.data.localId;
      userData.email = authResponse.data.email;

      try {
        const databaseResponse = await axios.post(
          `/users.json?auth=${authResponse.data.idToken}`,
          {
            ...userData,
          },
        );

        localStorage.setItem(
          'user',
          JSON.stringify({
            token: authResponse.data.idToken,
            id: databaseResponse.data.name,
            favorites: [],
          }),
        );
      } catch (error) {
        console.log(error);
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  },

  // функция отвечает за аутентификацию юзера
  async signInUser(user) {
    try {
      const authResponse = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {
          ...user,
          returnSecureToken: true,
        },
      );

      try {
        const databaseResponseId = await axios.get('/users.json');
        const res = Object.entries(databaseResponseId.data);

        const result = res.find(
          user => user[1].id === authResponse.data.localId,
        );

        const userFavorites = await axios.get(
          `/users/${result[0]}/favorites.json`,
        );

        localStorage.setItem(
          'user',
          JSON.stringify({
            token: authResponse.data.idToken,
            id: result[0],
            favorites: userFavorites.data,
          }),
        );
      } catch (error) {
        console.log(error);
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  },

  // // найти юзера по id
  // async getUser() {
  //   try {
  //     const users = await axios.get('/users.json');
  //     const values = Object.values(users.data);
  //     return values.find(user => user.id ===
  //       (JSON.parse(localStorage.getItem('user')).id));

  //   } catch (error) {
  //     console.log(error);
  //     return;
  //   }
  // },

  // добавление товара в favorites
  addUserFavorite(id) {
    const favorites = JSON.parse(localStorage.getItem('user')).favorites;

    favorites.push(id);

    const userInfo = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem(
      'user',
      JSON.stringify({
        ...userInfo,
        favorites,
      }),
    );
    try {
      axios.patch(`/users/${getId()}/favorites.json/?auth=${getToken()}`, {
        ...favorites,
      });
    } catch (error) {
      console.log(error);
      return;
    }
  },

  deleteUserFavorite(id) {
    const favorites = JSON.parse(localStorage.getItem('user')).favorites.filter(
      favorite => favorite !== id,
    );

    const userInfo = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem(
      'user',
      JSON.stringify({
        ...userInfo,
        favorites,
      }),
    );

    try {
      axios.put(`/users/${getId()}/favorites.json/?auth=${getToken()}`, {
        ...filteredFavorites,
      });
    } catch (error) {
      console.log(error);
      return;
    }
  },

  // добавить товар в БД из формы
  addProduct(productData) {
    if (!this.isAuth()) return;

    try {
      axios.post(
        `/products/${productData.categories}.json?auth=${getToken()}`,
        {
          ...productData,
        },
      );
    } catch (error) {
      console.log(error);
      return;
    }
  },

  // получить список категорий, возвращает массив
  async getCategoriesList() {
    const response = await axios('/categories.json');
    return convertData(response);
  },

  // получить массив всех товаров, возвращает массив объктов с товарами
  async getProducts() {
    try {
      const response = await axios('/products.json');
      return transformedData(response.data);
    } catch (error) {
      console.log(error);
      return;
    }
  },

  // получить массив товаров по категориям, возвращает массив объктов с товарами
  async getProductsByCategory(category) {
    try {
      const result = await this.getProducts();
      const filteredResult = result.filter(
        item => item.categories === category,
      );
      return filteredResult;
    } catch (error) {
      console.log(error);
      return;
    }
  },

  // получить товар по id, возвращает объект конкретного товара
  async getProductById(id) {
    try {
      const result = await this.getProducts();
      const filteredResult = result.find(item => item.id === id);
      return filteredResult;
    } catch (error) {
      console.log(error);
      return;
    }
  },
};

export default apiServices;
