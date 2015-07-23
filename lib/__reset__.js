var reverts = [];

function addRevert(revert) {
    reverts.push(revert);
}

function __reset__() {
    reverts.forEach(function(revert) { revert() });
}

module.exports = { addRevert: addRevert, __reset__: __reset__ };
