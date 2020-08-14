import React from 'react';
import { Segment, FormControl, Textfield, ButtonGroup, Button, OptionBox } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction } from 'hooks';
import { useSelector } from 'react-redux';
import { requestUpdateUnitResources } from 'store/actions/unitresource';

const UpdateUnitResources = ({ onClose, id }) => {
    const { hasFetch } = useAction();
    const payload = useSelector(state => {
        return {
            data: state.unitResources.data,
            listDivision: state.division.data.map((element) => ({
                value: element.id,
                label: element.name
            })),
            listDepartement: state.departement.data.map((element) => ({
                value: element.id,
                label: element.name,
                divisionId: element.divisionId
            }))
        }
    })
    const findUnitResources = payload.data.filter(getUnitResources => getUnitResources.id === id)
    const { value, bindChange, bindSelect } = useInput({
        initialObjects: {
            unitName: findUnitResources[0].name,
            division: findUnitResources[0].divisionId,
            departement: findUnitResources[0].departmentId
        },
        identity: "unitResourcesId"
    })
    const findDepartement = payload.listDepartement.filter(getDivision => getDivision.divisionId === value.division);
    const findDivisionById = payload.listDivision.filter(getDivision => getDivision.value === value.division);
    const findDepartementById = findDepartement.filter(getDepartment => getDepartment.value === value.departement);
    const handleSubmit = (e) => {
        e.preventDefault();
        hasFetch(requestUpdateUnitResources(id, value));
        onClose('update');
    }
    return (
        <Segment>
            <form id="unitResourcesId" onSubmit={handleSubmit}>
                <Segment>
                    <FormControl label="Departement Name" mb={16}>
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
                            defaultValue={findDivisionById[0]}
                        />
                    </FormControl>
                    <FormControl label="Departement Name" mb={24}>
                        <OptionBox
                            {...bindSelect}
                            name="departement"
                            options={findDepartement}
                            inputClassName="sample-class-in-input validate[required]"
                            placeholder={findDepartement.length ? "Departement Available" : "Departement Unavailable"}
                            value={findDepartement.length !== 0 && findDepartementById[0]}
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
export default UpdateUnitResources;