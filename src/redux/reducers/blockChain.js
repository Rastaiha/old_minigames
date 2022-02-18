import * as actionTypes from '../actions/actionTypes';

export default function blockChain(
  state = {
    hashData: '',
    isLoading: false,
    pageNumber: 0,
    isFirstAttemp: true,

    blockData: '',
    blockNonce: 886,

    blockChainData: ['', '', '', '', ''],
    blockChainNonce: [2124, 11127, 4427, 617, 766],
    isBlockChainMining: [false, false, false, false, false],

    privateKey: '',
    publicKey: '',

    message: '',
    messageSignature: '',

    isVerified: false,
    newMessage: '',
  },
  action
) {
  switch (action.type) {
    case actionTypes.UPDATE_HASH_DATA:
      return {
        ...state,
        hashData: action.payload.hashData,
      };

    case actionTypes.UPDATE_BLOCKCHAIN_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };

    case actionTypes.UPDATE_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.payload.pageNumber,
      };

    case actionTypes.UPDATE_FIRST_ATTEMP:
      return {
        ...state,
        isFirstAttemp: action.payload.isFirstAttemp,
      };

    ////

    case actionTypes.UPDATE_BLOCK_DATA:
      return {
        ...state,
        blockData: action.payload.blockData,
      };

    case actionTypes.UPDATE_BLOCK_NONCE:
      return {
        ...state,
        blockNonce: action.payload.blockNonce,
      };

    ////

    case actionTypes.UPDATE_BLOCKCHAIN_DATA: {
      let { blockChainData, index } = action.payload;
      let newBlockChainData = state.blockChainData;
      newBlockChainData[index] = blockChainData;
      return {
        ...state,
        blockChainData: JSON.parse(JSON.stringify(newBlockChainData)),
      };
    }

    case actionTypes.UPDATE_BLOCKCHAIN_NONCE: {
      let { blockChainNonce, index } = action.payload;
      let newBlockChainNonce = state.blockChainNonce;
      newBlockChainNonce[index] = blockChainNonce;
      return {
        ...state,
        blockChainNonce: JSON.parse(JSON.stringify(newBlockChainNonce)),
      };
    }

    case actionTypes.UPDATE_BLOCKCHAIN_MINING: {
      let { isBlockChainMining, index } = action.payload;
      let newIsBlockChainMining = state.isBlockChainMining;
      newIsBlockChainMining[index] = isBlockChainMining;
      return {
        ...state,
        isBlockChainMining: JSON.parse(JSON.stringify(newIsBlockChainMining)),
      };
    }

    //

    case actionTypes.UPDATE_SIGNATURE_PRIVATEKEY:
      return {
        ...state,
        privateKey: action.payload.privateKey,
      };

    case actionTypes.UPDATE_SIGNATURE_PUBLICKEY:
      return {
        ...state,
        publicKey: action.payload.publicKey,
      };

    //

    case actionTypes.UPDATE_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
      };

    case actionTypes.UPDATE_MESSAGE_SIGNATURE:
      return {
        ...state,
        messageSignature: action.payload.messageSignature,
      };

    //

    case actionTypes.UPDATE_NEW_MESSAGE:
      return {
        ...state,
        newMessage: action.payload.newMessage,
      };

    case actionTypes.UPDATE_VERIFICATION_STATUS:
      return {
        ...state,
        isVerified: action.payload.isVerified,
      };

    default:
      return state;
  }
}
