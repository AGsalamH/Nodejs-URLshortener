module.exports = error => {
    const errors = [];
    const errorsObj = error.errors;
    const keys = Object.keys(errorsObj);
    
    for (const key in errorsObj) {
        errors.push({
            [key]: errorsObj[key].message
        });
    }

    return errors;
}