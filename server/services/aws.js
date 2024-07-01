const { promisify } = require('util');
const AWS = require('aws-sdk');

// ############################ START: S3 ############################

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  params: { Bucket: process.env.AWS_S3_BUCKET },
  // credentials
});

const s3UploadAsync = promisify(s3.upload).bind(s3);


async function checkFileHeader(path) {
  let params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: path
  };
  try{
    await s3.headObject(params).promise();
    return s3.getSignedUrl('getObject', params);
  }catch(e) {
    console.log(e.message);
    return false;
  }
}


async function uploadFileS3(filename, folder, content, ext = 'txt') {
  const uploadFileParams = {
    Key: `${folder}/${filename}.${ext}`,
    Body: content,
    ACL:'public-read'
  };

  let url = '';

  try {
    const data = await s3UploadAsync(uploadFileParams);

    if ('Location' in data) {
      url = data.Location;
    } else {
      console.log('Location not found, inside services/aws.js');
      console.log(data);
    }
  } catch (ex) {
    console.log('exception occurred while uploading image (S3), inside services/aws.js');
    console.log(ex.message);
  }

  return url;
}



// ############################# END: S3 #############################

async function sendEmail(params) {
  // Create sendEmail params
  let emailParams = {
    Destination: { /* required */
      ToAddresses: [
        params.to,
      ]
    },
    Message: { /* required */
      Body: { /* required */

        Text: {
          Charset: "UTF-8",
          Data: params.body
        }
       },
       Subject: {
        Charset: 'UTF-8',
        Data: params.subject
       }
      },
    Source: 'no-reply@mdecor.com', /* required */
    ReplyToAddresses: [
       'no-reply@mdecor.com',
    ],
  };

  if(params.html) {
    emailParams.Message.Body = {
      Html: {
        Charset: "UTF-8",
        Data: params.htmlData
      }
    }
  }
  // Create the promise and SES service object
  let SES = new AWS.SES({region: process.env.AWS_REGION})
  SES.sendEmail(emailParams, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
    /*
    data = {
    MessageId: "EXAMPLE78603177f-7a5433e7-8edb-42ae-af10-f0181f34d6ee-000000"
    }
    */
  });


}


module.exports = {
  sendEmail,
  uploadFileS3,
  checkFileHeader
};
