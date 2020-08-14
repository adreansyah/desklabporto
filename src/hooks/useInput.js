import { useState } from 'react';
import { validateInput, validateFormClear, validateInputClear } from 'helper';

export const useInput = ({ initialObjects, identity }) => {
    const [hasValue, setValue] = useState(initialObjects);

    const selectItems = (items, value) => {
        const idx = items.indexOf(value);
        if (idx >= 0) {
            items.splice(idx, 1);
        }
        if (idx === -1) {
            items.splice(idx, 0, value);
        }
        return items;
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const onChange = async (e) => {
        const { name, value } = e.target
        setValue(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
        try {
            await validateInput(identity, name)
        }
        catch (e) {

        }
    }

    const onSelectMultiple = async (selectPropertiesValue, AttrTextName) => {
        const { name } = AttrTextName;
        setValue(prev => {
            return {
                ...prev,
                [name]: selectPropertiesValue !== null ? selectPropertiesValue : []
            }
        });
        try {
            await validateInputClear(identity, name);
        }
        catch (e) {

        }
    }

    const onSelect = async (selectPropertiesValue, AttrTextName) => {
        const { name } = AttrTextName;
        const { value } = selectPropertiesValue;
        setValue(prev => {
            return {
                ...prev,
                [name]: value
            }
        });
        try {
            await validateInputClear(identity, name);
        }
        catch (e) {

        }
    }

    const onChecked = async (e) => {
        const { name, checked } = e.target;
        setValue(prev => {
            return {
                ...prev,
                [name]: checked
            }
        });
        try {
            await validateInput(identity, name)
        }
        catch (e) {

        }
    }

    const onCheckedBatch = async (e) => {
        const { name, value } = e.target
        const result = selectItems(hasValue[name], value);
        setValue(prev => {
            return {
                ...prev,
                [name]: result
            }
        })
        try {
            await validateInput(identity, name)
        }
        catch (e) {

        }
    }

    const onUploadPhoto = async (e) => {
        const { files, name } = e.target
        const fileTypes = ['jpg', 'jpeg', 'png'];
        if (files[0] !== undefined) {
            let extension = files[0].name.split('.').pop().toLowerCase(),
                isSuccess = fileTypes.indexOf(extension) > -1;
            if (isSuccess) {
                const imageX = files[0]
                const imagesURL = URL.createObjectURL(imageX);
                const ImageSources = {
                    uris: imagesURL,
                    filesImage: imageX,
                    base64: await toBase64(imageX)
                }
                setValue(prev => {
                    return {
                        ...prev,
                        [name]: ImageSources
                    }
                })
            }
            else {
                console.log('error bray')
            }
        }
        try {
            await validateInput(identity, name)
        }
        catch (e) {

        }
    }

    const onGetDate = async (name, value) => {
        setValue(prev => {
            return {
                ...prev,
                [name]: new Date(value)
            }
        });
        setTimeout(async () => {
            try {
                await validateInput(identity, name)
            }
            catch (e) {

            }
        }, 0);

    }

    const validateSingleInput = (name) => {
        validateInput(identity, name)
    }

    const validateMultipleInput = (properties) => {
        validateInput(identity, properties)
    }

    const resetByName = async (name) => {
        setValue({
            ...hasValue,
            [name]: ""
        });
        try {
            await validateInputClear(identity, name);
        }
        catch (e) {

        }
    }

    const resetMultipleName = (properties) => {
        validateInputClear(identity, properties);
    }

    const resetByForm = () => {
        setValue(initialObjects);
        validateFormClear(identity);
    }

    return {
        selectItems,
        setValue,
        value: hasValue,
        resetByForm,
        resetByName,
        resetMultipleName,
        validateSingleInput,
        validateMultipleInput,
        bindChange: {
            onChange: onChange
        },
        bindSelect: {
            onChange: onSelect
        },
        bindSelectMultiple: {
            onChange: onSelectMultiple
        },
        bindChecked: {
            onChange: onChecked
        },
        bindCheckedBatch: {
            onChange: onCheckedBatch
        },
        bindUploadPhoto: {
            onChange: onUploadPhoto
        },
        bindSelectDate: {
            onChange: onGetDate
        }
    };
}