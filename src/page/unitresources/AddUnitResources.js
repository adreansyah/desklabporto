import React from 'react';
import { Segment, FormControl, Textfield, ButtonGroup, Button, OptionBox } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction } from 'hooks';
import { validateForm } from 'helper';
import { useSelector } from 'react-redux';
import { requestCreateUnitResources } from 'store/actions/unitresource';

const AddUnitResources = ({ onClose }) => {
    const { hasFetch } = useAction();
    const { value, bindChange, bindSelect } = useInput({
        initialObjects: {
            unitName: "",
            departement: "",
            division: ""
        },
        identity: "unitResourcesId"
    })
    const payload = useSelector(state => {
        const listDivision = state.division.data.map((element) => ({
            value: element.id,
            label: element.name
        }));
        const listDepartement = state.departement.data.map((element) => ({
            value: element.id,
            label: element.name,
            divisionId: element.divisionId
        }));
        return {
            listDivision,
            listDepartement
        }
    })
    const findDepartementById = payload.listDepartement.filter(getDivision => getDivision.divisionId === value.division)
    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = validateForm(e.target.id, true, false);
        valid && hasFetch(requestCreateUnitResources(value));
        valid && onClose();
    }
    return (
        <Segment>
            <form id="unitResourcesId" onSubmit={handleSubmit}>
                <Segment>
                    <FormControl label="Unit Name" mb={16}>
                        <Textfield
                            inputProps={{
                                ...bindChange,
                                name: "unitName",
                                value: value.unitName,
                                className: "validate[required]",
                                autoComplete: "off",
                                autoFocus: true
                            }}
                        />
                    </FormControl>
                    <FormControl label="Division Name" mb={16}>
                        <OptionBox
                            {...bindSelect}
                            name="division"
                            options={payload.listDivision}
                            inputClassName="sample-class-in-input validate[required]"
                            placeholder="Select division"
                        />
                    </FormControl>
                    <FormControl label="Departement Name" mb={24}>
                        <OptionBox
                            {...bindSelect}
                            name="departement"
                            options={findDepartementById}
                            inputClassName="sample-class-in-input validate[required]"
                            placeholder={findDepartementById.length ? "Departement Available" : "Departement Unavailable"}
                        />
                    </FormControl>
                    <Segment className="u-tx-right">
                        <ButtonGroup>
                            <Button type="button" variant="secondary-alt" onClick={onClose} >Cancel</Button>
                            <Button type="submit" variant="primary">Save</Button>
                        </ButtonGroup>
                    </Segment>
                </Segment>
            </form>
        </Segment >
    )
}
export default AddUnitResources;