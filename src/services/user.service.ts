import getConnection from "../config/database";


const handleCreateUser = (name: string, email: string, address: string) => {

    console.log(">>>insert new user");
}
const getAllUsers = async () => {
    const connection = await getConnection();

    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `users`'
        );
        return results;
    } catch (err) {
        return [];
    }
}

export { handleCreateUser, getAllUsers };