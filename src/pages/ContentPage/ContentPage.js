import React, {useEffect, useState} from 'react';
import {Content} from "../../components/ContentList/Content";
import {toast, Toaster} from "react-hot-toast";
import {PaginationList} from "../../paginationList/paginationList";
import {countPage} from "../../Utils/countPage";
import style from "../../paginationList/paginationList.scss"
import {createJSON} from "../../Utils/createJSON";
import {ALL, FILTER, SORT} from "../../Utils/modes";
import {logDOM} from "@testing-library/react";

export const ContentPage = () => {
    const [mode, setMode] = useState("");
    const [content, setContent] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [coordinate_x, setCoordinateX] = useState("");
    const [coordinate_y, setCoordinateY] = useState("");
    const [creationData, setData] = useState("");
    const [area, setArea] = useState("");
    const [population, setPopulation] = useState("");
    const [metersAboveSeaLevel, setMASL] = useState("");
    const [timezone, setTimezone] = useState("");
    const [capital, setCapital] = useState("");
    const [government, setGovernment] = useState("");
    const [governor, setGovernor] = useState("");
    const [sortStructure, setSortStructure] = useState({
        id: false,
        name: false,
        coordinates_x: false,
        coordinates_y: false,
        area: false,
        population: false,
        metersAboveSeaLevel: false,
        timezone: false,
        capital: false,
        government: false,
        governor_name: false,
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [totalCount, setTotalCount] = useState(10);
    const pagesCount = Math.ceil(totalCount/perPage);
    const pages = [];
    countPage(pages, pagesCount, currentPage);

    //todo delete

    useEffect(() => {
        switch (mode) {
            case ALL:
                getAll();
                break;
            case FILTER:
                sendFilter();
                break;
            case SORT:
                sendSort();
                break
        }
    }, [currentPage]);

    useEffect(() => {
        getAll();
    }, [])

    useEffect(() => {
        getOneCity();
    }, [id])

    useEffect(() => {
        setMode(FILTER);
        sendFilter();
        // countPage(pages, pagesCount, currentPage);
    }, [name, coordinate_x, coordinate_y, creationData, area, population, metersAboveSeaLevel, timezone, capital,
        government, governor])

    useEffect(() => {
        setMode(SORT);
        sendSort();
    }, [sortStructure])

    const getOneCity = () => {
        fetch(`http://localhost:8080/Lab1/city/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.total > 0) {
                        console.log(result.content);
                        setContent(result.content);
                        setTotalCount(result.total);
                    } else {
                        getAll();
                    }
                },
                (err) => {
                    setContent([]);
                    setTotalCount(0);
                }
            )
    }

    const getAll = () => {
        // fetch(`http://localhost:8080/Lab1/all/city`)
        fetch(`http://localhost:8080/Lab1/all/city?page=${currentPage}&pageSize=${perPage}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setContent(result.content);
                    setTotalCount(result.total);
                },
                (error) => {
                    toast.error("Сервис сейчас недоступен");
                }
            )
    }

    const sendFilter = () => {
        fetch(`http://localhost:8080/Lab1/all/city?page=${currentPage}&pageSize=${perPage}${createURL()}`)
            .then(res => res.json())
            .then(
                (result) => {
                    if (perPage > result.total) {
                        setCurrentPage(1);
                    }
                    setTotalCount(result.total);
                    setContent(result.content);
                },
                (error) => {
                    toast.error("Сервис сейчас недоступен");
                }
            )
    }

    const sendSort = () => {
        let url = `http://localhost:8080/Lab1/all/city?page=${currentPage}&pageSize=${perPage}&sort&`
        for (let field in sortStructure) {
            if (sortStructure[field] === true) {
                url += `${field}&`;
            }
        }
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    setTotalCount(result.total);
                    setContent(result.content);
                },
                (error) => {
                    toast.error("Сервис сейчас недоступен");
                }
            )
    }
    //todo test
    const deleteCity = (id) => {
        if (id !== "") {
            fetch(`http://localhost:8080/Lab1/city/${id}`,{
                method: "DELETE",
            })
            .then(async (response) => {
                if (
                    Math.trunc(response.status / 100) === 4
                    || Math.trunc(response.status / 100) === 5
                    || response.status === 429
                ) {
                    toast.error(await response.text());
                } else {
                    toast.success("Удалено");
                    sendFilter();
                }
            })
            .catch((err) => {
                toast.error("Сервис сейчас недоступен");
            })
            // .then(sendFilter)
        }
    }

    const sendUpdate = (id, field, content) => {
        fetch("http://localhost:8080/Lab1/city/", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(createJSON(id, field, content))
        })
            .then(async (response) => {
                if (
                    Math.trunc(response.status / 100) === 4
                    || Math.trunc(response.status / 100) === 5
                    || response.status === 429
                ) {
                    toast.error(await response.text());
                } else {
                    toast.success("Изменено");
                }
            })
    }
    //todo test
    const groupByName = () => {
        fetch(`http://localhost:8080/Lab1/city/group`)
            .then(async (response) => {
                if (
                    Math.trunc(response.status / 100) === 4
                    || Math.trunc(response.status / 100) === 5
                    || response.status === 429
                ) {
                    toast.error(await response.text());
                } else {
                    // setContent(await response.json());
                    toast.success(await response.text());
                }
            })
            .then(
                (result) => {},
                (error) => {
                    toast.error("Сервис сейчас недоступен");
                }
            )
    }

    const getWithMaxArea = () => {
        fetch(`http://localhost:8080/Lab1/city/area/max`)
            .then(res => res.json())
            .then(
                (result) => {
                    setContent(result)
                },
                (error) => {
                    toast.error("Сервис сейчас недоступен");
                }
            )
        // .then(async (response) => {
        //     if (
        //         Math.trunc(response.status / 100) === 4
        //         || Math.trunc(response.status / 100) === 5
        //         || response.status === 429
        //     ) {
        //         toast.error(await response.text());
        //     } else {
        //         setContent(await response.json());
        //     }
        // })  // .then(async (response) => {
        //     if (
        //         Math.trunc(response.status / 100) === 4
        //         || Math.trunc(response.status / 100) === 5
        //         || response.status === 429
        //     ) {
        //         toast.error(await response.text());
        //     } else {
        //         setContent(await response.json());
        //     }
        // })
    }

    const deleteByCapital = () => {
        if (capital != "") {
            fetch(`http://localhost:8080/Lab1//delete/capital?capital=${capital}`, {
                method: "DELETE"
            })
            .then(async (response) => {
                if (
                    Math.trunc(response.status / 100) === 4
                    || Math.trunc(response.status / 100) === 5
                    || response.status === 429
                ) {
                    toast.error(await response.text());
                } else {
                    toast.success("Удаленно");
                }
            })
            .catch(
                (error) => {
                    toast.error("Сервис сейчас недоступен");
                }
            )
        } else {
            toast.error("Поле capital незаданно");
        }
    }
    //todo test
    const create = () => {
        fetch("http://localhost:8080/Lab1/city/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(city())
        })
            .then(async (response) => {
                if (
                    Math.trunc(response.status / 100) === 4
                    || Math.trunc(response.status / 100) === 5
                    || response.status === 429
                ) {
                    toast.error(await response.text());
                } else {
                    toast.success("Созданно");
                    sendFilter();
                }
            })
            .catch((err) => {
                toast.error("Сервис сейчас недоступен");
            })
    }

    const createURL = () => {
        let str = "&";
        // if (id !== ""){
        //     str += `id=${id}&`
        // }
        if (name !== "") {
            str += `name=${name}&`
        } if (coordinate_x !== "") {
            str += `coordinates_x=${coordinate_x}&`;
        } if (coordinate_y !== "") {
            str += `coordinates_y=${coordinate_y}&`;
        } if (creationData !== "") {
            str += `creationDate=${creationData}&`;
        } if (area !== "") {
            str += `area=${area}&`;
        } if (population !== "") {
            str += `population=${population}&`;
        } if (metersAboveSeaLevel !== "") {
            str += `metersAboveSeaLevel=${metersAboveSeaLevel}&`;
        } if (timezone !== "") {
            str += `timezone=${timezone}&`;
        } if (capital !== "") {
            str += `capital=${capital}&`;
        } if (government !== "") {
            str += `government=${government}&`;
        } if (governor !== "") {
            str += `human_name=${governor}&`;
        }
        return str;
    }

    //todo return
    const city = () => {
        let c = {
            name : name,
            coordinates : {
                x : parseInt(coordinate_x),
                y : parseFloat(coordinate_y)
            },
            area : parseInt(area),
            population : parseInt(population),
            metersAboveSeaLevel : parseInt(metersAboveSeaLevel),
            timezone : parseFloat(timezone),
            capital : capital,
            government : government,
            governor : {
                name : governor
            }
        };
        return c;
    }

    const clearForm = () => {
        setId("");
        setName("");
        setCoordinateX("");
        setCoordinateY("");
        setData("");
        setArea("");
        setPopulation("");
        setMASL("");
        setTimezone("");
        setCapital("");
        setGovernment("");
        setGovernor("");
    }

    const checkEnter = (e, id, field, content) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            sendUpdate(id, field, content)
        }
    }

    return (
        <div>
            <button onClick={() => create()}>Создать</button>
            <button onClick={() => clearForm()}>Очистить</button>
            <button onClick={() => deleteCity()}>Удалить</button>
            <button onClick={() => deleteByCapital()}>delete by Capital</button>
            <button onClick={() => getWithMaxArea()}>Максимальная area</button>
            <button onClick={() => groupByName()}>Групировка по name</button>
            <Toaster />
        <table>
            <tr>
                <td>id<input name="id" type="checkbox" onClick={(event) => setSortStructure({...sortStructure, [event.target.name]: event.target.checked})}/></td>
                <td>name<input name="name" type="checkbox" onClick={(event) => setSortStructure({...sortStructure, [event.target.name]: event.target.checked})}/></td>
                <td>coordinates_x<input name="coordinates_x" type="checkbox" onClick={(event) => setSortStructure({...sortStructure, [event.target.name]: event.target.checked})}/></td>
                <td>coordinates_y<input name="coordinates_y" type="checkbox" onClick={(event) => setSortStructure({...sortStructure, [event.target.name]: event.target.checked})}/></td>
                <td>creationDate<input name="creationDate" type="checkbox" onClick={(event) => setSortStructure({...sortStructure, [event.target.name]: event.target.checked})}/></td>
                <td>area<input name="area" type="checkbox" onClick={(event) => setSortStructure({...sortStructure, [event.target.name]: event.target.checked})}/></td>
                <td>population<input name="population" type="checkbox" onClick={(event) => setSortStructure({...sortStructure, [event.target.name]: event.target.checked})}/></td>
                <td>metersAboveSeaLevel<input name="metersAboveSeaLevel" type="checkbox" onClick={(event) => setSortStructure({...sortStructure, [event.target.name]: event.target.checked})}/></td>
                <td>timezone<input name="timezone" type="checkbox" onClick={(event) => setSortStructure({...sortStructure, [event.target.name]: event.target.checked})}/></td>
                <td>capital<input name="capital" type="checkbox" onClick={(event) => setSortStructure({...sortStructure, [event.target.name]: event.target.checked})}/></td>
                <td>government<input name="government" type="checkbox" onClick={(event) => setSortStructure({...sortStructure, [event.target.name]: event.target.checked})}/></td>
                <td>governor_name<input name="human_name" type="checkbox" onClick={(event) => setSortStructure({...sortStructure, [event.target.name]: event.target.checked})}/></td>
                <td> </td>
            </tr>

            <tr>
                <td><input type="text" value={id} onChange={(event) => setId(event.target.value)}/></td>
                <td><input type="text" value={name} onChange={(event) => setName(event.target.value)}/></td>
                <td><input type="text" value={coordinate_x} onChange={(event) => setCoordinateX(event.target.value)}/></td>
                <td><input type="text" value={coordinate_y} onChange={(event) => setCoordinateY(event.target.value)}/></td>
                <td><input type="datetime-local" value={creationData} onChange={(event) => setData(event.target.value)}/></td>
                <td><input type="text" value={area} onChange={(event) => setArea(event.target.value)}/></td>
                <td><input type="text" value={population} onChange={(event) => setPopulation(event.target.value)}/></td>
                <td><input type="text" value={metersAboveSeaLevel} onChange={(event) => setMASL(event.target.value)}/></td>
                <td><input type="text" value={timezone} onChange={(event) => setTimezone(event.target.value)}/></td>
                <td><select value={capital} onChange={(event) => setCapital(event.target.value)}>
                    <option value=""> </option>
                    <option value="True">True</option>
                    <option value="False">False</option>
                </select></td>
                <td><select value={government} onChange={(event) => setGovernment(event.target.value)}>
                    <option value=""> </option>
                    <option value="DEMARCHY">DEMARCHY</option>
                    <option value="DESPOTISM">DESPOTISM</option>
                    <option value="OLIGARCHY">OLIGARCHY</option>
                </select></td>
                <td><input type="text" value={governor} onChange={(event) => setGovernor(event.target.value)}/></td>
                <td> </td>
            </tr>

            <Content
                // current={currentPage}
                // perPage={perPage}
                sendUpdate={(id, name, content) => sendUpdate(id, name, content)}
                checkEnter={(e, id, name, content) => checkEnter(e, id, name, content)}
                onClick={(id) => deleteCity(id)}
                content={content}
            />
        </table>

            <div className="pages">
                {pages.map((page, index) => <span
                    key={index}
                    className={currentPage == page ? "current-page" : "page"}
                    onClick={() => {setCurrentPage(page)}}>{page}</span>)}
            </div>
        </div>
    );
};



// export const ContentPage = () => {
//     const [objectStructure, setObjectStructure] = useState({});
//     const [content, setContent] = useState({});
//
//     const location = useLocation();
//     const dispatch = useDispatch();
//
//     //todo ?????
//     useEffect(() => {
//         setObjectStructure(
//             getObjectStructureByPathName(
//                 `/${location.pathname.split('/')[1]}`
//             )
//         )
//         let arr = [];
//         for (let i = 0; i < 10; i++){
//             switch (`/${location.pathname.split('/')[1]}`) {
//                 default:
//                     arr.push({});
//                 case city_page:
//                     arr.push(constructCity({}));
//                     break;
//                 case coordinate_page:
//                     arr.push(constructCoordinate({}));
//                     break;
//                 case human_page:
//                     arr.push(constructHuman({}));
//                     break;
//             }
//         }
//         setContent(arr);
//     }, [location.pathname])
//
//     //todo ???
//     useEffect(() => {
//         dispatch(setObject({}));
//     }, [location.pathname])
//
//     const getObjectStructureByPathName = (path) => {
//         switch (path) {
//             default:
//                 return {};
//             case city_page:
//                 return CityStructure;
//             case coordinate_page:
//                 return CoordinatesStructure;
//             case human_page:
//                 return HumanStructure;
//         }
//     }
//
//     const mem = [
//         {
//             "id": 249,
//             "name": "MSK",
//             "coordinates": {
//                 "id": 250,
//                 "x": 21,
//                 "y": 32.2
//             },
//             "creationDate": {
//                 "date": {
//                     "year": 2021,
//                     "month": 10,
//                     "day": 3
//                 },
//                 "time": {
//                     "hour": 12,
//                     "minute": 11,
//                     "second": 55,
//                     "nano": 895365000
//                 }
//             },
//             "area": 4,
//             "population": 9,
//             "metersAboveSeaLevel": 3,
//             "timezone": 3.3,
//             "capital": true,
//             "government": "DEMARCHY",
//             "governor": {
//                 "id": 251,
//                 "name": "Vasya"
//             }
//         },
//         {
//             "id": 261,
//             "name": "B",
//             "coordinates": {
//                 "id": 262,
//                 "x": 20,
//                 "y": 31.1
//             },
//             "creationDate": {
//                 "date": {
//                     "year": 2021,
//                     "month": 10,
//                     "day": 3
//                 },
//                 "time": {
//                     "hour": 21,
//                     "minute": 47,
//                     "second": 44,
//                     "nano": 522836000
//                 }
//             },
//             "area": 10,
//             "population": 8,
//             "metersAboveSeaLevel": 2,
//             "timezone": 2.2,
//             "capital": false,
//             "government": "DEMARCHY",
//             "governor": {
//                 "id": 263,
//                 "name": "vv"
//             }
//         }
//     ]
//
// // usememo хук
//     return (
//         <div>
//             {/*<Filters*/}
//             {/*    object={location*/}
//             {/*        .pathname.split('/')[1]*/}
//             {/*        .toUpperCase()}*/}
//             {/*    method={'Post'}*/}
//             {/*    objectStructure={objectStructure}*/}
//             {/*    onSubmitAction={() => {}}*/}
//             {/*/>*/}
//
//
//             <Content cont={mem} />
//             {/*<PaginationList itmes={content} />*/}
//         </div>
//     );
// };