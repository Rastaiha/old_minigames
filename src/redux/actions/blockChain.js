import * as actionTypes from './actionTypes';

export const updateHashData = (hashData) => ({
  type: actionTypes.UPDATE_HASH_DATA,
  payload: { hashData },
});

export const updateLoading = (isLoading) => ({
  type: actionTypes.UPDATE_BLOCKCHAIN_LOADING,
  payload: { isLoading },
});

export const updatePageNumber = (pageNumber) => ({
  type: actionTypes.UPDATE_PAGE_NUMBER,
  payload: { pageNumber },
});

export const updateFirstAttemp = (isFirstAttemp) => ({
  type: actionTypes.UPDATE_FIRST_ATTEMP,
  payload: { isFirstAttemp },
});

/////

export const updateBlockData = (blockData) => ({
  type: actionTypes.UPDATE_BLOCK_DATA,
  payload: { blockData },
});

export const updateBlockNonce = (blockNonce) => ({
  type: actionTypes.UPDATE_BLOCK_NONCE,
  payload: { blockNonce },
});

export const updateBlockMining = (isBlockMining) => ({
  type: actionTypes.UPDATE_BLOCK_MINING,
  payload: { isBlockMining },
});

export const updateBlockChainData = (blockChainData, index) => ({
  type: actionTypes.UPDATE_BLOCKCHAIN_DATA,
  payload: { blockChainData, index },
});

export const updateBlockChainNonce = (blockChainNonce, index) => ({
  type: actionTypes.UPDATE_BLOCKCHAIN_NONCE,
  payload: { blockChainNonce, index },
});

export const updateBlockChainMining = (isBlockChainMining, index) => ({
  type: actionTypes.UPDATE_BLOCKCHAIN_MINING,
  payload: { isBlockChainMining, index },
});

/////////

export const updatePrivateKey = (privateKey) => ({
  type: actionTypes.UPDATE_SIGNATURE_PRIVATEKEY,
  payload: { privateKey },
});

export const updatePublicKey = (publicKey) => ({
  type: actionTypes.UPDATE_SIGNATURE_PUBLICKEY,
  payload: { publicKey },
});

///////

export const updateMessage = (message) => ({
  type: actionTypes.UPDATE_MESSAGE,
  payload: { message },
});

export const updateMessageSignature = (messageSignature) => ({
  type: actionTypes.UPDATE_MESSAGE_SIGNATURE,
  payload: { messageSignature },
});

///////

export const updateNewMessage = (newMessage) => ({
  type: actionTypes.UPDATE_NEW_MESSAGE,
  payload: { newMessage },
});

export const updateVerificationStatus = (isVerified) => ({
  type: actionTypes.UPDATE_VERIFICATION_STATUS,
  payload: { isVerified },
});