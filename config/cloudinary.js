// config/cloudinary.js

const cloudinary = require('cloudinary').v2

cloudinary.config({})
console.log('Cloud name loaded:', process.env.CLOUDINARY_CLOUD_NAME)
console.log('Key loaded:', process.env.CLOUDINARY_API_KEY)
console.log('Secret loaded:', process.env.CLOUDINARY_API_SECRET ? 'yes, length ' + process.env.CLOUDINARY_API_SECRET.length : 'MISSING')

module.exports = cloudinary