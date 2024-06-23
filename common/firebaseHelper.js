// const admin = require("firebase-admin");

// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//     privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
//   }),
//   storageBucket: process.env.FIREBASE_BUCKET_URL,
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
// });

// const bucket = admin.storage().bucket();
// const firebaseDatabase = admin.database();

// /**
//  * Uploads a file to a specified folder in Firebase Storage.
//  * @param {Object} file - The file object containing the file to upload.
//  * @param {string} foldername - The name of the folder in Firebase Storage where the file should be uploaded.
//  * @param {string} fileName - The name of the file to be saved in the specified folder.
//  * @returns {Promise} A promise that resolves when the file is uploaded successfully, or rejects with an error.
//  */
// const uploadToFirebaseBucket = async (file, foldername, fileName) => {
//   return new Promise((resolve, reject) => {
//     const key = foldername + "/" + fileName;

//     bucket.upload(file.buffer, {
//       destination: key,
//       metadata: {
//         contentType: file.mimetype,
//       },
//     });
//   });
// };

// module.exports = {
//   uploadToFirebaseBucket,
//   firebaseDatabase,
// };
