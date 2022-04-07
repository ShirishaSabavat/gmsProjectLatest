import { gql } from '@apollo/client';

// login mutation
const USER_LOGIN = gql`
    mutation employeeLogin(
        $email: String!
        $password: String!
    ) {
        employeeLogin(
            employeeData: {
                email: $email
                password: $password 
            }
        ) {
            token
            id
        }
    }
`;

export default USER_LOGIN;
