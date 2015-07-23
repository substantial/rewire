var reverts = [];

function __reset__() {
    reverts.forEach(function(revert) { revert() });
}

module.exports = { reverts: reverts, __reset__: __reset__ };
