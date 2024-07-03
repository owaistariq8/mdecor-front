export const allowedImageExtensions = ['png', 'jpeg', 'jpg', 'gif', 'bmp', 'webp'];
export const allowedDocumentExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];
export const maxFiles = JSON.parse( localStorage.getItem('configurations'))?.find( ( c )=> c?.name === 'MAX_UPLOAD_FILES' )
