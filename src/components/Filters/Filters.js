import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useLocation} from "react-router";

const FILTER_MODE = "FILTER_MODE";
const UPDATE_MODE = "UPDATE_MODE";
const CREATE_MODE = "CREATE_MODE";

export const Filters = ({
    object,
    method,
    objectStructure,
    onSubmitAction,
}) => {
    const [mode, setMode] = useState(FILTER_MODE);
    const [values, setValues] = useState({});
    const data = useSelector((store) => store.object);
    const location = useLocation();

    //todo ?????
    useEffect(() => {
        let obj = {};
        Object.keys(objectStructure).forEach(key => {
            if (objectStructure[key].defaultValue)
                obj[key] = objectStructure[key].defaultValue;
        })
        setValues(obj);
    }, [objectStructure])

    useEffect(() => {
        if (Object.keys(data.changeObject).length > 0) {
            setValues(data.changeObject)
            setMode(UPDATE_MODE);
        }
    }, [data.changeObject])

    //todo ????
    useEffect(() => {
        setMode(FILTER_MODE);
    }, [location.pathname])

    const setValue = (key, value) => {
        setValue({
            ...value,
            [key]: value.target
                ? value.target.value
                : value
        })
    }

    const getTitle = (mode) => {
        switch (mode) {
            default:
            case FILTER_MODE:
                return `Filter ${object}`;
            case UPDATE_MODE:
                return `Update ${object}`;
            case CREATE_MODE:
                return `Create ${object}`;
        }
    }

    const changeMode = (type) => {
        clearValues();
        setMode(type);
    }

    const clearValues = () => {
        let val = {};
        Object.keys(values).forEach(key => {
            val[key] = '';
        })
        setValues(val);
    }

    return (
        <div>
            <div>
                <h3>{getTitle(mode)}</h3>
            </div>
            <div>
                <button onClick={()=>changeMode(CREATE_MODE)}>Create</button>
                <button onClick={()=>changeMode(FILTER_MODE)}>Filter</button>
            </div>
            {
                objectStructure &&
                <div>
                    {Object.keys(objectStructure).map(key => {
                        if (key !== 'id')
                            switch (objectStructure[key].type) {
                                case 'text':
                                case 'number':
                                    return (
                                        <input/>
                                    );
                                case 'select':
                                    return (
                                        <section/>
                                    );
                            }
                    })}
                </div>
            }
            {/*<button onClick={() => onSubmitAction(value)}>OK</button>*/}
        </div>
    )
}