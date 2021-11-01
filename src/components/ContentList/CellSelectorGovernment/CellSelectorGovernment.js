import React, {useState} from 'react';

export const CellSelectorGovernment = ({props, sendUpdate}) => {
    const [content, setContent] = useState(props);

    return (
        <select
            value={content}
            onChange={(event) => setContent(event.target.value)}
            onClick={() => {sendUpdate(content)}}
        >
            <option value=""> </option>
            <option value="DEMARCHY">DEMARCHY</option>
            <option value="DESPOTISM">DESPOTISM</option>
            <option value="OLIGARCHY">OLIGARCHY</option>
        </select>
    );
};

