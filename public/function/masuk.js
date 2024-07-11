function validateLength(input) {
    if (input.value.length > 9) {
        input.value = input.value.slice(0, 9);
        document.getElementById('error-message').style.display = 'block';
    } else {
        document.getElementById('error-message').style.display = 'none';
    }
}
