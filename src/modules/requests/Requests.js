
export const getAll = () => {
    fetch(`http://localhost:8080/Lab1/all/city`)
        .then(res => res.json())
        .then(
            (result) => {
                console.log("good");
                return result;
            },
            (error) => {
                console.log(error);
                return error;
            }
        )
}