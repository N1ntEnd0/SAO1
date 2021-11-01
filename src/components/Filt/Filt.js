import React, {useState} from 'react';

export const Filt = (props) => {
    return (
        <tr>
            <td><input type="text" value={props.id} onChange={(event) => props.handleId(event.target.value)}/></td>
            <td><input type="text" value={props.name} onChange={(event) => props.handleName(event.target.value)}/></td>
            <td><input type="text" value={props.x} onChange={(event) => props.handleX(event.target.value)}/></td>
            <td><input type="text" value={props.y} onChange={(event) => props.handleY(event.target.value)}/></td>
            <td><input type="text" value={props.data} onChange={(event) => props.handleData(event.target.value)}/></td>
            <td><input type="text" value={props.area} onChange={(event) => props.handleArea(event.target.value)}/></td>
            <td><input type="text" value={props.population} onChange={(event) => props.handlePopulation(event.target.value)}/></td>
            <td><input type="text" value={props.MASL} onChange={(event) => props.handleMASL(event.target.value)}/></td>
            <td><input type="text" value={props.timezone} onChange={(event) => props.handleTimezone(event.target.value)}/></td>
            <td><select value={props.capital} onChange={(event) => props.handleCapital(event.target.value)}>
                <option value=""> </option>
                <option value="True">True</option>
                <option value="False">True</option>
            </select></td>
           <td><select value={props.government} onChange={(event) => props.handleGovernment(event.target.value)}>
                <option value=""> </option>
                <option value="DEMARCHY">DEMARCHY</option>
                <option value="DESPOTISM">DESPOTISM</option>
                <option value="OLIGARCHY">OLIGARCHY</option>
            </select></td>
            <td><input type="text" value={props.governor} onChange={(event) => props.handleGovernor(event.target.value)}/></td>
        </tr>
);
};
