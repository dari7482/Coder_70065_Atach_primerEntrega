

function chekValues(body) {
    console.log(body)
    if (body.title && body.description && body.code && body.price && body.stock && body.category) {
        return true;
    } else {

        throw new Error('missing mandatory fields');
    }
};




module.exports = chekValues