const textInput = document.getElementById("textInput");
const encryptionButton = document.getElementById("encryptionButton");
const decryptionButton = document.getElementById("decryptionButton");
const containerMessageDiv = document.getElementById("containerMessageDiv");
const messageDiv = document.getElementById("messageDiv");
const transformedStringDiv = document.getElementById("transformedStringDiv");
const copyResultButton = document.getElementById("copyResultButton");
const snackbar = document.getElementById("snackbar");
const beautifulSvg = document.getElementById("beautifulSvg");

const ENCRYPTION_KEYS = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};

const DECRYPTION_KEYS = {
  enter: "e",
  imes: "i",
  ai: "a",
  ai: "a",
  ober: "o",
  ufat: "u",
};

function encode(string) {
  const regex = /[aeiou]/g;
  const splitedString = string.split("");
  const transformedStringArray = splitedString.map((char) => {
    if (char.match(regex)) {
      return ENCRYPTION_KEYS[char];
    } else {
      return char;
    }
  });
  return transformedStringArray.join("");
}

function decode(string) {
  const regex = /(enter|imes|ai|ober|ufat)/g;
  const splitedString = string.split(regex);
  const transformedStringArray = splitedString.map((char) => {
    if (DECRYPTION_KEYS[char]) {
      return DECRYPTION_KEYS[char];
    } else {
      return char;
    }
  });
  return transformedStringArray.join("");
}
function animateContainerMessageDiv() {
  containerMessageDiv.animate(
    [
      { opacity: 0, transform: "translateY(20px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    {
      duration: 200,
      easing: "ease-in-out",
      fill: "forwards",
    }
  );
}
function handleTransformText(callback) {
  const transformedString = callback(textInput.value);
  beautifulSvg.style.display = "none";
  messageDiv.style.display = "none";
  transformedStringDiv.style.fontSize = "1.5rem";
  transformedStringDiv.style.textAlign = "left";
  transformedStringDiv.innerText = transformedString;
  copyResultButton.style.display = "block";
}

function handleNoValueInTextInputError() {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 1440) {
    beautifulSvg.style.display = "block";
  }
  messageDiv.style.display = "block";
  transformedStringDiv.style.fontSize = "1rem";
  transformedStringDiv.style.textAlign = "center";
  transformedStringDiv.innerText =
    "Ingresa el texto que desees encriptar o desencriptar.";
  textInput.animate(
    [
      { transform: "translateX(10px)" },
      { transform: "translateX(-10px)" },
      { transform: "translateX(10px)" },
      { transform: "translateX(-10px)" },
      { transform: "translateX(0px)" },
    ],
    {
      duration: 1000,
      easing: "ease",
      fill: "forwards",
    }
  );
  animateContainerMessageDiv();
  copyResultButton.style.display = "none";
}

textInput.addEventListener("input", () => {
  const screenWidth = window.innerWidth;
  if (innerWidth < 1440) {
    console.log(screenWidth);
    textInput.style.height = "auto";
    textInput.style.height = `${textInput.scrollHeight}px`;
  }
});

encryptionButton.addEventListener("click", () => {
  if (textInput.value) {
    handleTransformText(encode);
    animateContainerMessageDiv();
  } else {
    handleNoValueInTextInputError();
  }
});

decryptionButton.addEventListener("click", () => {
  if (textInput.value) {
    handleTransformText(decode);
    animateContainerMessageDiv();
  } else {
    handleNoValueInTextInputError();
  }
});

copyResultButton.addEventListener("click", () => {
  const content = transformedStringDiv.innerText;

  navigator.clipboard.writeText(content).then(function () {
    snackbar.className = "show";

    setTimeout(function () {
      snackbar.className = snackbar.className.replace("show", "");
    }, 1000);
  });
});
