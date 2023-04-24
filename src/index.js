const dogBar = document.querySelector('#dog-bar');
const dogInfo = document.querySelector('#dog-info');
const dogFilterBtn = document.querySelector('#good-dog-filter');



function getDoggos() {
  fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(doggos => {
      if (dogFilterBtn.textContent === 'Filter good dogs: ON') {
        let filteredDoggos = doggos.filter(doggo => doggo.isGoodDog === true);
        populateDogBar(filteredDoggos);
      } else {
        populateDogBar(doggos)
      }

    });
}
getDoggos();

function populateDogBar(doggos) {
  dogBar.innerHTML = '';
  doggos.forEach(doggo => {
    let doggoSpan = document.createElement('span');
    doggoSpan.textContent = doggo.name;
    dogBar.append(doggoSpan);
    doggoSpan.addEventListener('click', () => {
      displayDoggo(doggo);
    });
  });
}

dogFilterBtn.addEventListener('click', setFilterGoodDogs);

function setFilterGoodDogs() {
  if (dogFilterBtn.textContent === 'Filter good dogs: OFF') {
    dogFilterBtn.textContent = 'Filter good dogs: ON';
  } else {
    dogFilterBtn.textContent = 'Filter good dogs: OFF';
  }
  dogInfo.innerHTML = '';
  getDoggos();
}

function displayDoggo(doggo) {
  dogInfo.innerHTML = '';

  let dogImgSrc = doggo.image;
  let dogNameSrc = doggo.name;
  let isGoodDogSrc = doggo.isGoodDog;

  let dogImg = document.createElement('img');
  dogImg.setAttribute('src', dogImgSrc);
  dogInfo.append(dogImg);

  let dogName = document.createElement('h2');
  dogName.textContent = dogNameSrc;
  dogInfo.append(dogName);

  let isGoodDogBtn = document.createElement('button');
  isGoodDogBtn.textContent = isGoodDogSrc ? 'Good Dog!' : 'Bad Dog!';
  dogInfo.append(isGoodDogBtn);
  isGoodDogBtn.addEventListener('click', () => {
    updateDoggoGoodness(doggo);
  });
}

function updateDoggoGoodness(doggo) {
  fetch(`http://localhost:3000/pups/${doggo.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(
      { isGoodDog: !doggo.isGoodDog }
    )
  })
    .then(res => res.json())
    .then(updatedDoggo => displayDoggo(updatedDoggo));
}