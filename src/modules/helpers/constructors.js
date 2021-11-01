export const constructCity = (value) => {
    return {
        id: value['id'] || 0,
        name: value['name'] || 'default',
        coordinate: value['coordinate']
            ? {
                x: value['coordinate_X'] || 0,
                y: value['coordinate_Y'] || 0,
            }
            : {
                x: 0,
                y: 0,
            },
        creationData: value['creationData'] || '01.01.2000',
        area: value['area'] || 0,
        population: value['population'] || 0,
        metersAboveSeaLevel: value['metersAboveSeaLevel'] || 0,
        timezone: value['timezone'] || 0.0,
        capital: value['capital'] || false,
        government: value['government'] || 'DEMARCHY',
        governor: value['governor'] || 'Ivan'
    }
}

export const constructCoordinate = (value) => {
    return {
        x: value['x'] || 0,
        y: value['y'] || 0,
    }
}

export const constructHuman = (value) => {
    return {
        name: value['name'] || 'ivan'
    }
}