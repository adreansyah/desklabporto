import React from 'react';
import { Segment, FormControl, Textfield, ButtonGroup, Button, OptionBox } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction } from 'hooks';
import { useSelector } from 'react-redux';
import { requestUpdateDepartement } from 'store/actions/departement';

const UpdateDepartement = ({ onClose, id }) => {
    const { hasFetch } = useAction()
    const payload = useSelector(state => {
        let listDivision = [];
        state.division.data.forEach(element => {
            listDivision = [...listDivision, {
                value: element.id,
                label: element.name
            }]
        });
        return {
            data: state.departement.data,
            listDivision
        }
    });
    const getDataDepartement = payload.data.filter(val => val.id === id);
    const { value, bindChange, bindSelect } = useInput({
        initialObjects: {
            departement: getDataDepartement[0].name,
            division: getDataDepartement[0].divisionId
        },
        identity: "departementId"
    });
    const getValueOfDivisionList = payload.listDivision.filter(divisionAttr => divisionAttr.value === value.division)
    const handleSubmit = (e) => {
        e.preventDefault();
        hasFetch(requestUpdateDepartement(id, value));
        onClose('update');
    }
    return (
        <Segment>
            <form id="departementId" onSubmit={handleSubmit}>
                <Segment>
                    <FormControl label="Departement" mb={16}>
                        <Textfield
                            inputProps={{
                                ...bindChange,
                                name: "departement",
                                value: value.departement,
                                className: "validate[required]",
                                autoComplete: "off",
                                autoFocus: true
                            }}
                        />
                    </FormControl>
                    <FormControl label="Division Name" mb={24}>
                        <OptionBox
                            {...bindSelect}
                            name="division"
                            options={payload.listDivision}
                            inputClassName="sample-class-in-input validate[required]"
                            defaultValue={getValueOfDivisionList[0]}
                        />
                    </FormControl>
                    <Segment className="u-tx-right">
                        <ButtonGroup>
                            <Button type="button" variant="secondary-alt" onClick={onClose}>Cancel</Button>
                            <Button type="submit" variant="primary">Submit</Button>
                        </ButtonGroup>
                    </Segment>
                </Segment>
            </form>
        </Segment >
    )
}
export default UpdateDepartement;