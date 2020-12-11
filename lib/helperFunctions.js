function getRndInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive

}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}