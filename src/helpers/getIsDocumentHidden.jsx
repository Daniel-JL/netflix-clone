import getBrowserDocumentHiddenProp from './getBrowserDocumentHiddenProp';

const getIsDocumentHidden = () => !document[getBrowserDocumentHiddenProp()];

export default getIsDocumentHidden;
