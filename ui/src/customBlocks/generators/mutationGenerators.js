/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable arrow-body-style */
const createGenerators = () => {
  const getUpdateShapeFuncName = (fieldName) => `_updateShape${fieldName}`;
  const getValidateFuncName = (fieldName) => `_validate${fieldName}`;

  const validateGenerator = ({ fieldName }) => {
    return function (newValue) {
      this.getSourceBlock()[getUpdateShapeFuncName(fieldName)](newValue);
      return newValue;
    };
  };
  const domToMutationGenerator = ({ customFields = [] }) => {
    return function (xmlElement) {
      customFields.forEach(({ fieldName }) => {
        const customOptionsXmlAttributeName = fieldName;
        const customOptionsXmlAttribute = xmlElement.getAttribute(
          customOptionsXmlAttributeName
        );
        const updateShapeFuncName = getUpdateShapeFuncName(fieldName);
        this[updateShapeFuncName](customOptionsXmlAttribute);
      });
    };
  };

  const mutationToDomGenerator = ({ customFields = [] }) => {
    return function () {
      const container = document.createElement('mutation');

      customFields.forEach(({ fieldName, getHasCustomOptions }) => {
        const customOptionsXmlAttributeName = fieldName;
        const customOptionsFieldValue = this.getFieldValue(fieldName);
        const hasCustomOptions = getHasCustomOptions(customOptionsFieldValue);

        if (hasCustomOptions) {
          container.setAttribute(
            customOptionsXmlAttributeName,
            customOptionsFieldValue
          );
        } else {
          container.setAttribute(customOptionsXmlAttributeName, '');
        }
      });

      return container;
    };
  };

  const shapeFuncGenerator = ({
    getHasCustomOptions,
    checkInputsExists,
    createFields,
    removeFields,
  }) => {
    return function (customOptionsXmlAttribute) {
      const hasCustomOptions = getHasCustomOptions(customOptionsXmlAttribute);

      const customOptionsDummyInputExists = checkInputsExists(this);

      if (hasCustomOptions) {
        if (!customOptionsDummyInputExists) {
          createFields(this);
        }
      } else if (customOptionsDummyInputExists) {
        removeFields(this);
      }
    };
  };

  const customFieldMethodsGenerator = ({ customFields }) => {
    const init = {
      mutationToDom: mutationToDomGenerator({ customFields }),
      domToMutation: domToMutationGenerator({ customFields }),
    };
    const fieldMethods = customFields.reduce((acc, cur) => {
      const {
        fieldName,
        getHasCustomOptions,
        checkInputsExists,
        createFields,
        removeFields,
      } = cur;
      const validateFuncName = getValidateFuncName(fieldName);
      const updateShapeFuncName = getUpdateShapeFuncName(fieldName);

      return {
        ...acc,
        [validateFuncName]: validateGenerator({ fieldName }),
        [updateShapeFuncName]: shapeFuncGenerator({
          getHasCustomOptions,
          checkInputsExists,
          createFields,
          removeFields,
        }),
      };
    }, init);
    return fieldMethods;
  };
  return {
    block: {
      getUpdateShapeFuncName,
      getValidateFuncName,
      validateGenerator,
      domToMutationGenerator,
      mutationToDomGenerator,
      shapeFuncGenerator,
      customFieldMethodsGenerator,
    },
  };
};

export default createGenerators;
