import React, {useEffect, useState} from 'react';
import {CellInput} from "./CellInput/CellInput";
import {CellSelectCapital} from "./CellSelectCapital/CellSelectCapital";
import {CellSelectorGovernment} from "./CellSelectorGovernment/CellSelectorGovernment";

export const Content = ({current, perPage, content, onClick, checkEnter, sendUpdate}) => {

    let fromIndex = (current - 1) * perPage;
    let page = content.slice(fromIndex, Math.min(fromIndex + perPage, content.length));

    return (

        page.map(item =>
            <tr key={item.id}>
                {/*<td>{item.id}</td>*/}
                <td>{item.id}</td>
                {/*<td>{item.name}</td>*/}
                <td><CellInput checkEnter={(e, content) => checkEnter(e, item.id, "name", content)} props={item.name} /></td>
                <td><CellInput checkEnter={(e, content) => checkEnter(e, item.id, "coordinate_x", content)} props={item.coordinates.x} /></td>
                <td><CellInput checkEnter={(e, content) => checkEnter(e, item.id, "coordinate_y", content)} props={item.coordinates.y} /></td>
                <td>{Date(item.creationDate)}</td>
                <td><CellInput checkEnter={(e, content) => checkEnter(e, item.id, "area", content)} props={item.area} /></td>
                <td><CellInput checkEnter={(e, content) => checkEnter(e, item.id, "population", content)} props={item.population} /></td>
                <td><CellInput checkEnter={(e, content) => checkEnter(e, item.id, "metersAboveSeaLevel", content)} props={item.metersAboveSeaLevel} /></td>
                <td><CellInput checkEnter={(e, content) => checkEnter(e, item.id, "timezone", content)} props={item.timezone} /></td>
                {/*<td>{String(item.capital)}</td>*/}
                <td><CellSelectCapital
                    props={item.capital}
                    sendUpdate={(content) => sendUpdate(item.id, "capital", content)}
                /></td>
                {/*<td>{item.government}</td>*/}
                <td><CellSelectorGovernment
                    props={item.government}
                    sendUpdate={(content) => sendUpdate(item.id, "government", content)}
                /></td>
                <td><CellInput checkEnter={(e, content) => checkEnter(e, item.id, "governor", content)} props={item.governor.name} /></td>
                <button onClick={(event) => onClick(event.target.value)} value={item.id}>Удалить</button>
            </tr>)
    );
};


// request
// const [error, setError] = useState(null);
// const [isLoaded, setIsLoaded] = useState(false);
// const [items, setItems] = useState([]);
//
// const get = () => {
//     fetch("http://localhost:8080/Lab1/all/city")
//         .then(res => res.json())
//         .then(
//             (result) => {
//                 setIsLoaded(true);
//                 setItems(result);
//             },
//             (error) => {
//                 setIsLoaded(false);
//                 setError(error);
//             }
//         )
// }
//    [
//     {
//         "id": 249,
//         "name": "MSK",
//         "coordinates": {
//             "id": 250,
//             "x": 21,
//             "y": 32.2
//         },
//         "creationDate": {
//             "date": {
//                 "year": 2021,
//                 "month": 10,
//                 "day": 3
//             },
//             "time": {
//                 "hour": 12,
//                 "minute": 11,
//                 "second": 55,
//                 "nano": 895365000
//             }
//         },
//         "area": 4,
//         "population": 9,
//         "metersAboveSeaLevel": 3,
//         "timezone": 3.3,
//         "capital": true,
//         "government": "DEMARCHY",
//         "governor": {
//             "id": 251,
//             "name": "Vasya"
//         }
//     },
//     {
//         "id": 252,
//         "name": "N",
//         "coordinates": {
//             "id": 253,
//             "x": 20,
//             "y": 31.1
//         },
//         "creationDate": {
//             "date": {
//                 "year": 2021,
//                 "month": 10,
//                 "day": 3
//             },
//             "time": {
//                 "hour": 12,
//                 "minute": 12,
//                 "second": 47,
//                 "nano": 573940000
//             }
//         },
//         "area": 3,
//         "population": 8,
//         "metersAboveSeaLevel": 2,
//         "timezone": 2.2,
//         "capital": true,
//         "government": "DEMARCHY",
//         "governor": {
//             "id": 254,
//             "name": "Ira"
//         }
//     },
//     {
//         "id": 258,
//         "name": "B",
//         "coordinates": {
//             "id": 259,
//             "x": 20,
//             "y": 31.1
//         },
//         "creationDate": {
//             "date": {
//                 "year": 2021,
//                 "month": 10,
//                 "day": 3
//             },
//             "time": {
//                 "hour": 20,
//                 "minute": 52,
//                 "second": 43,
//                 "nano": 176730000
//             }
//         },
//         "area": 10,
//         "population": 8,
//         "metersAboveSeaLevel": 2,
//         "timezone": 2.2,
//         "capital": false,
//         "government": "DEMARCHY",
//         "governor": {
//             "id": 260,
//             "name": "vv"
//         }
//     },
//     {
//         "id": 261,
//         "name": "B",
//         "coordinates": {
//             "id": 262,
//             "x": 20,
//             "y": 31.1
//         },
//         "creationDate": {
//             "date": {
//                 "year": 2021,
//                 "month": 10,
//                 "day": 3
//             },
//             "time": {
//                 "hour": 21,
//                 "minute": 47,
//                 "second": 44,
//                 "nano": 522836000
//             }
//         },
//         "area": 10,
//         "population": 8,
//         "metersAboveSeaLevel": 2,
//         "timezone": 2.2,
//         "capital": false,
//         "government": "DEMARCHY",
//         "governor": {
//             "id": 263,
//             "name": "vv"
//         }
//     }
// ]ke
