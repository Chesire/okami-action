const axios = require('axios')

var animal = {
    shiba: "SHIBA",
    cat: "CAT",
    bird: "BIRD",
    fox: "FOX",
    dog: "DOG"
}

async function getAnimalImageUrl(animalInput) {
    const animalType = animalInput.toUpperCase()

    console.log("Looking for animal: " + animalInput)
    if (animalType == animal.shiba) {
        return getShibaImage()
    } else if (animalType == animal.cat) {
        return getCatImage()
    } else if (animalType == animal.bird) {
        return getBirdImage()
    } else if (animalType == animal.fox) {
        return getFoxImage()
    } else if (animalType == animal.dog) {
        return getDogImage()
    } else {
        console.error("Invalid animal input: " + animalInput)
        return ""
    }
}

async function getShibaImage() {
    return getShibeOnlineImage("shibes")
}

async function getCatImage() {
    return getShibeOnlineImage("cats")
}

async function getBirdImage() {
    return getShibeOnlineImage("birds")
}

async function getShibeOnlineImage(param) {
    var pictureUrl = ""
    try {
        const response = await axios.get("http://shibe.online/api/" + param)
        pictureUrl = response.data[0]
    } catch (error) {
        console.error(error)
    }

    return pictureUrl
}

async function getFoxImage() {
    var pictureUrl = ""
    try {
        const response = await axios.get("https://randomfox.ca/floof/")
        pictureUrl = response.data.image
    } catch (error) {
        console.error(error)
    }

    return pictureUrl
}

async function getDogImage() {
    var pictureUrl = ""
    try {
        const response = await axios.get("https://dog.ceo/api/breeds/image/random")
        pictureUrl = response.data.message
    } catch (error) {
        console.error(error)
    }

    return pictureUrl
}

module.exports = { getAnimalImageUrl }
