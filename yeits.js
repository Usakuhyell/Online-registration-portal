// GETTING THE ELEMENTS FROM THE HTML
const submitBtn = document.querySelector('.create-database');
const submitbtn = document.getElementById('databaseBtn');

const fullNameInput = document.getElementById('fullName');
const phoneNumberInput = document.getElementById('phone');
const houseAddressInput = document.getElementById('houseAddress');
const stateOfOriginInput = document.getElementById('stateOfOrigin');
const localGovAreaInput = document.getElementById('LGA');
const imageFieldInput = document.querySelector('.image-field');
const dailyBox = document.getElementById('daily');
const weeklyBox = document.getElementById('weekly');
const monthlyBox = document.getElementById('monthly');

const nameError = document.getElementById('fullNameError');
const phoneError = document.getElementById('phoneError');
const houseAddressError = document.getElementById('houseError');
const stateOfOriginError = document.getElementById('stateOfOriginError');
const localGovernmentError = document.getElementById('localGovernmentError');
const imageUploadError = document.getElementById('imageUploadError');
const checkboxError = document.getElementById('checkboxError');
const submitError = document.getElementById('submitError');

// State of origin and local government area dropdown
const dropDown = () => {
  // fetching all states and lga from json file (arrays and objects)
  fetch('nigeria-state-and-lgas.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // getting all the states from the json
      data.forEach((item) => {
        const state = item.state;
        const stateOptions = document.createElement('option');
        stateOptions.textContent = state;
        stateOfOriginInput.appendChild(stateOptions);
      });
      // tracking change in state as to create the lga dropdown
      stateOfOriginInput.addEventListener('change', () => {
        // collecting the selected state object from the json
        const selectedState = data.find((item) => {
          return item.state === stateOfOriginInput.value;
        });
        // enableing the lga I disabled in the html
        localGovAreaInput.disabled = false;
        // selecting the lga arr from the state object
        LGA = selectedState.lgas;
        // setting the default html placeholder
        localGovAreaInput.innerHTML =
          '<option value="">--select LGA--</option>';
        // looping through the arr of lga to giet each
        LGA.forEach((item) => {
          lgaOptions = document.createElement('option');
          lgaOptions.textContent = item;
          localGovAreaInput.appendChild(lgaOptions);
        });
      });
    })
    .catch((err) => {
      console.log('Rejected:', err);
    });
};

//Setting state of origin and local government area
dropDown();

// COMPLETE FORM VALIDATION
function formValidation() {
  const fullName = fullNameInput.value.trim().split(' ');
  const fullNameValue = fullNameInput.value.trim();
  const onlyLetters = /^[A-Za-z\s]+$/;
  const phoneNumber = phoneNumberInput.value.trim();
  const onlyNumbers = /^[0-9]+$/;
  const houseAddress = houseAddressInput.value.trim();
  const imageFile = imageFieldInput.files[0];
  const allowedImageType = ['image/jpeg', 'image/png'];
  const allowedImageSize = 5 * 1024 * 1024;

  // clearing all errors
  nameError.textContent = '';
  phoneError.textContent = '';
  houseAddressError.textContent = '';
  stateOfOriginError.textContent = '';
  localGovernmentError.textContent = '';
  imageUploadError.textContent = '';
  checkboxError.textContent = '';
  submitError.textContent = '';

  // full name validation
  if (fullNameValue === '') {
    nameError.textContent = 'Full name is required.';
    submitError.textContent = nameError.textContent;
    return false;
  } else if (fullName.length > 3) {
    nameError.textContent = 'Full name should not be more than three names.';
    submitError.textContent = nameError.textContent;
    return false;
  } else if (fullName.length === 1) {
    nameError.textContent = 'please enter your full name.';
    submitError.textContent = nameError.textContent;
    return false;
  } else if (!onlyLetters.test(fullNameValue)) {
    nameError.textContent =
      'Full name must contain only letter no numbers and special chatacters.';
    submitError.textContent = nameError.textContent;
    return false;
  }
  // Phone number validation
  else if (phoneNumber === '') {
    phoneError.textContent = 'Phone number is required';
    submitError.textContent = phoneError.textContent;
    return false;
  } else if (!onlyNumbers.test(phoneNumber)) {
    phoneError.textContent =
      'Phone number must only be digits no alphabets and special characters.';
    submitError.textContent = phoneError.textContent;
    return false;
  } else if (phoneNumber.length !== 11) {
    phoneError.textContent = 'Phone number must be eleven digits.';
    submitError.textContent = phoneError.textContent;
    return false;
  }
  // House address validation
  else if (houseAddress === '') {
    houseAddressError.textContent = 'House address is required';
    submitError.textContent = houseAddressError.textContent;
    return false;
  } else if (houseAddress.length > 100) {
    houseAddressError.textContent = "Please shorten your address it's too long";
    submitError.textContent = houseAddressError.textContent;
    return false;
  }
  // State of origin validation.
  else if (stateOfOriginInput.value === '') {
    stateOfOriginError.textContent = 'state of origin is required';
    submitError.textContent = stateOfOriginError.textContent;
    return false;
  }
  // Local government area validation.
  else if (localGovAreaInput.value === '') {
    localGovernmentError.textContent = 'local government area is required';
    submitError.textContent = localGovernmentError.textContent;
    return false;
  }
  // photo/passport validaion
  else if (!imageFile) {
    imageUploadError.textContent = 'Image/pasport photo is required';
    submitError.textContent = imageUploadError.textContent;
    return false;
  } else if (!allowedImageType.includes(imageFile.type)) {
    imageUploadError.textContent = 'The image should only be in jpeg or png';
    submitError.textContent = imageUploadError.textContent;
    return false;
  } else if (imageFile.size > allowedImageSize) {
    imageUploadError.textContent = 'The photo size should not be more than 5MB';
    submitError.textContent = imageUploadError.textContent;
    return false;
  }
  // Saving scheme validation.
  else if (
    dailyBox.checked !== true &&
    weeklyBox.checked !== true &&
    monthlyBox.checked !== true
  ) {
    checkboxError.textContent = 'click at least one checkbox';
    submitError.textContent = checkboxError.textContent;
    return false;
  }
  return true;
}

function consolingInputs() {
  // getting all the values

  const fullName = fullNameInput.value;
  const phoneNumber = phoneNumberInput.value;
  const houseAddress = houseAddressInput.value;
  const stateOfOrigin = stateOfOriginInput.value;
  const LGA = localGovAreaInput.value;
  const imageField = imageFieldInput.files;
  const dailyField = dailyBox.checked;
  const weeklyField = weeklyBox.checked;
  const monthlyField = monthlyBox.checked;

  // Inserting the values into an array
  const userData = {
    'Full Name': fullName,
    'Phone Number': phoneNumber,
    'House Address': houseAddress,
    'State of Origin': stateOfOrigin,
    'Local Government Area': LGA,
    'Passport/Photo': imageField,
    'Daily Checkbox': dailyField,
    'Weekly Checkbox': weeklyField,
    'Monthly Checkbox': monthlyField,
  };

  const userDataArray = Object.entries(userData);

  console.log(userDataArray);

  // clearing the placeholders
  fullNameInput.value = '';
  phoneNumberInput.value = '';
  houseAddressInput.value = '';
  stateOfOriginInput.value = '';
  localGovAreaInput.value = '';
  imageFieldInput.value = '';
  dailyBox.checked = false;
  weeklyBox.checked = false;
  monthlyBox.checked = false;
}

submitBtn.addEventListener('click', function (event) {
  // prevents the browser from reloading
  event.preventDefault();

  // validating the form
  const isValid = formValidation();

  if (isValid) {
    // console.logging all field values
    consolingInputs();
  }
});

submitbtn.addEventListener('click', function (event) {
  // prevents the browser from reloading
  event.preventDefault();

  // validating the form
  const isValid = formValidation();

  if (isValid) {
    // console.logging all field values
    consolingInputs();
  }
});
