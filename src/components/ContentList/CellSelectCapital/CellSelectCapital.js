import React, {useEffect, useState} from 'react';

export const CellSelectCapital = ({props, sendUpdate}) => {
    const [content, setContent] = useState(props);

    return (
        <select
            value={content}
            onChange={(event) => setContent(event.target.value)}
            onClick={() => {sendUpdate(content)}}
        >
            <option value=""> </option>
            <option value="true">True</option>
            <option value="false">False</option>
        </select>
    );
};
