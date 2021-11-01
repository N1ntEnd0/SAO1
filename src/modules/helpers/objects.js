export const CityStructure = {
    id: {
        type: 'number'
    },
    name: {
        type: 'text'
    },
    coordinate_X: {
        type: 'number'
    },
    coordinate_Y: {
        type: 'number'
    },
    creationData: {
        type: 'Date'
    },
    area: {
        type: 'number'
    },
    population: {
        type: 'number'
    },
    metersAboveSeaLevel: {
        type: 'number'
    },
    timezone: {
        type: 'number'
    },
    capital: {
        type: 'boolean'
    },
    government: {
        type: 'select',
        list: ['DEMARCHY', 'DESPOTISM', 'OLIGARCHY']
    },
    governor: {
        type: 'text'
    }
}

export const CoordinatesStructure = {
    x: {
        type: 'number'
    },
    y: {
        type: 'number'
    }
}

export const HumanStructure = {
    name: {
        type: 'text'
    }
}