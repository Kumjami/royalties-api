module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es6": true,
        "jest": true,
    },
    "plugins": [
        "security",
    ],
    "extends": [
        "airbnb-base",
        "plugin:security/recommended",
    ],
    "rules": {
    },
};