import './navigationMenu.scss'
import navigationCard from './navigation.hbs';
import api from '../../services/api.js'

const navigationFilter = document.querySelector('.navigationFilter');

//*=========== render list item

const insert = (array) => {
    console.log(array);
    const markup =  navigationCard(array)
    navigationFilter.insertAdjacentHTML('afterbegin', markup)
}
api.getCategoriesList().then(data => insert(data));


//*===============  

// const navigationFilterList = document.querySelector('.navigationFilterList');
// navigationFilterList.addEventListener('click', (e) => {
//     if (e.target.nodeName !== "LI") return;
   //! openCategory(e.target.value) ждём импорта от Жени
// });
