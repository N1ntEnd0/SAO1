export const createJSON = (id, field, content) => {

    switch (field) {
        case("name"):
            return {
                id: id,
                name: content
            }
        case ("coordinate_x"):
            return {
                id: id,
                coordinate_x: parseInt(content)
            }
        case ("coordinate_y"):
            return {
                id: id,
                coordinate_y: parseFloat(content)
            }
        case ("area"):
            return {
                id: id,
                area: parseInt(content)
            }
        case ("population"):
            return {
                id: id,
                population: parseInt(content)
            }
        case ("metersAboveSeaLevel"):
            return {
                id: id,
                metersAboveSeaLevel: parseInt(content)
            }
        case ("timezone"):
            return {
                id: id,
                timezone: parseFloat(content)
            }
        case ("capital"):
            return {
                id: id,
                capital: Boolean(content)
            }
        case ("government"):
            return {
                id: id,
                government: content
            }
        case ("governor"):
            return {
                id: id,
                governor: content
            }
    }
}