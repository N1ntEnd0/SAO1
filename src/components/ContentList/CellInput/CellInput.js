import React, {useState} from 'react';

export const CellInput = ({props, checkEnter}) => {

    const [content, setContent] = useState(props)


    return (
        <input
            style={{border: "none"}}
            value={content}
            onKeyDown={(event) => {checkEnter(event, content)}}
            onChange={event => {setContent(event.target.value)}}
        />
    );
};

