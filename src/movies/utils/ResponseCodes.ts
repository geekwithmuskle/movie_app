export const ResponseCodes = {
  // Handler for all successful requests | Code: '200'
  '0000': {
    type: 'success',
    status: 'OK',
    code: '00',
    message: 'Successful',
  },

  // Handler for all failed requests or validation or Not Found requests | Code: '400',
  '0002': {
    type: 'error',
    status: 'FAIL',
    code: '02',
    message: 'Request failed',
  },

  // Handler for invalid credentials (pin, authentication...) | Code: '401',
  '0005': {
    type: 'error',
    status: 'DENIED',
    code: '05',
    message: 'Invalid access key or credential',
  },

  // Handler for not found | Code: '404',
  '0008': {
    type: 'error',
    status: 'FAIL',
    code: '08',
    message: 'Not found',
  },
};
